import { CREATE_BIOMETRIA, MAKE_REQUEST } from "./actionType";
import { FAIL_REQUEST } from "./actionType";
import { GET_BIOMETRIA_LIST } from "./actionType";
import { UPDATE_BIOMETRIA } from "./actionType";
import { GET_BIOMETRIA_ITEM } from "./actionType";
import { DELETE_BIOMETRIA } from "./actionType";
const initialState = {
    loading: false,
    biometria: []
};

export const biometriaReducer = (state = initialState, action) => {
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
        case CREATE_BIOMETRIA:
            return {
                ...state,
                loading: false,
                biometria: [...state.biometria, action.payload]
            }
        case UPDATE_BIOMETRIA:
            return {
                ...state,
                loading: false,
                biometria: state.biometria.map(item => 
                    item.id === action.payload.id ? action.payload : item
                )
            }
        case GET_BIOMETRIA_ITEM:
            return {
                ...state,
                loading: false,
                biometria: [action.payload] 
            }
        case DELETE_BIOMETRIA:
            return {
                ...state,
                loading: false,
                biometria: state.biometria.filter(item => item.id !== action.payload)
            }
        default: return state;
    }
}