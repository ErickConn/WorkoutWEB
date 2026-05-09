import { configureStore } from "@reduxjs/toolkit";
import planosReducer from "./planos/slices";
import treinosReducer from "./treinos/slices";
import { userReducer } from './user/slice';
import { biometriaReducer } from './Biometria/slice';
import { exercicioReducer } from "./exercicio/slices";
import { progressoReducer } from "./progresso/slices";

const store = configureStore({
    reducer: {
        planosReducer,
        treinosReducer,
        userReducer,
        biometriaReducer,
        exercicioReducer,
        progressoReducer
    }
})

export default store;