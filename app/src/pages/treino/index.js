import styles from './treino.module.css';
import { Link } from "react-router-dom";
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import TreinoCard from "./components/treino-card";
import { useSelector, useDispatch } from "react-redux";
import { useState, React } from "react"

export default function Treino() {
  const [teste, setTeste] = useState(false);
  const treino  = useSelector(rootReducer => rootReducer.treinoReducer);

  const dispatch = useDispatch();

  console.log(treino);

  const handleTeste = () => {
    dispatch({
      type: "treino/teste",
      payload: {
        mensagem: "isso é um teste",
        status: 200,
      }
    })
  }

  return (
    <>
    <Header></Header>
    <button onClick={handleTeste}>TESTE</button>
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

      <TreinoCard treino={treino.currentTreino} />
      <Menu></Menu>
    </main>
    </>
  );
}