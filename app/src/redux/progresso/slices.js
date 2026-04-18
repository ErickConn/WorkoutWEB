import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserIdFromEmail } from '../../utils/userAuth';

const API_URL = process.env.REACT_APP_API_URL || "https://json-server-wweb.onrender.com";

// Thunk para buscar progresso
export const fetchProgresso = createAsyncThunk(
  'progresso/fetchProgresso',
  async (_, { rejectWithValue }) => {
    try {
      const userId = String(await getUserIdFromEmail());
      console.log("Buscando progresso para userId:", userId);
      const { data: historicos } = await axios.get(`${API_URL}/historico_usuario`);
      const historicoUsuario = historicos.find(h => String(h.userId) === userId);
      return historicoUsuario ? [historicoUsuario] : [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Thunk para carregar registros do usuário
export const carregarRegistrosUsuario = createAsyncThunk(
  'progresso/carregarRegistrosUsuario',
  async (_, { rejectWithValue }) => {
    try {
      const userId = String(await getUserIdFromEmail());
      console.log("Buscando progresso do usuário:", userId);
      const { data: historicos } = await axios.get(`${API_URL}/historico_usuario`);
      const historicoUsuario = historicos.find(h => String(h.userId) === userId);

      const registros = [];
      if (historicoUsuario?.historico_carga) {
        historicoUsuario.historico_carga.forEach(semana => {
          semana.treinos.forEach(treino => {
            treino.exercicios.forEach(ex => {
              registros.push({
                exercicioId: ex.id,
                data: treino.data,
                dia: ex.dia || treino.dia,
                idPlano: treino.idPlano,
                concluido: ex.concluido,
                seriesRealizadas: ex.seriesRealizadas || []
              });
            });
          });
        });
      }
      return registros;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  historico: [],
  registrosUsuario: [],
  loading: false,
  loaded: false,
  error: null,
};

const progressoSlice = createSlice({
  name: 'progresso',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProgresso
      .addCase(fetchProgresso.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgresso.fulfilled, (state, action) => {
        state.loading = false;
        state.historico = action.payload;
        state.loaded = true;
        console.log("Dados recebidos:", action.payload);
      })
      .addCase(fetchProgresso.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loaded = true;
        console.error("Erro ao buscar progresso:", action.error.message);
      })
      // carregarRegistrosUsuario
      .addCase(carregarRegistrosUsuario.fulfilled, (state, action) => {
        state.registrosUsuario = action.payload;
        state.loading = false;
        console.log("Dados recebidos:", action.payload);
      });
  },
});

export const progressoReducer = progressoSlice.reducer;