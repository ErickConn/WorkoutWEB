const initialState = {
  planos: [
    {
      "id_plano": 1,
      "nome_plano": "Hipertrofia ABC",
      "treinos": [
        {
          "nome": { "title": "Treino A", "subtitle": "Peito e Tríceps" },
          "gruposMusculares": [
            {
              "nome": "Peito",
              "exercicios": [
                {
                  "id": 0,
                  "nome": "Supino Reto",
                  "dica": "Mantenha os pés firmes no chão e escápulas contraídas no banco.",
                  "configuracao": {
                    "numSeries": 3,
                    "repsAlvo": "8-12",
                    "cargaSugerida": 30
                  },
                  "registroSessao": [
                    { "serie": 1, "repsFeitas": 12, "cargaUtilizada": 30, "concluido": true },
                    { "serie": 2, "repsFeitas": 10, "cargaUtilizada": 30, "concluido": true },
                    { "serie": 3, "repsFeitas": 8, "cargaUtilizada": 30, "concluido": false }
                  ],
                  "historico": [{ "data": "2026-03-20", "volumeTotal": 900 }],
                  "substitutos": [{ "nome": "Supino com Halteres", "equipamento": "Halteres" }]
                }
              ]
            },
            {
              "nome": "Tríceps",
              "exercicios": [
                {
                  "id": 1,
                  "nome": "Tríceps Pulley",
                  "dica": "Mantenha os cotovelos colados ao tronco e estenda o braço totalmente.",
                  "configuracao": {
                    "numSeries": 3,
                    "repsAlvo": "10-12",
                    "cargaSugerida": 20
                  },
                  "registroSessao": [
                    { "serie": 1, "repsFeitas": 0, "cargaUtilizada": 0, "concluido": false },
                    { "serie": 2, "repsFeitas": 0, "cargaUtilizada": 0, "concluido": false },
                    { "serie": 3, "repsFeitas": 0, "cargaUtilizada": 0, "concluido": false }
                  ],
                  "historico": [],
                  "substitutos": [{ "nome": "Tríceps Corda", "equipamento": "Polia" }]
                },
                {
                  "id": 2,
                  "nome": "Tríceps Testa",
                  "dica": "Mantenha os cotovelos apontados para o teto e não os abra durante a descida.",
                  "configuracao": {
                    "numSeries": 3,
                    "repsAlvo": "8-10",
                    "cargaSugerida": 10
                  },
                  "registroSessao": [
                    { "serie": 1, "repsFeitas": 0, "cargaUtilizada": 0, "concluido": false },
                    { "serie": 2, "repsFeitas": 0, "cargaUtilizada": 0, "concluido": false },
                    { "serie": 3, "repsFeitas": 0, "cargaUtilizada": 0, "concluido": false }
                  ],
                  "historico": [],
                  "substitutos": [{ "nome": "Tríceps Francês", "equipamento": "Haltere" }]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const treinoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "treino/atualizar_exercicio": {
      const { planoId, treinoTitle, grupoNome, exercicioId, novosDados } = action.payload;

      return state;
  }

  default:
      return state;
  };
} 

export default treinoReducer;