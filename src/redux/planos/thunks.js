import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getUserIdFromEmail, getLoggedUser } from '../../utils/userAuth';

const API_URL = process.env.REACT_APP_API_URL || "https://json-server-wweb.onrender.com";

export const ensurePlanEditable = async (idPlano) => {
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

export const fetchPlanoList = createAsyncThunk('planos/fetchPlanoList', async (_, { rejectWithValue }) => {
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

export const salvarPlanoCompleto = createAsyncThunk('planos/salvarPlanoCompleto', async (plano, { rejectWithValue }) => {
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

export const removerPlano = createAsyncThunk('planos/removerPlano', async (id, { dispatch, rejectWithValue }) => {
    try {
        await ensurePlanEditable(id);
        await axios.delete(`${API_URL}/planos/${id}`);
        dispatch(fetchPlanoList());
        return id;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const setPlanoAtivo = createAsyncThunk('planos/setPlanoAtivo', async (idPlano, { rejectWithValue }) => {
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

export const editarPlano = createAsyncThunk('planos/editarPlano', async ({ idPlano, dados }, { rejectWithValue }) => {
    try {
        await ensurePlanEditable(idPlano);
        const res = await axios.patch(`${API_URL}/planos/${idPlano}`, dados);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});
