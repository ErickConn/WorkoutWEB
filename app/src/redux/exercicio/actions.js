import { MAKE_REQUEST_EXERCICIO, FAIL_REQUEST_EXERCICIO, GET_EXERCICIO_LIST, SET_EXERCICIO_LIST } from "./actionType";
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://json-server-wweb.onrender.com";

export const fetchExercicioList = () => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST_EXERCICIO });
    axios.get(`${API_URL}/biblioteca_exercicios`)
      .then((res) => {
        console.log("RES:", res.data);
        dispatch({ type: GET_EXERCICIO_LIST, payload: res.data });
      })
      .catch((err) => {
        console.error("ERRO:", err);
        dispatch({ type: FAIL_REQUEST_EXERCICIO, payload: err.message });
      });
  };
};


export const setExercicioList = (novaLista) => ({
  type: SET_EXERCICIO_LIST,
  payload: novaLista,
});
