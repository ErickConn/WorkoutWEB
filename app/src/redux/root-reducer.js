import { combineReducers } from "redux";
import treinoReducer from "./treino/reduce";
import userReducer from './user/reduce';
import sessaoReducer from './sessao/reduce';
import { biometriaReducer} from './Biometria/reduce';
import exercicioReducer from "./exercicio/reducer";

const rootReducer = combineReducers({userReducer, treinoReducer, sessaoReducer, biometriaReducer, exercicioReducer});

export default rootReducer;