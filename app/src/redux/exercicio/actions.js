import {  MAKE_REQUEST_EXERCICIO, FAIL_REQUEST_EXERCICIO, GET_EXERCICIO_LIST, SET_EXERCICIO_LIST } from "./actionType";

// Simulação de fetch inicial
export const fetchExercicioList = () => async (dispatch) => {
  dispatch({ type: MAKE_REQUEST_EXERCICIO });
  try {
    const dadosExercicio = [
      { id: 1, nome: "Supino Reto", grupoMuscular: "Peito", dicaTecnica: "Mantenha os ombros estáveis" },
      { id: 2, nome: "Agachamento Livre", grupoMuscular: "Pernas", dicaTecnica: "Coluna ereta durante o movimento" },
      { id: 3, nome: "Remada Curvada", grupoMuscular: "Costas", dicaTecnica: "Evite arredondar a lombar" },
      { id: 4, nome: "Desenvolvimento Militar", grupoMuscular: "Ombros", dicaTecnica: "Não arqueie a lombar" },
      { id: 5, nome: "Rosca Direta", grupoMuscular: "Bíceps", dicaTecnica: "Evite balançar o corpo" },
      { id: 6, nome: "Tríceps Testa", grupoMuscular: "Tríceps", dicaTecnica: "Mantenha os cotovelos fixos" },
    ];
    dispatch({ type: GET_EXERCICIO_LIST, payload: dadosExercicio });
  } catch (err) {
    dispatch({ type: FAIL_REQUEST_EXERCICIO, error: err });
  }
};

// Atualizar lista manualmente (ex.: após criar/editar/excluir)
export const setExercicioList = (novaLista) => ({
  type: SET_EXERCICIO_LIST,
  payload: novaLista,
});
