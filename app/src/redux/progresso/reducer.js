import { FETCH_PROGRESSO_REQUEST, FETCH_PROGRESSO_SUCCESS, FETCH_PROGRESSO_FAILURE } from "./actionType";

const initialState = {
  historico: [],
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
    default:
      return state;
  }
}