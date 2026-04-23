import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getUserIdFromEmail } from '../../utils/userAuth';
import { confirmarConclusaoTreinoGeral } from '../progresso/slices';
import { ensurePlanEditable, removerPlano, getOrCreateBackendUser } from '../planos/thunks';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const setTreinoAtivo = createAsyncThunk('treinos/setTreinoAtivo', async (dia, { rejectWithValue }) => {
    try {
        const backendUser = await getOrCreateBackendUser();

        if (!backendUser.activePlanId) {
            console.warn("Nenhum plano ativo encontrado para selecionar o treino.");
            return rejectWithValue("Nenhum plano ativo encontrado.");
        }

        await axios.patch(`${API_URL}/users/${backendUser.id}`, { activeDay: dia });

        return {
            idPlano: backendUser.activePlanId,
            dia: dia,
            userId: backendUser.id
        };

    } catch (err) {
        console.error("Erro ao atualizar treino ativo no banco:", err);
        return rejectWithValue(err.message);
    }
});

export const removerTreinoDaAPI = createAsyncThunk('treinos/removerTreinoDaAPI', async ({ idPlano, diaParaRemover, rotinaAtual }, { dispatch, rejectWithValue }) => {
    try {
        await ensurePlanEditable(idPlano);
        if (rotinaAtual.length <= 1) {
            if (window.confirm("Este é o último treino deste plano. Deseja excluir o plano completo?")) {
                dispatch(removerPlano(idPlano));
            }
            return { action: 'removed_full_plan_or_cancelled', idPlano, diaParaRemover };
        }

        const novaRotina = rotinaAtual.filter(item => item.dia !== diaParaRemover);
        await axios.patch(`${API_URL}/planos/${idPlano}`, { rotina: novaRotina });

        return { id: idPlano, dia: diaParaRemover };
    } catch (err) {
        alert(err.message || "Erro ao remover treino.");
        return rejectWithValue(err.message);
    }
});

export const adicionarTreinoAoPlano = createAsyncThunk('treinos/adicionarTreinoAoPlano', async ({ idPlano, nomeTreino, exerciciosSelecionados, rotinaAtual }, { rejectWithValue }) => {
    try {
        await ensurePlanEditable(idPlano);

        const letras = ["A", "B", "C", "D", "E", "F", "G"];
        const letraAtual = letras[rotinaAtual.length] || "?";

        const novoTreino = {
            dia: letraAtual,
            foco: nomeTreino || `Treino ${letraAtual}`,
            exercicios: exerciciosSelecionados.map(ex => {
                const { series, repeticoes, ...rest } = ex;
                return {
                    ...rest,
                    grupo: ex.grupo,
                    seriesPadrao: series ?? rest.seriesPadrao ?? 3,
                    repsPadrao: repeticoes ?? rest.repsPadrao ?? 12
                };
            }),
            ativo: false
        };

        const novaRotina = [...rotinaAtual, novoTreino];
        const res = await axios.patch(`${API_URL}/planos/${idPlano}`, { rotina: novaRotina });
        return res.data;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const atualizarTreinoNoPlano = createAsyncThunk('treinos/atualizarTreinoNoPlano', async ({ idPlano, treinoEditado, rotinaAtual }, { rejectWithValue }) => {
    try {
        await ensurePlanEditable(idPlano);

        const rotinaAtualizada = rotinaAtual.map((item) =>
            item.dia === treinoEditado.dia
                ? {
                    ...item,
                    foco: treinoEditado.foco || item.foco,
                    exercicios: treinoEditado.exercicios,
                    ativo: treinoEditado.ativo ?? item.ativo,
                }
                : item
        );

        const res = await axios.patch(`${API_URL}/planos/${idPlano}`, { rotina: rotinaAtualizada });
        return res.data;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const finalizarTreino = () => {
    return async (dispatch, getState) => {
        try {
            const { planos } = getState().planosReducer;
            const planoAtivo = planos.find(p => p.ativo) || planos[0];
            if (!planoAtivo || !planoAtivo.rotina) {
                console.warn("Nenhum plano ativo ou rotina encontrada para finalizar treino.");
                return;
            }
            let currentIndex = planoAtivo.rotina.findIndex(t => t.ativo);
            if (currentIndex === -1) currentIndex = 0;
            const diaAtual = planoAtivo.rotina[currentIndex].dia;

            await dispatch(confirmarConclusaoTreinoGeral(diaAtual));

            const nextIndex = (currentIndex + 1) % planoAtivo.rotina.length;
            const proximoDia = planoAtivo.rotina[nextIndex].dia;
            await dispatch(setTreinoAtivo(proximoDia)).unwrap();
        } catch (err) {
            console.error("Erro ao finalizar treino:", err.message);
            throw err;
        }
    };
};
