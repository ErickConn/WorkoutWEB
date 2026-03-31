import { MAKE_REQUEST } from "./actionType";
import { FAIL_REQUEST } from "./actionType";
import { GET_BIOMETRIA_LIST } from "./actionType";
const initialState = {
    loading: true,
    biometria:[]
};

export  const biometriaReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FAIL_REQUEST:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
            case GET_BIOMETRIA_LIST:
                return {
                    ...state,
                    loading: false,
                    biometria: action.payload
                }
        default: return state;
    }
}