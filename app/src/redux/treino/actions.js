import { GET_TREINO_LIST, MAKE_REQUEST, FAIL_REQUEST, GET_EXERCICIO_LIST } from "./actionType";
import axios from 'axios';
import { getUserIdFromEmail } from '../../utils/userAuth';

const API_URL = "https://json-server-wweb.onrender.com";

export const makeRequest = () => ({ type: MAKE_REQUEST });
export const failRequest = (msg) => ({ type: FAIL_REQUEST, payload: msg });
export const getTreinoList = (data) => ({ type: GET_TREINO_LIST, payload: data });
export const getExercicioList = (data) => ({ type: GET_EXERCICIO_LIST, payload: data });

export const fetchTreinoList = () => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const userId = await getUserIdFromEmail();
      const { data: planos } = await axios.get(`${API_URL}/planos`);

      const planosFiltrados = planos
        .map((plano) => {
          const ativoParaUsuario = plano.activeUserIds && userId && plano.activeUserIds[userId];
          const activeDay = plano.activeDayByUser?.[userId] || null;

          const rotinaComAtivo = Array.isArray(plano.rotina)
            ? plano.rotina.map((treino) => ({
              ...treino,
              ativo: activeDay ? String(treino.dia) === String(activeDay) : Boolean(treino.ativo)
            }))
            : plano.rotina;

          const planoAjustado = {
            ...plano,
            ativo: Boolean(ativoParaUsuario),
            activeDay: activeDay,
            activeUserIds: plano.activeUserIds || {},
            activeDayByUser: plano.activeDayByUser || {},
            rotina: rotinaComAtivo
          };

          if (plano.categoria !== "personalizado") {
            return planoAjustado;
          }

          if (userId && plano.userId === userId) {
            return planoAjustado;
          }

          return null;
        })
        .filter(Boolean);

      dispatch(getTreinoList(planosFiltrados));
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const adicionarTreinoNaRotina = (nomeTreino, exerciciosSelecionados, letra) => {
  return {
    type: 'ADICIONAR_TREINO_NA_ROTINA',
    payload: {
      dia: letra,
      foco: nomeTreino || `Treino ${letra}`,
      exercicios: exerciciosSelecionados.map(ex => ({
        ...ex,
        seriesPadrao: ex.series || 3,
        repsPadrao: ex.repeticoes || 12
      }))
    }
  };
};

export const salvarPlanoCompleto = (plano) => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const userId = await getUserIdFromEmail();
      const planoComUserId = {
        ...plano,
        userId: userId || null,
        activeUserIds: {},
        activeDayByUser: {}
      };

      const res = await axios.post(`${API_URL}/planos`, planoComUserId);
      dispatch({ type: "SALVAR_PLANO_COMPLETO", payload: res.data });
      return res.data;
    } catch (err) {
      dispatch(failRequest(err.message));
      throw err;
    }
  };
};

export const removerPlano = (id) => {
  return (dispatch) => {
    dispatch(makeRequest());
    axios.delete(`${API_URL}/planos/${id}`)
      .then(() => dispatch({ type: "ELIMINAR_PLANO_SUCCESS", payload: id }))
      .catch(err => dispatch(failRequest(err.message)));
  };
};

export const removerTreinoDaRotinaEdicao = (dia) => ({
  type: 'REMOVER_TREINO_DA_ROTINA',
  payload: { id: null, dia: dia }
});

export const atualizarTreinoDaRotinaEdicao = (treinoEditado) => ({
  type: 'ATUALIZAR_TREINO_DA_ROTINA_EM_EDICAO',
  payload: treinoEditado
});

export const removerTreinoDaAPI = (idPlano, diaParaRemover, rotinaAtual) => {
  return (dispatch) => {
    if (rotinaAtual.length <= 1) {
      if (window.confirm("Este é o último treino deste plano. Deseja excluir o plano completo?")) {
        return dispatch(removerPlano(idPlano));
      }
      return;
    }

    const novaRotina = rotinaAtual.filter(item => item.dia !== diaParaRemover);
    dispatch(makeRequest());

    axios.patch(`${API_URL}/planos/${idPlano}`, { rotina: novaRotina })
      .then(() => {
        dispatch({
          type: 'REMOVER_TREINO_DA_ROTINA',
          payload: { id: idPlano, dia: diaParaRemover }
        });
      })
      .catch(err => {
        dispatch(failRequest(err.message));
        alert("Erro ao remover treino.");
      });
  };
};

export const setPlanoAtivo = (idPlano) => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      const userId = await getUserIdFromEmail();
      if (!userId) {
        dispatch(failRequest("Usuário não autenticado"));
        return;
      }

      const { data: planos } = await axios.get(`${API_URL}/planos`);
      const planoAtual = planos.find(p => String(p.id) === String(idPlano));
      if (!planoAtual) {
        dispatch(failRequest("Plano não encontrado"));
        return;
      }

      const desativarPromises = planos
        .filter(p => String(p.id) !== String(idPlano) && p.activeUserIds && p.activeUserIds[userId])
        .map(p => {
          const novosActiveUserIds = { ...p.activeUserIds };
          delete novosActiveUserIds[userId];
          return axios.patch(`${API_URL}/planos/${p.id}`, { activeUserIds: novosActiveUserIds });
        });

      await Promise.all(desativarPromises);

      const novoActiveUserIds = { ...(planoAtual.activeUserIds || {}) };
      novoActiveUserIds[userId] = true;
      await axios.patch(`${API_URL}/planos/${idPlano}`, { activeUserIds: novoActiveUserIds });

      dispatch({ type: 'SET_PLANO_ATIVO', payload: { idPlano, userId } });
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const setTreinoAtivo = (dia) => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      const userId = await getUserIdFromEmail();
      if (!userId) {
        dispatch(failRequest("Usuário não autenticado"));
        return;
      }

      const { data: planos } = await axios.get(`${API_URL}/planos`);
      const planoAtivo = planos.find(p => p.activeUserIds && p.activeUserIds[userId]);

      if (!planoAtivo) {
        console.warn("Nenhum plano ativo encontrado para selecionar o treino.");
        dispatch(failRequest("Nenhum plano ativo encontrado."));
        return;
      }

      const activeDayByUser = {
        ...(planoAtivo.activeDayByUser || {}),
        [userId]: dia
      };

      await axios.patch(`${API_URL}/planos/${planoAtivo.id}`, {
        activeDayByUser
      });

      dispatch({
        type: 'SET_TREINO_ATUAL',
        payload: {
          idPlano: planoAtivo.id,
          dia: dia,
          userId
        }
      });

    } catch (err) {
      dispatch(failRequest(err.message));
      console.error("Erro ao atualizar treino ativo no banco:", err);
    }
  };
};


export const finalizarTreino = () => {
  return async (dispatch, getState) => {
    const { planos } = getState().treinoReducer;
    const planoAtivo = planos.find(p => p.ativo) || planos[0];
    if (!planoAtivo || !planoAtivo.rotina) return;
    const currentIndex = planoAtivo.rotina.findIndex(t => t.ativo);
    const nextIndex = (currentIndex + 1) % planoAtivo.rotina.length;
    const proximoDia = planoAtivo.rotina[nextIndex].dia;
    dispatch(setTreinoAtivo(proximoDia));
  };
};

export const editarPlano = (idPlano, dados) => {
  return (dispatch) => {
    dispatch(makeRequest());
    return axios.patch(`${API_URL}/planos/${idPlano}`, dados)
      .then((res) => {
        dispatch({
          type: 'EDITAR_PLANO',
          payload: res.data
        });
        return res.data;
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
        throw err;
      });
  };
};

export const adicionarTreinoAoPlano = (idPlano, nomeTreino, exerciciosSelecionados, rotinaAtual) => {
  return (dispatch) => {
    dispatch(makeRequest());

    // Gera a próxima letra (A, B, C, etc.)
    const letras = ["A", "B", "C", "D", "E", "F", "G"];
    const letraAtual = letras[rotinaAtual.length] || "?";

    // Cria o novo treino
    const novoTreino = {
      dia: letraAtual,
      foco: nomeTreino || `Treino ${letraAtual}`,
      exercicios: exerciciosSelecionados.map(ex => ({
        ...ex,
        seriesPadrao: ex.series || 3,
        repsPadrao: ex.repeticoes || 12
      })),
      id: Date.now().toString(),
      ativo: false
    };

    // Adiciona à rotina existente
    const novaRotina = [...rotinaAtual, novoTreino];

    // Faz o PATCH para salvar na API
    return axios.patch(`${API_URL}/planos/${idPlano}`, { rotina: novaRotina })
      .then((res) => {
        dispatch({
          type: 'EDITAR_PLANO',
          payload: res.data
        });
        return res.data;
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
        throw err;
      });
  };
};

export const atualizarTreinoNoPlano = (idPlano, treinoEditado, rotinaAtual) => {
  return (dispatch) => {
    dispatch(makeRequest());

    const rotinaAtualizada = rotinaAtual.map((item) =>
      item.dia === treinoEditado.dia
        ? {
          ...item,
          foco: treinoEditado.foco || item.foco,
          exercicios: treinoEditado.exercicios,
          ativo: treinoEditado.ativo ?? item.ativo,
          id: item.id || treinoEditado.id
        }
        : item
    );

    return axios.patch(`${API_URL}/planos/${idPlano}`, { rotina: rotinaAtualizada })
      .then((res) => {
        dispatch({
          type: 'EDITAR_PLANO',
          payload: res.data
        });
        return res.data;
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
        throw err;
      });
  };
};