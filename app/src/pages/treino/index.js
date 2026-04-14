import React, { useEffect } from "react";
import styles from './treino.module.css';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTreinoList, finalizarTreino } from "../../redux/treino/actions";
import OffCanvasNavBar from "../../components/OffCanvasNavBar";
import FooterButton from "../../components/FooterButton";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import ExerciseCard from "./components/exercise-card"; 

export default function Treino() {
  const dispatch = useDispatch();
  const planos = useSelector(state => state.treinoReducer.planos);
  const loading = useSelector(state => state.treinoReducer.loading);

  useEffect(() => {
    if (!planos || planos.length === 0) {
      dispatch(fetchTreinoList());
    }
  }, [dispatch, planos]);

  const handleFinalizar = async () => {
    await dispatch(finalizarTreino());
    alert("Parabéns! Treino Concluído!");
  };

  const planoAtivo = planos.find(p => p.ativo);
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
        </div>
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
        <h2>{planoAtivo.titulo}</h2>
        <p>Hoje: {rotinaHoje?.foco} ({rotinaHoje?.dia})</p>

        {rotinaHoje ? (
          <div>
            {rotinaHoje.exercicios.map(exercicio => (
              <ExerciseCard
                key={exercicio.id}
                id={exercicio.id}
                nome={exercicio.nome}
                series={exercicio.seriesPadrao}
                reps={exercicio.repsPadrao}
                cargaRealizada={exercicio.cargaRealizada}
                concluido={exercicio.concluido}
              />
            ))}
          </div>
        ) : (
          <p>Nenhum exercício encontrado para hoje.</p>
        )}

        <FooterButton title="Finalizar Treino" onClick={handleFinalizar} />
      </main>
    </>
  );
}