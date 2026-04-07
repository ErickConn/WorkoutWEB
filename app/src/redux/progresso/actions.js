import { FETCH_PROGRESSO_REQUEST, FETCH_PROGRESSO_SUCCESS, FETCH_PROGRESSO_FAILURE } from "./actionType";
import axios from 'axios';

const API_URL = "https://json-server-wweb.onrender.com";

export const fetchProgresso = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_PROGRESSO_REQUEST });
    axios.get(`${API_URL}/historico_usuario`)
      .then((res) => {
        console.log("RES:", res.data);
        console.log("RES.HISTORICO:", res.data.historico_usuario);
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