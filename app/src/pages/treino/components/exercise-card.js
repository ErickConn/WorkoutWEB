import React, { useState } from "react";
import styles from '../treino.module.css';
import { Link } from "react-router-dom";

export default function ExerciseCard({ id, nome, series, reps, carga }) {
  const [isDone, setIsDone] = useState(false);

  return (
    <div className={styles['box-exercicio']}>
      <Link to={`/exercicio/${id}`} className={styles.edit}>✎</Link>

      <div className={styles.flexContainer}>
        <label className={styles.container}>
          <input 
            type="checkbox" 
            checked={isDone}
            onChange={() => setIsDone(!isDone)}
          />
          <span className={styles.checkmark}></span>
        </label>

        <div className={`${styles['nome-exercicio']} ${isDone ? styles.checked : ''}`}>
          <p className={styles.planName}>{nome}</p>
          <div className={styles['grupo-muscular-info']}>
            <p>
              {series} x {reps} reps | <span className={styles.carga}>{carga} kg</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}