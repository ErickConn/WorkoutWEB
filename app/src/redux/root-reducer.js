import { combineReducers } from "redux";
import treinoReducer from "./treino/reduce";
import userReducer from './user/reduce';
import sessaoReducer from './sessao/reduce';
import { biometriaReducer} from './Biometria/reduce';

const rootReducer = combineReducers({userReducer, treinoReducer, sessaoReducer, biometriaReducer});

export default rootReducer;