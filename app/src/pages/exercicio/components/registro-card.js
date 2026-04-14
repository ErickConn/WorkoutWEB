import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from '../exercicio.module.css';
import { atualizarExercicioTreino } from "../../../redux/exercicio/actions";

export default function RegistroCard({ exercicioOriginal }) {
  const dispatch = useDispatch();
  const [carga, setCarga] = useState(exercicioOriginal.cargaRealizada || "");
  const [reps, setReps] = useState(exercicioOriginal.repsRealizadas || "");

  const handleSalvar = () => {
    const exercicioEditado = {
      ...exercicioOriginal,
      cargaRealizada: carga,
      repsRealizadas: reps,
      concluido: true
    };
    dispatch(atualizarExercicioTreino(exercicioOriginal.id, exercicioEditado));
    alert("Exercício atualizado!");
  };

  return (
    <section className={styles.whiteCard}>
      <h2 className={styles.sectionTitle}>⚡ Registro de Hoje</h2>
      <div className={styles.inputGroup}>
        <div className={styles.inputField}>
          <label>Peso (kg)</label>
          <input type="number" value={carga} onChange={e => setCarga(e.target.value)} />
        </div>
        <div className={styles.inputField}>
          <label>Reps Realizadas</label>
          <input type="number" value={reps} onChange={e => setReps(e.target.value)} />
        </div>
      </div>
      <button className={styles.saveButton} onClick={handleSalvar}>Concluir</button>
    </section>
  );
}