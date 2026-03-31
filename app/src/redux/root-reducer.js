import { combineReducers } from "redux";
import treinoReducer from "./treino/reduce";
import userReducer from './user/reduce';
import sessaoReducer from './sessao/reduce';
import exercicioReducer from "./exercicio/reducer";

const rootReducer = combineReducers({userReducer, treinoReducer, sessaoReducer, exercicioReducer});

export default rootReducer;