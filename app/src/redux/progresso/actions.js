import { FETCH_PROGRESSO_REQUEST, FETCH_PROGRESSO_SUCCESS, FETCH_PROGRESSO_FAILURE } from "./actionType";
import axios from 'axios';
import { getUserIdFromEmail } from '../../utils/userAuth';

const API_URL = "https://json-server-wweb.onrender.com";

export const fetchProgresso = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_PROGRESSO_REQUEST });
    axios.get(`${API_URL}/historico_usuario`)
      .then((res) => {
        dispatch({
          type: FETCH_PROGRESSO_SUCCESS,
          payload: res.data 
        });
      })
      .catch((err) => {
        console.error("ERRO:", err);
        dispatch({
          type: FETCH_PROGRESSO_FAILURE,
          payload: err.message
        });
      });
  };
};

export const atualizarExercicioTreino = (idExercicio, dadosAtualizados) => {
  return async (dispatch, getState) => {
    const { planos } = getState().treinoReducer;
    const planoAtivo = planos.find(p => p.ativo);
    if (!planoAtivo) return;

    const novaRotina = planoAtivo.rotina.map(treino => ({
      ...treino,
      exercicios: treino.exercicios.map(ex =>
        ex.id === idExercicio ? { ...ex, ...dadosAtualizados } : ex
      )
    }));

    await axios.patch(`${API_URL}/planos/${planoAtivo.id}`, { rotina: novaRotina });

    dispatch({
      type: 'EDITAR_PLANO',
      payload: { ...planoAtivo, rotina: novaRotina }
    });
  };
};

// 1. FUNÇÃO DE SALVAR
export const salvarRegistroExercicio = (exercicioId, seriesRealizadas) => {
  return async (dispatch) => {
    const userId = await getUserIdFromEmail();
    const dataAtual = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Verifica se todas as séries passadas estão concluídas
    const isExercicioConcluido = seriesRealizadas.length > 0 && seriesRealizadas.every(s => s.concluida);

    // Buscar histórico do usuário
    const { data: historicos } = await axios.get(`${API_URL}/historico_usuario`);
    const historicoUsuario = historicos.find(h => String(h.id) === String(userId));

    // O objeto EXATO que queremos salvar no JSON
    const novoExercicioSalvo = {
      id: String(exercicioId),
      concluido: isExercicioConcluido,
      seriesRealizadas: seriesRealizadas
    };

    if (!historicoUsuario) {
      await axios.post(`${API_URL}/historico_usuario`, {
        id: userId,
        nivel_atividade: "moderado",
        historico_peso: [],
        historico_carga: [{
          semana: 1,
          treinos: [{
            data: dataAtual,
            exercicios: [novoExercicioSalvo]
          }]
        }]
      });
      // AQUI: Avisamos o Redux para atualizar a tela!
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

    let treinoAtual = semanaAtual.treinos.find(t => t.data === dataAtual);

    if (!treinoAtual) {
      semanaAtual.treinos.push({
        data: dataAtual,
        exercicios: [novoExercicioSalvo]
      });
    } else {
      const exercicioIndex = treinoAtual.exercicios.findIndex(ex => String(ex.id) === String(exercicioId));

      if (exercicioIndex >= 0) {
        treinoAtual.exercicios[exercicioIndex] = novoExercicioSalvo;
      } else {
        treinoAtual.exercicios.push(novoExercicioSalvo);
      }
    }

    // Atualiza o banco de dados
    await axios.patch(`${API_URL}/historico_usuario/${userId}`, {
      historico_carga: historicoCarga
    });

    // AQUI ESTAVA O SEGREDO: Atualizamos o frontend na mesma hora para refletir no RegistroCard
    dispatch(carregarRegistrosUsuario());
  };
};

// 2. FUNÇÃO DE CARREGAR (Faltava no seu arquivo!)
export const carregarRegistrosUsuario = () => {
  return async (dispatch) => {
    const userId = await getUserIdFromEmail();
    const { data: historicos } = await axios.get(`${API_URL}/historico_usuario`);
    const historicoUsuario = historicos.find(h => String(h.id) === String(userId));

    const registros = [];

    if (historicoUsuario?.historico_carga) {
      historicoUsuario.historico_carga.forEach(semana => {
        semana.treinos.forEach(treino => {
          treino.exercicios.forEach(ex => {
            registros.push({
              exercicioId: ex.id,
              data: treino.data,
              seriesRealizadas: ex.seriesRealizadas || []
            });
          });
        });
      });
    }

    // Dispara para o progressoReducer organizar os cards
    dispatch({
      type: 'CARREGAR_REGISTROS_USUARIO',
      payload: registros
    });
  };
};