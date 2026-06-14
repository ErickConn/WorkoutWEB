import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getUserIdFromEmail, getLoggedUserEmail } from '../../utils/userAuth';

const API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');

export const getOrCreateBackendUser = async () => {
    const email = getLoggedUserEmail();
    if (!email) return null;
    try {
        // Tenta obter o usuário autenticado via cookie/token
        const { data: user } = await axios.get(`${API_URL}/user/me`, { withCredentials: true });
        return user || null;
    } catch (err) {
        console.error("Erro ao buscar usuario no backend:", err);
        return null;
    }
};

export const fetchPlanoList = createAsyncThunk('planos/fetchPlanoList', async (_, { rejectWithValue }) => {
    try {
        const backendUser = await getOrCreateBackendUser();
        // O backend já filtra: retorna todos 'modelo' + 'personalizado' do usuário autenticado
        const { data: planos } = await axios.get(`${API_URL}/planos`, { withCredentials: true });
        let exercicioLib = [];
        try {
            const { data } = await axios.get(`${API_URL}/exercicios`);
            exercicioLib = data;
        } catch (e) {
            console.warn("Não foi possível carregar biblioteca de exercícios:", e.message);
        }
        const exercicioMap = {};
        exercicioLib.forEach(ex => { exercicioMap[String(ex.id)] = ex; });

        const activePlanId = backendUser?.activePlanId ? String(backendUser.activePlanId) : null;
        const activeDay = backendUser?.activeDay || null;

        const planosFiltrados = planos.map((plano) => {
            const planoId = String(plano.id || plano._id);
            const isPlanoAtivo = activePlanId && planoId === activePlanId;

            const rotinaComAtivo = Array.isArray(plano.rotina)
                ? plano.rotina.map((treino) => {
                    const exerciciosHidratados = Array.isArray(treino.exercicios)
                        ? treino.exercicios.map(ex => {
                            const exId = String(ex.idExercicio || ex.id || '');
                            const libData = exercicioMap[exId] || {};
                            return {
                                id: exId,
                                _id: ex._id ? String(ex._id) : undefined,
                                nome: ex.nome || libData.nome || 'Exercício Desconhecido',
                                grupo: ex.grupo || libData.grupo || 'Outros',
                                equipamento: ex.equipamento || libData.equipamento || '',
                                nivel_experiencia: ex.nivel_experiencia || libData.nivel_experiencia || '',
                                seriesPadrao: ex.seriesPadrao || ex.numSeries || libData.seriesPadrao || 3,
                                repsPadrao: ex.repsPadrao || ex.numReps || libData.repsPadrao || 12,
                            };
                        })
                        : [];

                    return {
                        ...treino,
                        id: treino.id || treino._id,
                        exercicios: exerciciosHidratados,
                        ativo: isPlanoAtivo && activeDay
                            ? String(treino.dia) === String(activeDay)
                            : false
                    };
                })
                : plano.rotina;

            const nivelMap = {
                'iniciante': 'Iniciante',
                'intermediario': 'Intermediário',
                'avancado': 'Avançado',
            };
            const nivelNormalizado = nivelMap[(plano.nivel || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")] || plano.nivel;

            return {
                ...plano,
                id: planoId,
                nivel: nivelNormalizado,
                ativo: Boolean(isPlanoAtivo),
                rotina: rotinaComAtivo
            };
        });

        return planosFiltrados;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const salvarPlanoCompleto = createAsyncThunk('planos/salvarPlanoCompleto', async (plano, { dispatch, rejectWithValue }) => {
    try {
        const userId = await getUserIdFromEmail();
        const planoComUserId = {
            ...plano,
            userId: userId || null,
        };

        const res = await axios.post(`${API_URL}/planos`, planoComUserId, { withCredentials: true });
        dispatch(fetchPlanoList());
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const removerPlano = createAsyncThunk('planos/removerPlano', async (id, { dispatch, rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/planos/${id}`, { withCredentials: true });

        // Se o plano removido era o ativo, limpa no user
        const backendUser = await getOrCreateBackendUser();
        if (backendUser && backendUser.activePlanId && String(backendUser.activePlanId) === String(id)) {
            await axios.patch(`${API_URL}/user/${backendUser._id || backendUser.id}`, {
                activePlanId: null,
                activeDay: null
            }, { withCredentials: true });
        }

        dispatch(fetchPlanoList());
        return id;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const setPlanoAtivo = createAsyncThunk('planos/setPlanoAtivo', async (idPlano, { dispatch, rejectWithValue }) => {
    try {
        const backendUser = await getOrCreateBackendUser();
        if (!backendUser) throw new Error("Usuário não encontrado");

        const { data: plano } = await axios.get(`${API_URL}/planos/${idPlano}`, { withCredentials: true });
        let finalPlanId = idPlano;

        const userIdStr = String(backendUser._id || backendUser.id);

        // Se for plano modelo de outro usuário, clona como personalizado
        const planoCreatorId = plano.userId?.id || plano.userId?._id || plano.userId;
        if (String(planoCreatorId) !== userIdStr && plano.categoria === 'modelo') {
            const planClone = {
                titulo: plano.titulo,
                descricao: plano.descricao,
                nivel: plano.nivel,
                categoria: "personalizado",
                userId: userIdStr,
                rotina: plano.rotina.map(t => {
                    const { _id, id, createdAt, updatedAt, planoId, ...rest } = t;
                    return rest;
                })
            };
            const res = await axios.post(`${API_URL}/planos`, planClone, { withCredentials: true });
            finalPlanId = res.data.id || res.data._id;
        }

        await axios.patch(`${API_URL}/user/${userIdStr}`, {
            activePlanId: finalPlanId,
            activeDay: null
        }, { withCredentials: true });

        dispatch(fetchPlanoList());
        return { idPlano: finalPlanId };
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const editarPlano = createAsyncThunk('planos/editarPlano', async ({ idPlano, dados }, { dispatch, rejectWithValue }) => {
    try {
        const res = await axios.patch(`${API_URL}/planos/${idPlano}`, dados, { withCredentials: true });
        dispatch(fetchPlanoList());
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const trocarExercicioNoPlano = createAsyncThunk( 'planos/trocarExercicioNoPlano', async ({ idPlano, idRotina, idAntigo, idNovo }, { dispatch, rejectWithValue }) => {
        try {
            // Enviamos os IDs para a rota de atualização do plano
            const payload = {
                idRotina,
                idAntigo,
                idNovo
            };
            
            // Faz a requisição para o back-end atualizar no banco de dados
            const res = await axios.patch(`${API_URL}/planos/${idPlano}/trocar-exercicio`, payload, { withCredentials: true });
            
            // Atualiza a lista global do front-end com os dados novos vindos do servidor
            dispatch(fetchPlanoList());
            
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);