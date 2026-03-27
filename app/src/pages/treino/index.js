import React from "react";
import styles from './treino.module.css';
import { Link } from "react-router-dom";
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import TreinoCard from "./components/treino-card";

export default function Treino() {
  const treino = {
    nome: "Treino A - Peito e Tríceps",
    gruposMusculares: [
      {
        nome: "Peito",
        exercicios: [
          { id: 0, nome: "Supino Reto", numSeries: "4x", numReps: "8-10", carga: "80kg" },
          { id: 1, nome: "Supino Inclinado", numSeries: "4x", numReps: "8-10", carga: "80kg" }
        ]
      },
      {
        nome: "Tríceps",
        exercicios: [
          { id: 2, nome: "Tríceps Corda", numSeries: "4x", numReps: "8-10", carga: "80kg" },
          { id: 3, nome: "Tríceps Barra", numSeries: "4x", numReps: "8-10", carga: "80kg" }
        ]
      }
    ]
  };

  return (
    <>
    <Header></Header>
    <main className={styles.mainContainer}>
      <Link to='/select-treino' className={styles.progressCard}>
        <div className={styles.progressHeader}>
          <div>
            <h2 className={styles.progressTitle}>Treino A</h2>
            <p className={styles.progressSubtitle}>Peito e Tríceps</p>
          </div>
          <div className={styles.progressBadge}>
            <span className={styles.badgeText}>2/5</span>
          </div>
        </div>
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill}></div>
        </div>
      </Link>

      <Link to='/biblioteca-treino' className={styles.planCard}>
        <div className={styles.planContent}>
          <div>
            <p className={styles.planLabel}>Plano Ativo</p>
            <p className={styles.planName}>ABC Intermediário</p>
          </div>
          <div className={styles.planTag}>
            Modelo
          </div>
        </div>
      </Link>

      <TreinoCard treino={treino} />
      <Menu></Menu>
    </main>
    </>
  );
}