import { GET_TREINO_LIST, MAKE_REQUEST, FAIL_REQUEST, GET_EXERCICIO_LIST } from "./actionType";
import axios from 'axios';

const API_URL = "https://json-server-wweb.onrender.com";

export const makeRequest = () => ({ type: MAKE_REQUEST });
export const failRequest = (msg) => ({ type: FAIL_REQUEST, payload: msg });
export const getTreinoList = (data) => ({ type: GET_TREINO_LIST, payload: data });
export const getExercicioList = (data) => ({ type: GET_EXERCICIO_LIST, payload: data });

export const fetchTreinoList = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    axios.get(`${API_URL}/planos`)
      .then((res) => dispatch(getTreinoList(res.data)))
      .catch(err => dispatch(failRequest(err.message)));
  };
};

export const fetchExercicioList = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    axios.get(`${API_URL}/biblioteca_exercicios`)
      .then((res) => dispatch(getExercicioList(res.data)))
      .catch(err => dispatch(failRequest(err.message)));
  };
};

export const adicionarTreinoNaRotina = (nomeTreino, exerciciosSelecionados, letra) => {
  return {
    type: 'ADICIONAR_TREINO_NA_ROTINA',
    payload: {
      dia: letra,
      foco: nomeTreino || `Treino ${letra}`,
      exercicios: exerciciosSelecionados.map(ex => ({
        ...ex,
        seriesPadrao: 3,
        repsPadrao: 12
      }))
      // O ID e o campo 'ativo' agora são gerados no Reducer para consistência
    }
  };
};

export const salvarPlanoCompleto = (plano) => {
  return (dispatch) => {
    dispatch(makeRequest());
    return axios.post(`${API_URL}/planos`, plano)
      .then((res) => {
        dispatch({ type: "SALVAR_PLANO_COMPLETO", payload: res.data });
        return res.data;
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
        throw err;
      });
  };
};

export const removerPlano = (id) => {
  return (dispatch) => {
    dispatch(makeRequest());
    axios.delete(`${API_URL}/planos/${id}`)
      .then(() => dispatch({ type: "ELIMINAR_PLANO_SUCCESS", payload: id }))
      .catch(err => dispatch(failRequest(err.message)));
  };
};

export const removerTreinoDaRotinaEdicao = (dia) => ({
  type: 'REMOVER_TREINO_DA_ROTINA',
  payload: { id: null, dia: dia }
});

export const removerTreinoDaAPI = (idPlano, diaParaRemover, rotinaAtual) => {
  return (dispatch) => {
    if (rotinaAtual.length <= 1) {
      if (window.confirm("Este é o último treino deste plano. Deseja excluir o plano completo?")) {
        return dispatch(removerPlano(idPlano));
      }
      return;
    }

    const novaRotina = rotinaAtual.filter(item => item.dia !== diaParaRemover);
    dispatch(makeRequest());

    axios.patch(`${API_URL}/planos/${idPlano}`, { rotina: novaRotina })
      .then(() => {
        dispatch({
          type: 'REMOVER_TREINO_DA_ROTINA',
          payload: { id: idPlano, dia: diaParaRemover }
        });
      })
      .catch(err => {
        dispatch(failRequest(err.message));
        alert("Erro ao remover treino.");
      });
  };
};

export const setPlanoAtivo = (idPlano) => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const { data: planos } = await axios.get(`${API_URL}/planos`);

      const desativarPromises = planos
        .filter(p => p.ativo === true && String(p.id) !== String(idPlano))
        .map(p => axios.patch(`${API_URL}/planos/${p.id}`, { ativo: false }));

      await Promise.all(desativarPromises);
      await axios.patch(`${API_URL}/planos/${idPlano}`, { ativo: true });

      dispatch({ type: 'SET_PLANO_ATIVO', payload: idPlano });
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const setTreinoAtivo = (idTreino) => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      // 1. Busca os planos atualizados do servidor
      const { data: planos } = await axios.get(`${API_URL}/planos`);

      console.log(planos)

      // 2. Localiza o plano que está com ativo: true
      const planoAtivo = planos.find(p => p.ativo === true);

      if (!planoAtivo) {
        console.warn("Nenhum plano ativo encontrado para selecionar o treino.");
        return;
      }

      // 3. Itera sobre a rotina para definir o novo treino ativo
      // Compara o idTreino recebido com o treino.id do seu db.json
      const novaRotina = planoAtivo.rotina.map(treino => ({
        ...treino,
        ativo: String(treino.id) === String(idTreino)
      }));

      // 4. Salva a rotina modificada de volta no objeto pai (plano)
      await axios.patch(`${API_URL}/planos/${planoAtivo.id}`, { 
        rotina: novaRotina 
      });

      // 5. Atualiza o estado global do Redux
      dispatch({
        type: 'SET_TREINO_ATUAL',
        payload: { 
          idPlano: planoAtivo.id, 
          idTreino: idTreino 
        }
      });

    } catch (err) {
      dispatch(failRequest(err.message));
      console.error("Erro ao atualizar treino ativo no banco:", err);
    }
  };
};