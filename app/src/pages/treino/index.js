import styles from './treino.module.css';
import { Link } from "react-router-dom";
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import TreinoCard from "./components/treino-card";
import { useSelector, useDispatch } from "react-redux";
import { React } from "react"

export default function Treino() {
  const treino  = useSelector(rootReducer => rootReducer.treinoReducer);

  console.log(treino);

  return (
    <>
    <Header></Header>
    <main className={styles.mainContainer}>
      <Link to='/select-treino' className={styles.progressCard}>
        <div className={styles.progressHeader}>
          <div>
            <h2 className={styles.progressTitle}>{treino.planos[0].treinos[0].nome.title}</h2>
            <p className={styles.progressSubtitle}>{treino.planos[0].treinos[0].nome.subtitle}</p>
          </div>
          <div className={styles.progressBadge}>
            <span className={styles.badgeText}>2/3</span>
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

      <TreinoCard treino={treino.planos[0].treinos[0]} />
      <Menu></Menu>
    </main>
    </>
  );
}