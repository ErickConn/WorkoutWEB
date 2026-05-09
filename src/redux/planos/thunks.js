import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getUserIdFromEmail, getLoggedUser, getLoggedUserEmail } from '../../utils/userAuth';

const API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');

export const getOrCreateBackendUser = async () => {
    const email = getLoggedUserEmail();
    if (!email) return null;
    try {
        const { data: users } = await axios.get(`${API_URL}/users`);
        const user = users.find(u => u.email === email);
        return user || null;
    } catch (err) {
        console.error("Erro ao buscar usuario no backend:", err);
        return null;
    }
};

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
        const backendUser = await getOrCreateBackendUser();
        const { data: planos } = await axios.get(`${API_URL}/planos`);

        const activePlanId = backendUser?.activePlanId ? String(backendUser.activePlanId) : null;
        const activeDay = backendUser?.activeDay || null;

        const planosFiltrados = planos
            .map((plano) => {
                const isPlanoAtivo = activePlanId && String(plano.id) === activePlanId;

                const rotinaComAtivo = Array.isArray(plano.rotina)
                    ? plano.rotina.map((treino) => ({
                        ...treino,
                        ativo: isPlanoAtivo && activeDay
                            ? String(treino.dia) === String(activeDay)
                            : false
                    }))
                    : plano.rotina;

                const planoAjustado = {
                    ...plano,
                    ativo: Boolean(isPlanoAtivo),
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

        // Se o plano removido era o ativo, limpa no user
        const backendUser = await getOrCreateBackendUser();
        if (backendUser && backendUser.activePlanId && String(backendUser.activePlanId) === String(id)) {
            await axios.patch(`${API_URL}/users/${backendUser._id || backendUser.id}`, {
                activePlanId: null,
                activeDay: null
            });
        }

        dispatch(fetchPlanoList());
        return id;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const setPlanoAtivo = createAsyncThunk('planos/setPlanoAtivo', async (idPlano, { rejectWithValue }) => {
    try {
        const backendUser = await getOrCreateBackendUser();
        if (!backendUser) throw new Error("Usuário não encontrado");

        await axios.patch(`${API_URL}/users/${backendUser._id || backendUser.id}`, {
            activePlanId: idPlano,
            activeDay: null
        });

        return { idPlano };
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
