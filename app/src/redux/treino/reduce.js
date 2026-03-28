const initialState = {
  planos: []
};

const treinoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PLANOS":
      return {
        ...state,
        planos: action.payload
      };

    default:
      return state;
  }
} 

export default treinoReducer;