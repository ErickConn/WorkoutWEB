import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://json-server-wweb.onrender.com";

// Async Thunks
export const fetchBiometriaList = createAsyncThunk(
    'biometria/fetchList',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/biometria`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const createBiometria = createAsyncThunk(
    'biometria/create',
    async (biometriaData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/biometria`, biometriaData);
            const newBiometria = res.data;
            
            if (biometriaData.usuario && biometriaData.usuario.id) {
                await axios.post(`${API_URL}/historico_usuario`, {
                    id: String(biometriaData.usuario.id),
                    userId: String(biometriaData.usuario.id),
                    nivel_atividade: "moderado",
                    historico_peso: [],
                    historico_carga: []
                });
            }
            return newBiometria;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const updateBiometria = createAsyncThunk(
    'biometria/update',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${API_URL}/biometria/${id}`, updatedData);
            const updatedBiometria = res.data;
            
            if (updatedBiometria.usuario?.perfil_biometrico?.peso_kg) {
                const userId = updatedBiometria.usuario.id;
                const newWeight = updatedBiometria.usuario.perfil_biometrico.peso_kg;
                
                const { data: historicos } = await axios.get(`${API_URL}/historico_usuario`);
                const userHistory = historicos.find(h => String(h.userId) === String(userId));
                
                if (userHistory) {
                    const dataAtual = new Date().toISOString().split('T')[0];
                    let historicoPeso = userHistory.historico_peso || [];

                    const semanaAtualNum = Math.ceil((new Date() - new Date('2026-01-01')) / (7 * 24 * 60 * 60 * 1000));
                    const novoRegistro = {
                        semana: semanaAtualNum,
                        data: dataAtual,
                        peso_kg: newWeight
                    };

                    historicoPeso.push(novoRegistro);

                    await axios.patch(`${API_URL}/historico_usuario/${userHistory.id}`, {
                        historico_peso: historicoPeso
                    });
                }
            }

            return updatedBiometria;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const getBiometriaItem = createAsyncThunk(
    'biometria/getItem',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/biometria/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const deleteBiometria = createAsyncThunk(
    'biometria/delete',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/biometria/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const initialState = {
    loading: false,
    biometria: [],
    error: null
};

const biometriaSlice = createSlice({
    name: 'biometria',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchBiometriaList
            .addCase(fetchBiometriaList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBiometriaList.fulfilled, (state, action) => {
                state.loading = false;
                state.biometria = action.payload;
            })
            .addCase(fetchBiometriaList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // createBiometria
            .addCase(createBiometria.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBiometria.fulfilled, (state, action) => {
                state.loading = false;
                state.biometria.push(action.payload);
            })
            .addCase(createBiometria.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // updateBiometria
            .addCase(updateBiometria.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBiometria.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.biometria.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.biometria[index] = action.payload;
                }
            })
            .addCase(updateBiometria.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // getBiometriaItem
            .addCase(getBiometriaItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBiometriaItem.fulfilled, (state, action) => {
                state.loading = false;
                state.biometria = [action.payload];
            })
            .addCase(getBiometriaItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // deleteBiometria
            .addCase(deleteBiometria.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBiometria.fulfilled, (state, action) => {
                state.loading = false;
                state.biometria = state.biometria.filter(item => item.id !== action.payload);
            })
            .addCase(deleteBiometria.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const biometriaReducer = biometriaSlice.reducer;
