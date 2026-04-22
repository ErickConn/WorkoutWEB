import { createSlice } from "@reduxjs/toolkit";
import {
    fetchTreinoList,
    salvarPlanoCompleto,
    removerPlano,
    removerTreinoDaAPI,
    setPlanoAtivo,
    setTreinoAtivo,
    editarPlano,
    adicionarTreinoAoPlano,
    atualizarTreinoNoPlano
} from "./thunks";

const initialState = {
    planos: [],
    loading: false,
    planoEmEdicao: {
        nome: "",
        rotina: []
    },
};

const handlePending = (state) => {
    state.loading = true;
};

const handleRejected = (state) => {
    state.loading = false;
};

const treinoSlice = createSlice({
    name: "treino",
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
            prepare: (nomeTreino, exerciciosSelecionados, letra) => {
                return {
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
                };
            }
        },
        atualizarTreinoDaRotinaEmEdicao: (state, action) => {
            const index = state.planoEmEdicao.rotina.findIndex(
                (item) => item.dia === action.payload.dia
            );
            if (index !== -1) {
                state.planoEmEdicao.rotina[index] = {
                    ...state.planoEmEdicao.rotina[index],
                    ...action.payload
                };
            }
        },
        removerTreinoDaRotina: (state, action) => {
            state.loading = false;
            const { id, dia } = action.payload;
            if (!id) {
                state.planoEmEdicao.rotina = state.planoEmEdicao.rotina.filter(
                    (item) => item.dia !== dia
                );
            } else {
                const planoIndex = state.planos.findIndex((p) => String(p.id) === String(id));
                if (planoIndex !== -1) {
                    state.planos[planoIndex].rotina = state.planos[planoIndex].rotina.filter(
                        (item) => item.dia !== dia
                    );
                }
            }
        },
        removerTreinoDaRotinaEdicao: (state, action) => {
            state.planoEmEdicao.rotina = state.planoEmEdicao.rotina.filter(
                (item) => item.dia !== action.payload
            );
        },
        atualizarTreinoDaRotinaEdicao: (state, action) => {
            const index = state.planoEmEdicao.rotina.findIndex(
                (item) => item.dia === action.payload.dia
            );
            if (index !== -1) {
                state.planoEmEdicao.rotina[index] = {
                    ...state.planoEmEdicao.rotina[index],
                    ...action.payload
                };
            }
        }
    },
    extraReducers: (builder) => {
        // fetchTreinoList
        builder.addCase(fetchTreinoList.pending, handlePending)
            .addCase(fetchTreinoList.rejected, handleRejected)
            .addCase(fetchTreinoList.fulfilled, (state, action) => {
                state.planos = action.payload;
                state.loading = false;
            });

        // salvarPlanoCompleto
        builder.addCase(salvarPlanoCompleto.pending, handlePending)
            .addCase(salvarPlanoCompleto.rejected, handleRejected)
            .addCase(salvarPlanoCompleto.fulfilled, (state, action) => {
                state.loading = false;
                state.planos.push(action.payload);
                state.planoEmEdicao = { nome: "", rotina: [] };
            });

        // removerPlano
        builder.addCase(removerPlano.pending, handlePending)
            .addCase(removerPlano.rejected, handleRejected)
            .addCase(removerPlano.fulfilled, (state, action) => {
                state.loading = false;
                state.planos = state.planos.filter(
                    (plano) => String(plano.id) !== String(action.payload)
                );
            });

        // removerTreinoDaAPI
        builder.addCase(removerTreinoDaAPI.pending, handlePending)
            .addCase(removerTreinoDaAPI.rejected, handleRejected)
            .addCase(removerTreinoDaAPI.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.action !== 'removed_full_plan_or_cancelled') {
                    const planoIndex = state.planos.findIndex((p) => String(p.id) === String(action.payload.id));
                    if (planoIndex !== -1) {
                        state.planos[planoIndex].rotina = state.planos[planoIndex].rotina.filter(
                            (item) => item.dia !== action.payload.dia
                        );
                    }
                }
            });

        // setPlanoAtivo
        builder.addCase(setPlanoAtivo.pending, handlePending)
            .addCase(setPlanoAtivo.rejected, handleRejected)
            .addCase(setPlanoAtivo.fulfilled, (state, action) => {
                state.loading = false;
                state.planos.forEach((plano) => {
                    const isAtivoParaUsuario = Boolean(
                        plano.activeUserIds &&
                        action.payload.userId &&
                        plano.activeUserIds[action.payload.userId]
                    );

                    if (String(plano.id) === String(action.payload.idPlano)) {
                        if (!plano.activeUserIds) plano.activeUserIds = {};
                        plano.activeUserIds[action.payload.userId] = true;
                        plano.ativo = true;
                    } else if (isAtivoParaUsuario) {
                        delete plano.activeUserIds[action.payload.userId];
                        plano.ativo = false;
                    }
                });
            });

        // setTreinoAtivo
        builder.addCase(setTreinoAtivo.pending, handlePending)
            .addCase(setTreinoAtivo.rejected, handleRejected)
            .addCase(setTreinoAtivo.fulfilled, (state, action) => {
                state.loading = false;
                const planoIndex = state.planos.findIndex(
                    (p) => String(p.id) === String(action.payload.idPlano)
                );
                if (planoIndex !== -1) {
                    const plano = state.planos[planoIndex];
                    if (!plano.activeDayByUser) plano.activeDayByUser = {};
                    plano.activeDayByUser[action.payload.userId] = action.payload.dia;
                    plano.activeDay = action.payload.dia;

                    plano.rotina.forEach((treino) => {
                        treino.ativo = String(treino.dia) === String(action.payload.dia);
                    });
                }
            });

        // editarPlano
        builder.addCase(editarPlano.pending, handlePending)
            .addCase(editarPlano.rejected, handleRejected)
            .addCase(editarPlano.fulfilled, (state, action) => {
                state.loading = false;
                const planoIndex = state.planos.findIndex(
                    (p) => String(p.id) === String(action.payload.id)
                );
                if (planoIndex !== -1) {
                    state.planos[planoIndex] = action.payload;
                }
            });

        // adicionarTreinoAoPlano
        builder.addCase(adicionarTreinoAoPlano.pending, handlePending)
            .addCase(adicionarTreinoAoPlano.rejected, handleRejected)
            .addCase(adicionarTreinoAoPlano.fulfilled, (state, action) => {
                state.loading = false;
                const planoIndex = state.planos.findIndex(
                    (p) => String(p.id) === String(action.payload.id)
                );
                if (planoIndex !== -1) {
                    state.planos[planoIndex] = action.payload;
                }
            });

        // atualizarTreinoNoPlano
        builder.addCase(atualizarTreinoNoPlano.pending, handlePending)
            .addCase(atualizarTreinoNoPlano.rejected, handleRejected)
            .addCase(atualizarTreinoNoPlano.fulfilled, (state, action) => {
                state.loading = false;
                const planoIndex = state.planos.findIndex(
                    (p) => String(p.id) === String(action.payload.id)
                );
                if (planoIndex !== -1) {
                    state.planos[planoIndex] = action.payload;
                }
            });
    }
});

export const {
    adicionarTreinoNaRotina,
    atualizarTreinoDaRotinaEmEdicao,
    removerTreinoDaRotina,
    removerTreinoDaRotinaEdicao,
    atualizarTreinoDaRotinaEdicao
} = treinoSlice.actions;

export * from './thunks';
export default treinoSlice.reducer;