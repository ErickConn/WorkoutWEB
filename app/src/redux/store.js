import { configureStore } from "@reduxjs/toolkit";
import treinoReducer from "./treino/slices";
import userReducer from './user/reduce';
import { biometriaReducer } from './Biometria/slice';
import { exercicioReducer } from "./exercicio/slices";
import { progressoReducer } from "./progresso/slices";

const store = configureStore({
    reducer: {
        treinoReducer,
        userReducer,
        biometriaReducer,
        exercicioReducer,
        progressoReducer
    }
})

export default store;