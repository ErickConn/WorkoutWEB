const API_URL = "https://curly-carnival-954pjq4xr5727jx6-3001.app.github.dev";

export const buscarPlanos = () => {
  return async (dispatch) => {
    try {
      const resposta = await fetch(`${API_URL}/planos`);
      
      if (!resposta.ok) {
        throw new Error(`Erro HTTP! status: ${resposta.status}`);
      }

      const dados = await resposta.json();
      
      dispatch({ type: "SET_PLANOS", payload: dados });
      
    } catch (erro) {
      console.error("Erro ao buscar planos:", erro);
    }
  };
};