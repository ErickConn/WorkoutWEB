import React, { useEffect } from "react";
import styles from './treino.module.css';
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTreinoList } from "../../redux/treino/actions";
import { finalizarTreino } from "../../redux/treino/actions";
import TreinoCard from "./components/treino-card";
import OffCanvasNavBar from "../../components/OffCanvasNavBar";
import FooterButton from "../../components/FooterButton";
import Button from "../../components/Button";

export default function Treino() {
  const dispatch = useDispatch();

  const planos = useSelector(state => state.treinoReducer.planos);

  useEffect(() => {
    if (!planos || planos.length === 0) {
      dispatch(fetchTreinoList());
    }
  }, [dispatch, planos]);

  const handleFinalizar = async () => {
    await dispatch(finalizarTreino());
    alert("Parabéns! Treino Concluido!")
  };

  if (!planos) {
    return (
      <div className={styles.mainContainer}>
        <OffCanvasNavBar />
        <p>Carregando seu treino de hoje...</p>
      </div>
    );
  }

  const planoAtivo = planos.find(p => p.ativo) || planos[0];
  console.log(planoAtivo)

  if (planoAtivo === undefined) {
    return (
      <div>
        <OffCanvasNavBar />
        <p>Parece que você ainda não selecionou um plano de treino.</p>
        <p>Para acessar a biblioteca de treinos:</p>
        <Button link="/biblioteca-treino" title="Clique Aqui"></Button>
      </div >
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
          <TreinoCard rotina={rotinaHoje} />
        ) : (
          <p>Nenhum exercício encontrado para hoje.</p>
        )}
        <FooterButton title="Finalizar Treino" onClick={handleFinalizar}></FooterButton>
      </main>
    </>
  );
}