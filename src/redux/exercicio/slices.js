import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://json-server-wweb.onrender.com";

// Buscar lista
export const fetchExercicioList = createAsyncThunk(
  'exercicio/fetchList',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/biblioteca_exercicios`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Criar novo exercício
export const createExercicio = createAsyncThunk(
  'exercicio/create',
  async (novoExercicio, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/biblioteca_exercicios`, novoExercicio);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Editar exercício
export const updateExercicio = createAsyncThunk(
  'exercicio/update',
  async (exercicio, { rejectWithValue }) => {
    try {
      await axios.put(`${API_URL}/biblioteca_exercicios/${exercicio.id}`, exercicio);
      return exercicio;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Deletar exercício
export const deleteExercicio = createAsyncThunk(
  'exercicio/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/biblioteca_exercicios/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  exercicios: [],
  loading: false,
  error: null,
};

const exercicioSlice = createSlice({
  name: 'exercicio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Buscar lista
      .addCase(fetchExercicioList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExercicioList.fulfilled, (state, action) => {
        state.loading = false;
        state.exercicios = action.payload;
      })
      .addCase(fetchExercicioList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Criar
      .addCase(createExercicio.fulfilled, (state, action) => {
        state.exercicios.push(action.payload);
      })
      // Editar
      .addCase(updateExercicio.fulfilled, (state, action) => {
        state.exercicios = state.exercicios.map(ex =>
          ex.id === action.payload.id ? action.payload : ex
        );
      })
      // Deletar
      .addCase(deleteExercicio.fulfilled, (state, action) => {
        state.exercicios = state.exercicios.filter(ex => ex.id !== action.payload);
      });
  },
});

export const exercicioReducer = exercicioSlice.reducer;