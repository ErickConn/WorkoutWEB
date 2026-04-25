import { createSlice } from "@reduxjs/toolkit";
import { salvarPlanoCompleto } from "../planos/thunks";
import {
    setTreinoAtivo,
    removerTreinoDaAPI,
    adicionarTreinoAoPlano,
    atualizarTreinoNoPlano,
} from "./thunks";

const initialState = {
    planoEmEdicao: {
        nome: "",
        rotina: []
    },
    loading: false,
};

const handlePending = (state) => { state.loading = true; };
const handleRejected = (state) => { state.loading = false; };

const treinosSlice = createSlice({
    name: "treinos",
    initialState,
    reducers: {
        adicionarTreinoNaRotina: {
            reducer: (state, action) => {
                state.loading = false;
                state.planoEmEdicao.rotina.push({
                    ...action.payload,
                    id: Date.now().toString(),
                    ativo: false
                });
            },
            // Processa os dados que foram enviados separadamente em um único objeto
            prepare: (nomeTreino, exerciciosSelecionados, letra) => ({
                payload: {
                    dia: letra,
                    foco: nomeTreino || `Treino ${letra}`,
                    exercicios: exerciciosSelecionados.map(ex => {
                        const { series, repeticoes, ...rest } = ex;
                        return {
                            ...rest,
                            grupo: ex.grupo,
                            seriesPadrao: series ?? rest.seriesPadrao ?? 3,
                            repsPadrao: repeticoes ?? rest.repsPadrao ?? 12
                        };
                    })
                }
            })
        },
        atualizarTreinoDaRotinaEmEdicao: (state, action) => {
            const idx = state.planoEmEdicao.rotina.findIndex(item => item.dia === action.payload.dia);
            if (idx !== -1) {
                state.planoEmEdicao.rotina[idx] = { ...state.planoEmEdicao.rotina[idx], ...action.payload };
            }
        },
        removerTreinoDaRotina: (state, action) => {
            state.loading = false;
            const { dia } = action.payload;
            state.planoEmEdicao.rotina = state.planoEmEdicao.rotina.filter(item => item.dia !== dia);
        },
        removerTreinoDaRotinaEdicao: (state, action) => {
            state.planoEmEdicao.rotina = state.planoEmEdicao.rotina.filter(item => item.dia !== action.payload);
        },
        atualizarTreinoDaRotinaEdicao: (state, action) => {
            const idx = state.planoEmEdicao.rotina.findIndex(item => item.dia === action.payload.dia);
            if (idx !== -1) {
                state.planoEmEdicao.rotina[idx] = { ...state.planoEmEdicao.rotina[idx], ...action.payload };
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(salvarPlanoCompleto.fulfilled, (state) => {
                state.planoEmEdicao = { nome: "", rotina: [] };
            })
            .addCase(setTreinoAtivo.pending, handlePending)
            .addCase(setTreinoAtivo.rejected, handleRejected)
            .addCase(setTreinoAtivo.fulfilled, (state) => { state.loading = false; })
            .addCase(removerTreinoDaAPI.pending, handlePending)
            .addCase(removerTreinoDaAPI.rejected, handleRejected)
            .addCase(removerTreinoDaAPI.fulfilled, (state) => { state.loading = false; })
            .addCase(adicionarTreinoAoPlano.pending, handlePending)
            .addCase(adicionarTreinoAoPlano.rejected, handleRejected)
            .addCase(adicionarTreinoAoPlano.fulfilled, (state) => { state.loading = false; })
            .addCase(atualizarTreinoNoPlano.pending, handlePending)
            .addCase(atualizarTreinoNoPlano.rejected, handleRejected)
            .addCase(atualizarTreinoNoPlano.fulfilled, (state) => { state.loading = false; });
    }
});

export const {
    adicionarTreinoNaRotina,
    atualizarTreinoDaRotinaEmEdicao,
    removerTreinoDaRotina,
    removerTreinoDaRotinaEdicao,
    atualizarTreinoDaRotinaEdicao
} = treinosSlice.actions;

export * from './thunks';
export default treinosSlice.reducer;
