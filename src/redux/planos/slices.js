import { createSlice } from "@reduxjs/toolkit";
import {
    fetchPlanoList,
    salvarPlanoCompleto,
    removerPlano,
    setPlanoAtivo,
    editarPlano,
} from "./thunks";
import {
    setTreinoAtivo,
    removerTreinoDaAPI,
    adicionarTreinoAoPlano,
    atualizarTreinoNoPlano,
} from "../treinos/thunks";

const initialState = {
    planos: [],
    loading: false,
};

const handlePending = (state) => { state.loading = true; };
const handleRejected = (state) => { state.loading = false; };

const planosSlice = createSlice({
    name: "planos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlanoList.pending, handlePending)
            .addCase(fetchPlanoList.rejected, handleRejected)
            .addCase(fetchPlanoList.fulfilled, (state, action) => {
                state.planos = action.payload;
                state.loading = false;
            })
            .addCase(salvarPlanoCompleto.pending, handlePending)
            .addCase(salvarPlanoCompleto.rejected, handleRejected)
            .addCase(salvarPlanoCompleto.fulfilled, (state, action) => {
                state.loading = false;
                state.planos.push(action.payload);
            })
            .addCase(removerPlano.pending, handlePending)
            .addCase(removerPlano.rejected, handleRejected)
            .addCase(removerPlano.fulfilled, (state, action) => {
                state.loading = false;
                state.planos = state.planos.filter(
                    (p) => String(p.id) !== String(action.payload)
                );
            })
            .addCase(setPlanoAtivo.pending, handlePending)
            .addCase(setPlanoAtivo.rejected, handleRejected)
            .addCase(setPlanoAtivo.fulfilled, (state, action) => {
                state.loading = false;
                state.planos.forEach((plano) => {
                    const isAtivo = Boolean(
                        plano.activeUserIds && action.payload.userId &&
                        plano.activeUserIds[action.payload.userId]
                    );
                    if (String(plano.id) === String(action.payload.idPlano)) {
                        if (!plano.activeUserIds) plano.activeUserIds = {};
                        plano.activeUserIds[action.payload.userId] = true;
                        plano.ativo = true;
                    } else if (isAtivo) {
                        delete plano.activeUserIds[action.payload.userId];
                        plano.ativo = false;
                    }
                });
            })
            .addCase(editarPlano.pending, handlePending)
            .addCase(editarPlano.rejected, handleRejected)
            .addCase(editarPlano.fulfilled, (state, action) => {
                state.loading = false;
                const idx = state.planos.findIndex(p => String(p.id) === String(action.payload.id));
                if (idx !== -1) state.planos[idx] = action.payload;
            })
            .addCase(setTreinoAtivo.fulfilled, (state, action) => {
                const idx = state.planos.findIndex(p => String(p.id) === String(action.payload.idPlano));
                if (idx !== -1) {
                    const plano = state.planos[idx];
                    if (!plano.activeDayByUser) plano.activeDayByUser = {};
                    plano.activeDayByUser[action.payload.userId] = action.payload.dia;
                    plano.activeDay = action.payload.dia;
                    plano.rotina.forEach(t => { t.ativo = String(t.dia) === String(action.payload.dia); });
                }
            })
            .addCase(removerTreinoDaAPI.fulfilled, (state, action) => {
                if (action.payload.action !== 'removed_full_plan_or_cancelled') {
                    const idx = state.planos.findIndex(p => String(p.id) === String(action.payload.id));
                    if (idx !== -1) {
                        state.planos[idx].rotina = state.planos[idx].rotina.filter(item => item.dia !== action.payload.dia);
                    }
                }
            })
            .addCase(adicionarTreinoAoPlano.fulfilled, (state, action) => {
                const idx = state.planos.findIndex(p => String(p.id) === String(action.payload.id));
                if (idx !== -1) state.planos[idx] = action.payload;
            })
            .addCase(atualizarTreinoNoPlano.fulfilled, (state, action) => {
                const idx = state.planos.findIndex(p => String(p.id) === String(action.payload.id));
                if (idx !== -1) state.planos[idx] = action.payload;
            });
    }
});

export * from './thunks';
export default planosSlice.reducer;
