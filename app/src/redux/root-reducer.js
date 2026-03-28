import { combineReducers } from "redux";
import treinoReducer from "./treino/reduce";
import userReducer from './user/reduce';
import sessaoReducer from './sessao/reduce';

const rootReducer = combineReducers({userReducer, treinoReducer, sessaoReducer});

export default rootReducer;