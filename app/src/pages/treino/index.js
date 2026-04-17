import React, { useEffect } from "react";
import styles from './treino.module.css';
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTreinoList, finalizarTreino } from "../../redux/treino/slices";
import { fetchProgresso, carregarRegistrosUsuario } from "../../redux/progresso/actions";
import OffCanvasNavBar from "../../components/OffCanvasNavBar";
import FooterButton from "../../components/FooterButton";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import TreinoCard from "./components/treino-card";

export default function Treino() {
  const dispatch = useDispatch();

  const planos = useSelector(state => state.treinoReducer.planos);
  const loadingTreino = useSelector(state => state.treinoReducer.loading);

  console.log(planos);

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

  const handleFinalizar = async () => {
    try {
      await dispatch(finalizarTreino());
      alert("Parabéns! Treino Concluido!");
    } catch (err) {
      console.error("Erro ao finalizar treino:", err);
      alert("Erro ao finalizar treino. Tente novamente.");
    }
  };

  const planoAtivo = planos?.find(p => p.ativo);

  if (loading) {
    return (
      <div className={styles.mainContainer}>
        <OffCanvasNavBar />
        <Spinner className="vh-100" />
      </div>
    );
  }

  if (!planoAtivo) {
    return (
      <>
        <OffCanvasNavBar />
        <div className={styles.noPlanContainer}>
          <p className={styles.noPlanMessage}>Parece que você ainda não selecionou um plano de treino.</p>
          <p className={styles.noPlanSubMessage}>Para acessar a biblioteca de treinos:</p>
          <Button link="/biblioteca-treino" title="Clique Aqui"></Button>
        </div >
      </>
    );
  }

  const rotinaHoje = planoAtivo.rotina
    ? planoAtivo.rotina.find(treino => treino.ativo === true) || planoAtivo.rotina[0]
    : null;

  return (
    <>
      <OffCanvasNavBar />
      <main className={styles.mainContainer}>
        <Link to='/select-treino' className={styles.progressCard}>
          <div className={styles.progressHeader}>
            <div>
              <h2 className={styles.progressTitle}>{planoAtivo.titulo}</h2>
              <p className={styles.progressSubtitle}>Hoje: {rotinaHoje?.foco}</p>
            </div>
            <div className={styles.progressBadge}>
              <span className={styles.badgeText}>{rotinaHoje?.dia}</span>
            </div>
          </div>
          <div className={styles.progressBarBg}>
            <div className={styles.progressBarFill} style={{ width: '40%' }}></div>
          </div>
        </Link>

        <Link to='/biblioteca-treino' className={styles.planCard}>
          <div className={styles.planContent}>
            <div>
              <p className={styles.planLabel}>Plano Ativo</p>
              <p className={styles.planName}>{planoAtivo.titulo}</p>
            </div>
            <div className={styles.planTag}>
              {planoAtivo.categoria || "Personalizado"}
            </div>
          </div>
        </Link>

        {rotinaHoje ? (
          <TreinoCard rotina={rotinaHoje} idPlano={planoAtivo?.id} />
        ) : (
          <p>Nenhum exercício encontrado para hoje.</p>
        )}
        <FooterButton title="Finalizar Treino" onClick={handleFinalizar}></FooterButton>
      </main>
    </>
  );
}