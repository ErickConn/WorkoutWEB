import { GET_EXERCICIO_LIST, GET_TREINO_LIST, MAKE_REQUEST } from "./actionType";

const initialState = {
  planos: [],
  exercicios: [],
  planoEmEdicao: {
    nome: "",
    rotina: []
  },
};

const treinoReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return state;
    case GET_TREINO_LIST:
      return {
    ...state,
      planos: [...action.payload], 
    };

    case GET_EXERCICIO_LIST:
      return{
        ...state,
        exercicios: action.payload,
      }

    case 'ADICIONAR_TREINO_NA_ROTINA':
      return { 
        ...state, 
        planoEmEdicao: { 
          ...state.planoEmEdicao, 
          rotina: [...state.planoEmEdicao.rotina, action.payload] 
        }
      };

    case 'REMOVER_TREINO_DA_ROTINA':
      return {
        ...state,
        planoEmEdicao: {
          ...state.planoEmEdicao,
          rotina: state.planoEmEdicao.rotina.filter(treino => treino.dia !== action.payload)
        }
      };

    case 'SALVAR_PLANO_COMPLETO':
      return {
        ...state,
        planos: [...state.planos, action.payload],
        planoEmEdicao: {
          nome: "",
          rotina: []
        }
      };

    case 'ELIMINAR_PLANO_SUCCESS':
      return {
        ...state,
        planos: state.planos.filter(plano => plano.id !== action.payload),
      };

    default:
      return state;
} 
}

export default treinoReducer;