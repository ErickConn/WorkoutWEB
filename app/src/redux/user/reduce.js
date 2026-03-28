const initialState = {
    currentUser: null,
}
const userReducer = (state = initialState, action) =>{
    if(action.type === "treino/get"){
        return { ...state, currentUser: 10};
    }

    return state;
}

export default userReducer;