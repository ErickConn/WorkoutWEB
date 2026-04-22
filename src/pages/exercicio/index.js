import React, { useEffect } from "react";
import styles from './exercicio.module.css';
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchTreinoList } from "../../redux/treino/slices";
import { fetchProgresso, carregarRegistrosUsuario } from "../../redux/progresso/slices";

import HeaderBack from "../../components/HeaderBack";
import RegistroCard from "./components/registro-card";
import SeriesCard from "./components/series-card";
import SubstitutosCard from "./components/substitutos-card";

export default function Exercicio() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const planos = useSelector(state => state.treinoReducer.planos);
  const loadingTreino = useSelector(state => state.treinoReducer.loading);

  const historico = useSelector(state => state.progressoReducer.historico);
  const registrosUsuario = useSelector(state => state.progressoReducer.registrosUsuario);
  const loadingProgresso = useSelector(state => state.progressoReducer.loading);
  const progressoLoaded = useSelector(state => state.progressoReducer.loaded);

  const loading = loadingTreino || loadingProgresso;

  useEffect(() => {
    if (!planos || planos.length === 0) {
      dispatch(fetchTreinoList());
    }

    if (!progressoLoaded) {
      dispatch(fetchProgresso());
    }

    if (!progressoLoaded) {
      dispatch(carregarRegistrosUsuario());
    }
  }, [dispatch, planos, progressoLoaded]);

  const planoAtivo = planos?.find(p => p.ativo);
  const rotinaHoje = planoAtivo?.rotina?.find(treino => treino.ativo === true) || planoAtivo?.rotina?.[0];

  const exercicioAtual = rotinaHoje?.exercicios?.find(ex => String(ex.id) === String(id)) || null;

  const dataAtual = new Date().toISOString().split('T')[0];

  const todosRegistrosDoExercicio = registrosUsuario?.filter(r =>
    String(r.exercicioId) === String(id) &&
    (r.dia === rotinaHoje?.dia) &&
    (r.idPlano === planoAtivo?.id)
  );

  const registroHoje = todosRegistrosDoExercicio?.find(r => r.data === dataAtual);
  const registrosPassados = todosRegistrosDoExercicio?.filter(r => r.data !== dataAtual);
  const ultimoRegistro = registrosPassados?.sort((a, b) => new Date(b.data) - new Date(a.data))[0];

  const seriesRealizadas = registroHoje?.seriesRealizadas || [];
  const historicoRealizado = ultimoRegistro?.seriesRealizadas || [];

  if (loading || !planos || !registrosUsuario) {
    return (
      <div className={styles.container}>
        <HeaderBack title="Carregando..." />
        <p style={{ textAlign: "center", marginTop: "2rem", color: "#666" }}>Carregando exercício...</p>
      </div>
    );
  }

  if (!exercicioAtual) {
    return (
      <div className={styles.container}>
        <HeaderBack title="Exercício não encontrado" />
        <p style={{ textAlign: "center", marginTop: "2rem", color: "#666" }}>Exercício não encontrado no treino atual.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <HeaderBack
        title={exercicioAtual.nome}
        subtitle={`${exercicioAtual.seriesPadrao || exercicioAtual.series || "-"} x ${exercicioAtual.repsPadrao || exercicioAtual.reps || "-"} reps`}
      />

      <div className={styles.content}>
        <div className={styles.mainGrid}>

          <div className={styles.column}>
            <SeriesCard
              historico={historicoRealizado}
              dica={exercicioAtual.dica || "Execute o exercício com técnica correta."}
            />
          </div>

          <div className={styles.column}>
            <RegistroCard
              exercicioOriginal={{ ...exercicioAtual, seriesRealizadas }}
              isLoading={loading}
            />

            <SubstitutosCard
              substitutos={exercicioAtual.substitutos}
            />
          </div>

        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <Link to='/treino' className={styles.btnComplete}>Voltar para o Treino</Link>
          <button className={styles.btnReplace}>Trocar Exercício</button>
        </div>
      </div>
    </div>
  );
}