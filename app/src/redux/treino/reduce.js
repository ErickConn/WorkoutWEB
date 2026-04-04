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
      return {
        ...state,
        exercicios: action.payload,
      };

    case 'ADICIONAR_TREINO_NA_ROTINA':
      return {
        ...state,
        planoEmEdicao: {
          ...state.planoEmEdicao,
          rotina: [
            ...state.planoEmEdicao.rotina,
            {
              ...action.payload,
              id: Date.now().toString(),
              ativo: false
            }
          ]
        }
      };

    case 'REMOVER_TREINO_DA_ROTINA':
      const { id, dia } = action.payload;
      if (!id) {
        return {
          ...state,
          planoEmEdicao: {
            ...state.planoEmEdicao,
            rotina: state.planoEmEdicao.rotina.filter(item => item.dia !== dia)
          }
        };
      }
      return {
        ...state,
        planos: state.planos.map(plano =>
          String(plano.id) === String(id)
            ? {
                ...plano,
                rotina: plano.rotina.filter(item => item.dia !== dia)
              }
            : plano
        )
      };

    case 'SALVAR_PLANO_COMPLETO':
      return {
        ...state,
        planos: [...state.planos, action.payload],
        planoEmEdicao: { nome: "", rotina: [] }
      };

    case 'ELIMINAR_PLANO_SUCCESS':
      return {
        ...state,
        planos: state.planos.filter(plano => String(plano.id) !== String(action.payload)),
      };

    case 'SET_PLANO_ATIVO':
      return {
        ...state,
        planos: state.planos.map((plano) =>
          String(plano.id) === String(action.payload)
            ? { ...plano, ativo: true }
            : { ...plano, ativo: false }
        ),
      };

    case 'SET_TREINO_ATUAL':
      return {
        ...state,
        planos: state.planos.map((plano) =>
          String(plano.id) === String(action.payload.idPlano)
            ? {
                ...plano,
                rotina: plano.rotina.map((treino) => ({
                  ...treino,
                  ativo: String(treino.id) === String(action.payload.idTreino)
                }))
              }
            : plano
        )
      };

    default:
      return state;
  }
};

export default treinoReducer;