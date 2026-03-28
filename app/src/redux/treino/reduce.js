const initialState = {
    currentTreino: {
    nome: "Treino A - Peito e Tríceps",
    gruposMusculares: [
      {
        nome: "Peito",
        exercicios: [
          { id: 0, nome: "Supino Reto", numSeries: "4x", numReps: "8-10", carga: "80kg" },
          { id: 1, nome: "Supino Inclinado", numSeries: "5x", numReps: "8-10", carga: "80kg" }
        ]
      },
      {
        nome: "Tríceps",
        exercicios: [
          { id: 2, nome: "Tríceps Corda", numSeries: "4x", numReps: "8-10", carga: "80kg" },
          { id: 3, nome: "Tríceps Barra", numSeries: "4x", numReps: "8-10", carga: "80kg" }
        ]
      }
    ]
  },
}

let a = {};

const treinoReducer = (state = initialState, action) =>{
    if(action.type === "treino/teste"){
      a = action.payload;
      console.log(a);
      return {...state}
    }
    return state;
}

export default treinoReducer;