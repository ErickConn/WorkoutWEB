import { FETCH_PROGRESSO_REQUEST, FETCH_PROGRESSO_SUCCESS, FETCH_PROGRESSO_FAILURE } from "./actionType";

const initialState = {
  historico: [], // Guarda o JSON bruto do banco de dados
  registrosUsuario: [], // Guarda as séries já limpas e organizadas para a tela de treino
  loading: false,
  error: null
};

export default function progressoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROGRESSO_REQUEST:
      return { ...state, loading: true, error: null };
      
    case FETCH_PROGRESSO_SUCCESS:
      return { ...state, historico: action.payload, loading: false };
      
    case FETCH_PROGRESSO_FAILURE:
      return { ...state, error: action.payload, loading: false };
      
    // NOVO: Adicionamos o case que recebe os dados formatados lá da nossa Action corrigida
    case 'CARREGAR_REGISTROS_USUARIO':
      return { ...state, registrosUsuario: action.payload, loading: false };
      
    default:
      return state;
  }
}