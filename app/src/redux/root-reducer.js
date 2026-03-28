import { combineReducers } from "redux";
import treinoReducer from "./treino/reduce";
import userReducer from './treino/reduce';

const rootReducer = combineReducers({userReducer, treinoReducer});

export default rootReducer;