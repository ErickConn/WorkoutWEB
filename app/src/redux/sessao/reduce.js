const initialState = {
    ativa: null,
}

const sessaoReducer = (state = initialState, action)=>{
    switch (action.type) {
    case "INICIAR_SESSAO":
      return state;

    default:
      return state;
  }
}

export default sessaoReducer;