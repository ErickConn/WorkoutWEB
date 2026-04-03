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

export const removerTreinoDaRotina = (dia) => {
  return {
    type: 'REMOVER_TREINO_DA_ROTINA',
    payload: dia
  };
};
