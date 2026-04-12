import { GET_EXERCICIO_LIST, GET_TREINO_LIST, MAKE_REQUEST } from "./actionType";

const initialState = {
  planos: [],
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

    case 'ATUALIZAR_TREINO_DA_ROTINA_EM_EDICAO':
      return {
        ...state,
        planoEmEdicao: {
          ...state.planoEmEdicao,
          rotina: state.planoEmEdicao.rotina.map((item) =>
            item.dia === action.payload.dia ? { ...item, ...action.payload } : item
          )
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
        planos: state.planos.map((plano) => {
          const isAtivoParaUsuario = Boolean(
            plano.activeUserIds && action.payload.userId && plano.activeUserIds[action.payload.userId]
          );

          if (String(plano.id) === String(action.payload.idPlano)) {
            return {
              ...plano,
              activeUserIds: {
                ...(plano.activeUserIds || {}),
                [action.payload.userId]: true
              },
              ativo: true
            };
          }

          if (isAtivoParaUsuario) {
            const novosActiveUserIds = { ...plano.activeUserIds };
            delete novosActiveUserIds[action.payload.userId];
            return {
              ...plano,
              activeUserIds: novosActiveUserIds,
              ativo: false
            };
          }

          return plano;
        })
      };

    case 'SET_TREINO_ATUAL':
      return {
        ...state,
        planos: state.planos.map((plano) =>
          String(plano.id) === String(action.payload.idPlano)
            ? {
              ...plano,
              activeDayByUser: {
                ...(plano.activeDayByUser || {}),
                [action.payload.userId]: action.payload.dia
              },
              activeDay: action.payload.dia,
              rotina: plano.rotina.map((treino) => ({
                ...treino,
                ativo: String(treino.dia) === String(action.payload.dia)
              }))
            }
            : plano
        )
      };

    case 'EDITAR_PLANO':
      return {
        ...state,
        planos: state.planos.map(plano =>
          String(plano.id) === String(action.payload.id)
            ? action.payload
            : plano
        )
      };

    default:
      return state;
  }
};

export default treinoReducer;