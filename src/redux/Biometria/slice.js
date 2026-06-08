import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');

// Async Thunks
export const fetchBiometriaList = createAsyncThunk(
    'biometria/fetchList',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/biometria`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const createBiometria = createAsyncThunk(
    'biometria/create',
    async (biometriaData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/biometria`, biometriaData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const updateBiometria = createAsyncThunk(
    'biometria/update',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${API_URL}/biometria/${id}`, updatedData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
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
            return rejectWithValue(err.response?.data?.message || err.message);
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
            return rejectWithValue(err.response?.data?.message || err.message);
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
                const index = state.biometria.findIndex(item => item._id === action.payload._id || item.id === action.payload.id);
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
