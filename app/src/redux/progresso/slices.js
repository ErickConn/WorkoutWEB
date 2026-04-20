import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserIdFromEmail } from '../../utils/userAuth';
import { getHistoricoByUserId } from '../../utils/helpers';

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

// Thunk para salvar registro de exercício
export const salvarRegistroExercicio = createAsyncThunk(
  'progresso/salvarRegistroExercicio',
  async ({ exercicioId, seriesRealizadas, forceConcluido = null }, { getState, dispatch, rejectWithValue }) => {
    try {
      const userId = String(await getUserIdFromEmail());
      const dataAtual = new Date().toISOString().split("T")[0];

      const { planos } = getState().treino;
      const planoAtivo = planos?.find(p => p.ativo);
      const rotinaHoje = planoAtivo?.rotina?.find(treino => treino.ativo) || planoAtivo?.rotina?.[0];
      const diaTreino = rotinaHoje?.dia;
      const idPlano = planoAtivo?.id;

      const isExercicioConcluido = forceConcluido !== null
        ? forceConcluido
        : (seriesRealizadas.length > 0 && seriesRealizadas.every(s => s.concluida));

      const historicoUsuario = await getHistoricoByUserId(userId);

      const novoExercicioSalvo = {
        id: String(exercicioId),
        dia: diaTreino,
        concluido: isExercicioConcluido,
        seriesRealizadas
      };

      if (!historicoUsuario) {
        await axios.post(`${API_URL}/historico_usuario`, {
          userId,
          nivel_atividade: "moderado",
          historico_peso: [],
          historico_carga: [{
            semana: Math.ceil((new Date() - new Date("2026-01-01")) / (7 * 24 * 60 * 60 * 1000)),
            treinos: [{
              data: dataAtual,
              dia: diaTreino,
              idPlano,
              exercicios: [novoExercicioSalvo]
            }]
          }]
        });
        dispatch(carregarRegistrosUsuario());
        return;
      }

      let historicoCarga = historicoUsuario.historico_carga || [];
      const semanaAtualNum = Math.ceil((new Date() - new Date("2026-01-01")) / (7 * 24 * 60 * 60 * 1000));
      let semanaAtual = historicoCarga.find(hc => hc.semana === semanaAtualNum);

      if (!semanaAtual) {
        semanaAtual = { semana: semanaAtualNum, treinos: [] };
        historicoCarga.push(semanaAtual);
      }

      let treinoAtual = semanaAtual.treinos.find(t =>
        t.data === dataAtual && t.dia === diaTreino && t.idPlano === idPlano
      );

      if (!treinoAtual) {
        semanaAtual.treinos.push({
          data: dataAtual,
          dia: diaTreino,
          idPlano,
          exercicios: [novoExercicioSalvo]
        });
      } else {
        const exercicioIndex = treinoAtual.exercicios.findIndex(ex =>
          String(ex.id) === String(exercicioId) && ex.dia === diaTreino
        );
        if (exercicioIndex >= 0) {
          treinoAtual.exercicios[exercicioIndex] = novoExercicioSalvo;
        } else {
          treinoAtual.exercicios.push(novoExercicioSalvo);
        }
      }

      await axios.patch(`${API_URL}/historico_usuario/${historicoUsuario.id}`, {
        historico_carga: historicoCarga
      });

      dispatch(carregarRegistrosUsuario());
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