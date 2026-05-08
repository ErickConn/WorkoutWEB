import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "https://json-server-wweb.onrender.com";

// Async Thunks
export const fetchUsersList = createAsyncThunk(
    'user/fetchList',
    async (_, { rejectWithValue }) => {
        try {
            // No mock DB atual, os usuários estão dentro do endpoint /biometria
            const res = await axios.get(`${API_URL}/biometria`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const createUser = createAsyncThunk(
    'user/create',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/biometria`, userData);
            const newUser = res.data;

            if (userData.usuario && userData.usuario.id) {
                await axios.post(`${API_URL}/historico_usuario`, {
                    id: String(userData.usuario.id),
                    userId: String(userData.usuario.id),
                    nivel_atividade: "moderado",
                    historico_peso: [],
                    historico_carga: []
                });
            }
            return newUser;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/update',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${API_URL}/biometria/${id}`, updatedData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const initialState = {
    loading: false,
    users: [],
    currentUser: null,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        logoutUser: (state) => {
            state.currentUser = null;
            localStorage.removeItem('usuarioLogadoEmail');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersList.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                
                // Tenta carregar o usuário logado se existir sessão
                const emailLogado = localStorage.getItem('usuarioLogadoEmail');
                if (emailLogado) {
                    const foundUser = action.payload.find(item => item.usuario.email === emailLogado);
                    if (foundUser) {
                        state.currentUser = foundUser;
                    }
                }
            })
            .addCase(fetchUsersList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
                state.currentUser = action.payload; // Loga automaticamente no registro
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                // Atualiza o currentUser se for o mesmo que está logado
                if (state.currentUser && state.currentUser.id === action.payload.id) {
                    state.currentUser = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Sincronizando o estado do usuário logado quando a biometria é atualizada pelo outro slice
            .addCase('biometria/update/fulfilled', (state, action) => {
                const index = state.users.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                if (state.currentUser && state.currentUser.id === action.payload.id) {
                    state.currentUser = action.payload;
                }
            });
    }
});

export const { setCurrentUser, logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userReducer;
