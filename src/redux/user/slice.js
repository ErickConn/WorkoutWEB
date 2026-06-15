import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');

// Async Thunks
export const fetchUsersList = createAsyncThunk(
    'user/fetchList',
    async (_, { rejectWithValue }) => {
        try {
            // Mudando endpoint para a rota real de usuários
            const res = await axios.get(`${API_URL}/user`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    'user/fetchCurrent',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/user/me`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const loginAuth = createAsyncThunk(
    'user/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/login`, credentials);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const logoutAuth = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            await axios.post(`${API_URL}/logout`);
            return true;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const refreshToken = createAsyncThunk(
    'user/refreshToken',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/refresh-token`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const createUser = createAsyncThunk(
    'user/create',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/user`, userData);
            const newUser = res.data;

            if (newUser._id || newUser.id) {
                const userId = newUser._id || newUser.id;
                try {
                    await axios.post(`${API_URL}/historico_usuario`, {
                        id_usuario: String(userId),
                        nivel_atividade: "moderado",
                        historico_peso: [],
                        historico_carga: []
                    });
                } catch (e) {
                    console.log('Ignorando erro de historico, a rota talvez não exista ainda', e);
                }
            }
            return newUser;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/update',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${API_URL}/user/${id}`, updatedData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/delete',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/user/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// ── Admin-only thunks ──────────────────────────────────────────

export const adminUpdateUser = createAsyncThunk(
    'user/adminUpdate',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${API_URL}/admin/user/${id}`, updatedData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const adminDeleteUser = createAsyncThunk(
    'user/adminDelete',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/admin/user/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
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
            // Apenas para limpeza local de emergência (caso não queira esperar a API)
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
            })
            .addCase(fetchUsersList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
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
                const index = state.users.findIndex(item => item._id === action.payload._id || item.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                // Atualiza o currentUser se for o mesmo que está logado
                if (state.currentUser && (state.currentUser._id === action.payload._id || state.currentUser.id === action.payload.id)) {
                    state.currentUser = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(item => item._id !== action.payload && item.id !== action.payload);
                if (state.currentUser && (state.currentUser._id === action.payload || state.currentUser.id === action.payload)) {
                    state.currentUser = null;
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAuth.fulfilled, (state, action) => {
                state.loading = false;
                // Como o backend agora retorna { user, token }, precisamos acessar .user
                state.currentUser = action.payload.user ? action.payload.user : action.payload;
                const emailToSave = action.payload.user ? action.payload.user.email : action.payload.email;
                localStorage.setItem('usuarioLogadoEmail', emailToSave);
            })
            .addCase(loginAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutAuth.fulfilled, (state) => {
                state.currentUser = null;
                localStorage.removeItem('usuarioLogadoEmail');
            })
            // ── Admin thunks ──────────────────────────────────────
            .addCase(adminUpdateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminUpdateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(item => item._id === action.payload._id || item.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(adminUpdateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(adminDeleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminDeleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(item => item._id !== action.payload && item.id !== action.payload);
            })
            .addCase(adminDeleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ── refreshToken ──────────────────────────────────────
            .addCase(refreshToken.fulfilled, (state, action) => {
                // Atualiza currentUser com o role mais recente do banco
                if (action.payload?.user) {
                    state.currentUser = action.payload.user;
                }
            });
    }
});

export const { setCurrentUser, logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userReducer;
