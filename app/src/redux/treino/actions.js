import { GET_TREINO_LIST, MAKE_REQUEST, FAIL_REQUEST, GET_EXERCICIO_LIST } from "./actionType";
import axios from 'axios';

const API_URL = "https://json-server-wweb.onrender.com";

export const makeRequest=()=>{
  return{
    type: MAKE_REQUEST,
  }
}

export const failRequest = ()=>{
  return{
    type: FAIL_REQUEST,
  }
}

export const getTreinoList = (data)=>{
  return{
    type: GET_TREINO_LIST,
    payload: data,
  }
}

export const getExercicioList = (data)=>{
  return{
    type: GET_EXERCICIO_LIST,
    payload: data,
  }
}

export const fetchTreinoList = ()=>{
  return (dispatch) => {
    dispatch(makeRequest());
    axios.get(API_URL+'/planos')
    .then((res)=>{
      const treinoList = res.data;
      dispatch(getTreinoList(treinoList));
    }).catch(err=>{
      dispatch(failRequest(err.message));
    })
  }
}

export const fetchExercicioList = ()=>{
  return (dispatch) => {
    dispatch(makeRequest());
    axios.get(API_URL+'/biblioteca_exercicios')
    .then((res)=>{
      const exercicioList = res.data;
      dispatch(getExercicioList(exercicioList));
    }).catch(err=>{
      dispatch(failRequest(err.message));
    })
  }
}

export const adicionarTreinoNaRotina = (nomeTreino, exerciciosSelecionados, letra) => {
  return {
    type: 'ADICIONAR_TREINO_NA_ROTINA',
    payload: {
      dia: letra,
      foco: nomeTreino || `Treino ${letra}`,
      ativo: false,
      exercicios: exerciciosSelecionados.map(ex => ({
        ...ex,
        seriesPadrao: 3,
        repsPadrao: 12
      }))
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
      .then(() => {
        dispatch({
          type: "ELIMINAR_PLANO_SUCCESS",
          payload: id
        });
      })
      .catch(err => {
        dispatch(failRequest(err.message));
      });
  };
};

export const removerTreinoDaRotinaEdicao = (dia) => {
  return {
    type: 'REMOVER_TREINO_DA_ROTINA',
    payload: { id: null, dia: dia }
  };
};


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
        alert("Erro ao remover treino. Tente novamente.");
      });
  };
};

export const setPlanoAtivo = (idPlano) => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      // Buscar todos os planos para ver quem está ativo
      const { data: planos } = await axios.get(`${API_URL}/planos`);

      // Criar uma lista de promessas para desativar quem estiver ativo (exceto o atual)
      const desativarPromises = planos
        .filter(p => p.ativo === true && p.id !== idPlano)
        .map(p => axios.patch(`${API_URL}/planos/${p.id}`, { ativo: false }));

      // Executar todas as desativações
      await Promise.all(desativarPromises);

      // Ativar o plano desejado
      await axios.patch(`${API_URL}/planos/${idPlano}`, { ativo: true });

      // Atualizar o Redux
      dispatch({
        type: 'SET_PLANO_ATIVO',
        payload: idPlano,
      });

    } catch (err) {
      dispatch(failRequest(err.message));
      alert("Erro ao atualizar os planos. Tente novamente.");
    }
  };
};
