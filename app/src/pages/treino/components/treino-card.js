import React from "react";
import styles from '../treino.module.css';
import ExerciseCard from "./exercise-card";

export default function TreinoCard({ rotina }) {
  if (!rotina || !rotina.exercicios) return null;

  const exerciciosPeito = rotina.exercicios.filter(ex => ex.grupo === "Peito");
  const exerciciosTriceps = rotina.exercicios.filter(ex => ex.grupo === "Tríceps");

  return (
    <div className={styles.treino}>
      
      {exerciciosPeito.length > 0 && (
        <div className={styles['grupo-muscular']}>
          <h3>Peito</h3>
          {exerciciosPeito.map((ex) => (
            <ExerciseCard 
              key={ex.id}
              id={ex.id}
              nome={ex.nome}
              series={ex.seriesPadrao}
              reps={ex.repsPadrao}
              carga={ex.cargaSugerida || "--"}
            />
          ))}
        </div>
      )}

      {exerciciosTriceps.length > 0 && (
        <div className={styles['grupo-muscular']}>
          <h3>Tríceps</h3>
          {exerciciosTriceps.map((ex) => (
            <ExerciseCard 
              key={ex.id}
              id={ex.id}
              nome={ex.nome}
              series={ex.seriesPadrao}
              reps={ex.repsPadrao}
              carga={ex.cargaSugerida || "--"}
            />
          ))}
        </div>
      )}

    </div>
  );
}