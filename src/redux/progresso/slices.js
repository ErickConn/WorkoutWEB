import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserIdFromEmail } from '../../utils/userAuth';

const API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');

// Thunk para buscar progresso (dados agregados por semana para a página de Progresso)
export const fetchProgresso = createAsyncThunk(
  'progresso/fetchProgresso',
  async (_, { rejectWithValue }) => {
    try {
      const userId = String(await getUserIdFromEmail());
      if (!userId || userId === 'null') return [];

      const { data } = await axios.get(`${API_URL}/historico/usuario/${userId}/progresso`);
      return data ? [data] : [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Thunk para carregar registros do usuário (achatados por exercício)
export const carregarRegistrosUsuario = createAsyncThunk(
  'progresso/carregarRegistrosUsuario',
  async (_, { rejectWithValue }) => {
    try {
      const userId = String(await getUserIdFromEmail());
      if (!userId || userId === 'null') return [];

      const { data } = await axios.get(`${API_URL}/historico/usuario/${userId}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Thunk para salvar registro de exercício (séries, carga, reps)
export const salvarRegistroExercicio = createAsyncThunk(
  'progresso/salvarRegistroExercicio',
  async ({ exercicioId, seriesRealizadas, forceConcluido = null }, { getState, dispatch, rejectWithValue }) => {
    try {
      const userId = String(await getUserIdFromEmail());
      if (!userId || userId === 'null') throw new Error("Usuário não autenticado");

      const { planos } = getState().planosReducer;
      const planoAtivo = planos?.find(p => p.ativo);
      const rotinaHoje = planoAtivo?.rotina?.find(treino => treino.ativo) || planoAtivo?.rotina?.[0];
      const dia = rotinaHoje?.dia;
      const planoId = planoAtivo?.id;

      if (!planoId || !dia) throw new Error("Nenhum plano/treino ativo encontrado");

      const concluido = forceConcluido !== null
        ? forceConcluido
        : (seriesRealizadas.length > 0 && seriesRealizadas.every(s => s.concluida));

      await axios.post(`${API_URL}/historico/usuario/${userId}/exercicio`, {
        exercicioId: String(exercicioId),
        seriesRealizadas,
        planoId: String(planoId),
        dia,
        concluido
      });

      dispatch(carregarRegistrosUsuario());
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Thunk para atualizar exercício do treino (toggle concluído)
export const atualizarExercicioTreino = createAsyncThunk(
  "progresso/atualizarExercicioTreino",
  async ({ idExercicio, dadosAtualizados }, { getState, dispatch }) => {
    const dataAtual = new Date().toISOString().split("T")[0];
    const { registrosUsuario } = getState().progressoReducer;
    const { planos } = getState().planosReducer;
    const planoAtivo = planos?.find(p => p.ativo);
    const idPlano = planoAtivo?.id;
    const rotinaHoje = planoAtivo?.rotina?.find(t => t.ativo) || planoAtivo?.rotina?.[0];
    const diaTreino = rotinaHoje?.dia;

    const registroHoje = registrosUsuario?.find(r =>
      String(r.exercicioId) === String(idExercicio) &&
      r.data === dataAtual &&
      r.dia === diaTreino &&
      r.idPlano === idPlano
    );

    const series = registroHoje?.seriesRealizadas || [];
    await dispatch(salvarRegistroExercicio({
      exercicioId: idExercicio,
      seriesRealizadas: series,
      forceConcluido: dadosAtualizados.concluido
    }));
  }
);

// Thunk para confirmar conclusão geral do treino
export const confirmarConclusaoTreinoGeral = createAsyncThunk(
  "progresso/confirmarConclusaoTreinoGeral",
  async (diaTreino, { getState, dispatch, rejectWithValue }) => {
    try {
      const userId = String(await getUserIdFromEmail());
      if (!userId || userId === 'null') throw new Error("Usuário não autenticado");

      const { planos } = getState().planosReducer;
      const planoAtivo = planos?.find(p => p.ativo);
      const planoId = planoAtivo?.id;

      if (!planoId) throw new Error("Nenhum plano ativo encontrado");

      await axios.post(`${API_URL}/historico/usuario/${userId}/finalizar`, {
        planoId: String(planoId),
        dia: diaTreino
      });

      await dispatch(carregarRegistrosUsuario());
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
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
      })
      .addCase(fetchProgresso.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loaded = true;
        console.error("Erro ao buscar progresso:", action.payload);
      })
      // carregarRegistrosUsuario
      .addCase(carregarRegistrosUsuario.pending, (state) => {
        state.loading = true;
      })
      .addCase(carregarRegistrosUsuario.fulfilled, (state, action) => {
        state.registrosUsuario = action.payload;
        state.loading = false;
      })
      .addCase(carregarRegistrosUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const progressoReducer = progressoSlice.reducer;