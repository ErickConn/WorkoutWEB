import { MAKE_REQUEST_EXERCICIO, FAIL_REQUEST_EXERCICIO, GET_EXERCICIO_LIST, SET_EXERCICIO_LIST } from "./actionType";

const initialState = {
  loading: false,
  error: null,
  exercicios: [],
};

export default function exercicioReducer(state = initialState, action) {
  switch (action.type) {
    case MAKE_REQUEST_EXERCICIO:
      return { ...state, loading: true, error: null };
    case FAIL_REQUEST_EXERCICIO:
      return { ...state, loading: false, error: action.error };
    case GET_EXERCICIO_LIST:
      return { ...state, loading: false, exercicios: action.payload };
    case SET_EXERCICIO_LIST:
      return { ...state, exercicios: action.payload };
    default:
      return state;
  }
}
