import React, { useEffect, useState } from "react";
import styles from './treino.module.css';
import { Link } from "react-router-dom";
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import TreinoCard from "./components/treino-card";
import { useSelector, useDispatch } from "react-redux";
import OffCanvasNavBar from "../../components/OffCanvasNavBar";
import { fetchTreinoList } from "../../redux/treino/actions";

export default function Treino() {
  const dispatch = useDispatch();
  const planos = useSelector(state => state.treinoReducer.planos);

  useEffect(() => {
    dispatch(fetchTreinoList());
  }, [dispatch]);

  if (!planos || planos.length === 0) {
    return (
      <div className={styles.mainContainer}>
        <OffCanvasNavBar></OffCanvasNavBar>
        <p>Carregando Treino...</p>
      </div>
    );
  }

  const planoAtivo = planos[0];
  const rotinaHoje = planoAtivo.rotina ? planoAtivo.rotina[0] : null;

  return (
    <>
      <OffCanvasNavBar/>
      <main className={styles.mainContainer}>
        <Link to='/select-treino' className={styles.progressCard}>
          <div className={styles.progressHeader}>
            <div>
              <h2 className={styles.progressTitle}>{planoAtivo.titulo}</h2>
              <p className={styles.progressSubtitle}>Hoje: {rotinaHoje?.foco}</p>
            </div>
            <div className={styles.progressBadge}>
              <span className={styles.badgeText}>{planoAtivo.badge}</span>
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
              {planoAtivo.categoria || "Modelo"}
            </div>
          </div>
        </Link>

        {rotinaHoje && <TreinoCard rotina={rotinaHoje} />}
      
      </main>
    </>
  );
}