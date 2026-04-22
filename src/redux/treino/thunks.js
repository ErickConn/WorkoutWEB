import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getUserIdFromEmail, getLoggedUser } from '../../utils/userAuth';
import { confirmarConclusaoTreinoGeral } from '../progresso/slices';

const API_URL = process.env.REACT_APP_API_URL || "https://json-server-wweb.onrender.com";

const ensurePlanEditable = async (idPlano) => {
    const usuario = await getLoggedUser();
    if (!usuario) {
        throw new Error("Usuário não autenticado");
    }

    const { data: plano } = await axios.get(`${API_URL}/planos/${idPlano}`);
    const usuarioAtualId = usuario.usuario.id;
    const usuarioAtualRole = usuario.usuario.role;

    if (usuarioAtualRole !== 'admin' && String(plano.userId) !== String(usuarioAtualId)) {
        throw new Error("Apenas o criador do plano ou um administrador pode editar ou remover este plano.");
    }

    return { plano, usuario };
};

export const fetchTreinoList = createAsyncThunk('treino/fetchTreinoList', async (_, { rejectWithValue }) => {
    try {
        const userId = await getUserIdFromEmail();
        const { data: planos } = await axios.get(`${API_URL}/planos`);

        const planosFiltrados = planos
            .map((plano) => {
                const ativoParaUsuario = plano.activeUserIds && userId && plano.activeUserIds[userId];
                const activeDay = plano.activeDayByUser?.[userId] || null;

                const rotinaComAtivo = Array.isArray(plano.rotina)
                    ? plano.rotina.map((treino) => ({
                        ...treino,
                        ativo: activeDay ? String(treino.dia) === String(activeDay) : Boolean(treino.ativo)
                    }))
                    : plano.rotina;

                const planoAjustado = {
                    ...plano,
                    ativo: Boolean(ativoParaUsuario),
                    activeDay: activeDay,
                    activeUserIds: plano.activeUserIds || {},
                    activeDayByUser: plano.activeDayByUser || {},
                    rotina: rotinaComAtivo
                };

                if (plano.categoria !== "personalizado") {
                    return planoAjustado;
                }

                if (userId && plano.userId === userId) {
                    return planoAjustado;
                }

                return null;
            })
            .filter(Boolean);

        return planosFiltrados;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const salvarPlanoCompleto = createAsyncThunk('treino/salvarPlanoCompleto', async (plano, { rejectWithValue }) => {
    try {
        const userId = await getUserIdFromEmail();
        const planoComUserId = {
            ...plano,
            userId: userId || null,
            activeUserIds: {},
            activeDayByUser: {}
        };

        const res = await axios.post(`${API_URL}/planos`, planoComUserId);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const removerPlano = createAsyncThunk('treino/removerPlano', async (id, { dispatch, rejectWithValue }) => {
    try {
        await ensurePlanEditable(id);
        await axios.delete(`${API_URL}/planos/${id}`);
        dispatch(fetchTreinoList());
        return id;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const removerTreinoDaAPI = createAsyncThunk('treino/removerTreinoDaAPI', async ({ idPlano, diaParaRemover, rotinaAtual }, { dispatch, rejectWithValue }) => {
    try {
        await ensurePlanEditable(idPlano);
        if (rotinaAtual.length <= 1) {
            if (window.confirm("Este é o último treino deste plano. Deseja excluir o plano completo?")) {
                dispatch(removerPlano(idPlano));
            }
            return { action: 'removed_full_plan_or_cancelled', idPlano, diaParaRemover };
        }

        const novaRotina = rotinaAtual.filter(item => item.dia !== diaParaRemover);
        await axios.patch(`${API_URL}/planos/${idPlano}`, { rotina: novaRotina });

        return { id: idPlano, dia: diaParaRemover };
    } catch (err) {
        alert(err.message || "Erro ao remover treino.");
        return rejectWithValue(err.message);
    }
});

export const setPlanoAtivo = createAsyncThunk('treino/setPlanoAtivo', async (idPlano, { rejectWithValue }) => {
    try {
        const userId = await getUserIdFromEmail();
        if (!userId) {
            return rejectWithValue("Usuário não autenticado");
        }

        const { data: planos } = await axios.get(`${API_URL}/planos`);
        const planoAtual = planos.find(p => String(p.id) === String(idPlano));
        if (!planoAtual) {
            return rejectWithValue("Plano não encontrado");
        }

        const desativarPromises = planos
            .filter(p => String(p.id) !== String(idPlano) && p.activeUserIds && p.activeUserIds[userId])
            .map(p => {
                const novosActiveUserIds = { ...p.activeUserIds };
                delete novosActiveUserIds[userId];
                return axios.patch(`${API_URL}/planos/${p.id}`, { activeUserIds: novosActiveUserIds });
            });

        await Promise.all(desativarPromises);

        const novoActiveUserIds = { ...(planoAtual.activeUserIds || {}) };
        novoActiveUserIds[userId] = true;
        await axios.patch(`${API_URL}/planos/${idPlano}`, { activeUserIds: novoActiveUserIds });

        return { idPlano, userId };
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const setTreinoAtivo = createAsyncThunk('treino/setTreinoAtivo', async (dia, { rejectWithValue }) => {
    try {
        const userId = await getUserIdFromEmail();
        if (!userId) {
            return rejectWithValue("Usuário não autenticado");
        }

        const { data: planos } = await axios.get(`${API_URL}/planos`);
        const planoAtivo = planos.find(p => p.activeUserIds && p.activeUserIds[userId]);

        if (!planoAtivo) {
            console.warn("Nenhum plano ativo encontrado para selecionar o treino.");
            return rejectWithValue("Nenhum plano ativo encontrado.");
        }

        const activeDayByUser = {
            ...(planoAtivo.activeDayByUser || {}),
            [userId]: dia
        };

        await axios.patch(`${API_URL}/planos/${planoAtivo.id}`, {
            activeDayByUser
        });

        return {
            idPlano: planoAtivo.id,
            dia: dia,
            userId
        };

    } catch (err) {
        console.error("Erro ao atualizar treino ativo no banco:", err);
        return rejectWithValue(err.message);
    }
});

export const editarPlano = createAsyncThunk('treino/editarPlano', async ({ idPlano, dados }, { rejectWithValue }) => {
    try {
        await ensurePlanEditable(idPlano);
        const res = await axios.patch(`${API_URL}/planos/${idPlano}`, dados);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const adicionarTreinoAoPlano = createAsyncThunk('treino/adicionarTreinoAoPlano', async ({ idPlano, nomeTreino, exerciciosSelecionados, rotinaAtual }, { rejectWithValue }) => {
    try {
        await ensurePlanEditable(idPlano);

        const letras = ["A", "B", "C", "D", "E", "F", "G"];
        const letraAtual = letras[rotinaAtual.length] || "?";

        const novoTreino = {
            dia: letraAtual,
            foco: nomeTreino || `Treino ${letraAtual}`,
            exercicios: exerciciosSelecionados.map(ex => {
                const { series, repeticoes, ...rest } = ex;
                return {
                    ...rest,
                    grupo: ex.grupo,
                    seriesPadrao: series ?? rest.seriesPadrao ?? 3,
                    repsPadrao: repeticoes ?? rest.repsPadrao ?? 12
                };
            }),
            id: Date.now().toString(),
            ativo: false
        };

        const novaRotina = [...rotinaAtual, novoTreino];
        const res = await axios.patch(`${API_URL}/planos/${idPlano}`, { rotina: novaRotina });
        return res.data;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const atualizarTreinoNoPlano = createAsyncThunk('treino/atualizarTreinoNoPlano', async ({ idPlano, treinoEditado, rotinaAtual }, { rejectWithValue }) => {
    try {
        await ensurePlanEditable(idPlano);

        const rotinaAtualizada = rotinaAtual.map((item) =>
            item.dia === treinoEditado.dia
                ? {
                    ...item,
                    foco: treinoEditado.foco || item.foco,
                    exercicios: treinoEditado.exercicios,
                    ativo: treinoEditado.ativo ?? item.ativo,
                    id: item.id || treinoEditado.id
                }
                : item
        );

        const res = await axios.patch(`${API_URL}/planos/${idPlano}`, { rotina: rotinaAtualizada });
        return res.data;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const finalizarTreino = () => {
    return async (dispatch, getState) => {
        try {
            const { planos } = getState().treinoReducer;
            const planoAtivo = planos.find(p => p.ativo) || planos[0];
            if (!planoAtivo || !planoAtivo.rotina) {
                console.warn("Nenhum plano ativo ou rotina encontrada para finalizar treino.");
                return;
            }
            let currentIndex = planoAtivo.rotina.findIndex(t => t.ativo);
            if (currentIndex === -1) currentIndex = 0;
            const diaAtual = planoAtivo.rotina[currentIndex].dia;

            await dispatch(confirmarConclusaoTreinoGeral(diaAtual));

            const nextIndex = (currentIndex + 1) % planoAtivo.rotina.length;
            const proximoDia = planoAtivo.rotina[nextIndex].dia;
            await dispatch(setTreinoAtivo(proximoDia)).unwrap();
        } catch (err) {
            console.error("Erro ao finalizar treino:", err.message);
            throw err;
        }
    };
};
