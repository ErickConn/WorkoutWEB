import { GET_EXERCICIO_LIST, GET_TREINO_LIST, MAKE_REQUEST } from "./actionType";

const initialState = {
  planos: [],
  exercicios: []
};

const treinoReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return state;
    case GET_TREINO_LIST:
      return{
        ...state,
        planos: action.payload
      }

    case GET_EXERCICIO_LIST:
      return{
        ...state,
        exercicios: action.payload,
      }

    default:
      return state;
  }
} 

export default treinoReducer;