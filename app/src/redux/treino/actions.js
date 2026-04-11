import { GET_TREINO_LIST, MAKE_REQUEST, FAIL_REQUEST, GET_EXERCICIO_LIST } from "./actionType";
import axios from 'axios';

const API_URL = "https://json-server-wweb.onrender.com";

export const makeRequest = () => ({ type: MAKE_REQUEST });
export const failRequest = (msg) => ({ type: FAIL_REQUEST, payload: msg });
export const getTreinoList = (data) => ({ type: GET_TREINO_LIST, payload: data });
export const getExercicioList = (data) => ({ type: GET_EXERCICIO_LIST, payload: data });

export const fetchTreinoList = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    axios.get(`${API_URL}/planos`)
      .then((res) => dispatch(getTreinoList(res.data)))
      .catch(err => dispatch(failRequest(err.message)));
  };
};

export const fetchExercicioList = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    axios.get(`${API_URL}/biblioteca_exercicios`)
      .then((res) => dispatch(getExercicioList(res.data)))
      .catch(err => dispatch(failRequest(err.message)));
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
  return (dispatch) => {
    dispatch(makeRequest());
    return axios.post(`${API_URL}/planos`, plano)
      .then((res) => {
        dispatch({ type: "SALVAR_PLANO_COMPLETO", payload: res.data });
        return res.data;
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
        throw err;
      });
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
      const { data: planos } = await axios.get(`${API_URL}/planos`);

      const desativarPromises = planos
        .filter(p => p.ativo === true && String(p.id) !== String(idPlano))
        .map(p => axios.patch(`${API_URL}/planos/${p.id}`, { ativo: false }));

      await Promise.all(desativarPromises);
      await axios.patch(`${API_URL}/planos/${idPlano}`, { ativo: true });

      dispatch({ type: 'SET_PLANO_ATIVO', payload: idPlano });
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const setTreinoAtivo = (dia) => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      // 1. Busca os planos atualizados do servidor
      const { data: planos } = await axios.get(`${API_URL}/planos`);

      console.log(planos)

      // 2. Localiza o plano que está com ativo: true
      const planoAtivo = planos.find(p => p.ativo === true);

      if (!planoAtivo) {
        console.warn("Nenhum plano ativo encontrado para selecionar o treino.");
        dispatch(failRequest("Nenhum plano ativo encontrado."));
        return;
      }

      // 3. Itera sobre a rotina para definir o novo treino ativo
      // Compara o idTreino recebido com o treino.id do seu db.json
      const novaRotina = planoAtivo.rotina.map(treino => ({
        ...treino,
        ativo: String(treino.dia) === String(dia)
      }));

      // 4. Salva a rotina modificada de volta no objeto pai (plano)
      await axios.patch(`${API_URL}/planos/${planoAtivo.id}`, {
        rotina: novaRotina
      });

      // 5. Atualiza o estado global do Redux
      dispatch({
        type: 'SET_TREINO_ATUAL',
        payload: {
          idPlano: planoAtivo.id,
          dia: dia
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