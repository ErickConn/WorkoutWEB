import { FETCH_PROGRESSO_REQUEST, FETCH_PROGRESSO_SUCCESS, FETCH_PROGRESSO_FAILURE } from "./actionType";
import axios from 'axios';
import { getUserIdFromEmail } from '../../utils/userAuth';
import { editarPlano } from '../treino/slices';

const API_URL = process.env.REACT_APP_API_URL || "https://json-server-wweb.onrender.com";

export const fetchProgresso = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PROGRESSO_REQUEST });
    try {
      const userId = String(await getUserIdFromEmail());
      const historicoUsuario = await getHistoricoByUserId(userId);

      dispatch({
        type: FETCH_PROGRESSO_SUCCESS,
        payload: historicoUsuario ? [historicoUsuario] : []
      });
    } catch (err) {
      console.error("ERRO:", err);
      dispatch({
        type: FETCH_PROGRESSO_FAILURE,
        payload: err.message
      });
    }
  };
};

export const atualizarExercicioTreino = (idExercicio, dadosAtualizados) => {
  return async (dispatch, getState) => {
    const dataAtual = new Date().toISOString().split('T')[0];
    const { registrosUsuario } = getState().progressoReducer;

    const { planos } = getState().treinoReducer;
    const planoAtivo = planos?.find(p => p.ativo);
    const idPlano = planoAtivo?.id;
    const rotinaHoje = planoAtivo?.rotina?.find(treino => treino.ativo === true) || planoAtivo?.rotina?.[0];
    const diaTreino = rotinaHoje?.dia;

    const registroHoje = registrosUsuario?.find(r =>
      String(r.exercicioId) === String(idExercicio) && r.data === dataAtual && r.dia === diaTreino && r.idPlano === idPlano
    );

    const series = registroHoje?.seriesRealizadas || [];

    await dispatch(salvarRegistroExercicio(idExercicio, series, dadosAtualizados.concluido));
  };
};


const getHistoricoByUserId = async (userId) => {
  const { data: historicos } = await axios.get(`${API_URL}/historico_usuario`);
  const strUserId = String(userId);

  let found = historicos.find(h => String(h.userId) === strUserId);

  if (!found) {
    found = historicos.find(h => !h.userId && String(h.id) === strUserId);
  }

  if (found && !found.userId) {
    try {
      await axios.patch(`${API_URL}/historico_usuario/${found.id}`, { userId: strUserId });
      found = { ...found, userId: strUserId };
    } catch (e) {
      console.warn('Não foi possível migrar userId no historico_usuario:', e.message);
    }
  }

  return found || null;
};

export const confirmarConclusaoTreinoGeral = (diaTreino) => {
  return async (dispatch, getState) => {
    const userId = String(await getUserIdFromEmail());
    const dataAtual = new Date().toISOString().split('T')[0];

    const { planos } = getState().treinoReducer;
    const planoAtivo = planos?.find(p => p.ativo);
    const idPlano = planoAtivo?.id;

    const historicoUsuario = await getHistoricoByUserId(userId);

    if (!historicoUsuario) {
      await axios.post(`${API_URL}/historico_usuario`, {
        userId: userId,
        nivel_atividade: "moderado",
        historico_peso: [],
        historico_carga: [{
          semana: Math.ceil((new Date() - new Date('2026-01-01')) / (7 * 24 * 60 * 60 * 1000)),
          treinos: [{
            data: dataAtual,
            dia: diaTreino,
            idPlano: idPlano,
            exercicios: []
          }]
        }]
      });
      return;
    }

    let historicoCarga = historicoUsuario.historico_carga || [];
    const semanaAtualNum = Math.ceil((new Date() - new Date('2026-01-01')) / (7 * 24 * 60 * 60 * 1000));
    let semanaAtual = historicoCarga.find(hc => hc.semana === semanaAtualNum);

    if (!semanaAtual) {
      semanaAtual = { semana: semanaAtualNum, treinos: [] };
      historicoCarga.push(semanaAtual);
    }

    let treinoAtual = semanaAtual.treinos.find(t => t.data === dataAtual && t.dia === diaTreino && t.idPlano === idPlano);

    if (!treinoAtual) {
      semanaAtual.treinos.push({
        data: dataAtual,
        dia: diaTreino,
        idPlano: idPlano,
        exercicios: []
      });

      // Usa o id do json-server (historicoUsuario.id) para o PATCH
      await axios.patch(`${API_URL}/historico_usuario/${historicoUsuario.id}`, {
        historico_carga: historicoCarga
      });
    }
  };
};

export const salvarRegistroExercicio = (exercicioId, seriesRealizadas, forceConcluido = null) => {
  return async (dispatch, getState) => {
    const userId = String(await getUserIdFromEmail());
    const dataAtual = new Date().toISOString().split('T')[0];

    const { planos } = getState().treinoReducer;
    const planoAtivo = planos?.find(p => p.ativo);
    const rotinaHoje = planoAtivo?.rotina?.find(treino => treino.ativo === true) || planoAtivo?.rotina?.[0];
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
      seriesRealizadas: seriesRealizadas
    };

    if (!historicoUsuario) {
      // Cria o registro pela primeira vez usando userId como campo de busca
      await axios.post(`${API_URL}/historico_usuario`, {
        userId: userId,
        nivel_atividade: "moderado",
        historico_peso: [],
        historico_carga: [{
          semana: Math.ceil((new Date() - new Date('2026-01-01')) / (7 * 24 * 60 * 60 * 1000)),
          treinos: [{
            data: dataAtual,
            dia: diaTreino,
            idPlano: idPlano,
            exercicios: [novoExercicioSalvo]
          }]
        }]
      });
      dispatch(carregarRegistrosUsuario());
      return;
    }

    let historicoCarga = historicoUsuario.historico_carga || [];

    const semanaAtualNum = Math.ceil((new Date() - new Date('2026-01-01')) / (7 * 24 * 60 * 60 * 1000));
    let semanaAtual = historicoCarga.find(hc => hc.semana === semanaAtualNum);

    if (!semanaAtual) {
      semanaAtual = { semana: semanaAtualNum, treinos: [] };
      historicoCarga.push(semanaAtual);
    }

    let treinoAtual = semanaAtual.treinos.find(t => t.data === dataAtual && t.dia === diaTreino && t.idPlano === idPlano);

    if (!treinoAtual) {
      semanaAtual.treinos.push({
        data: dataAtual,
        dia: diaTreino,
        idPlano: idPlano,
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
  };
};


export const carregarRegistrosUsuario = () => {
  return async (dispatch) => {
    const userId = String(await getUserIdFromEmail());
    const historicoUsuario = await getHistoricoByUserId(userId);

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

    dispatch({
      type: 'CARREGAR_REGISTROS_USUARIO',
      payload: registros
    });
  };
};