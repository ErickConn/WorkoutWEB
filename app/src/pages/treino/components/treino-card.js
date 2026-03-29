import React from "react";
import styles from '../treino.module.css';
import ExerciseCard from "./exercise-card";

export default function TreinoCard({ rotina }) {
  if (!rotina || !rotina.exercicios) return null;

  const exerciciosAgrupados = rotina.exercicios.reduce((acc, ex) => {
    const grupo = ex.grupo || "Outros";
    if (!acc[grupo]) acc[grupo] = [];
    acc[grupo].push(ex);
    return acc;
  }, {});


  const gruposMusculares = Object.keys(exerciciosAgrupados);

  return (
    <div className={styles.treino}>
      {gruposMusculares.map((grupo) => (
        <div key={grupo} className={styles['grupo-muscular']}>
          <h3 className={styles.tituloGrupo}>{grupo}</h3>
          
          <div className={styles.listaCards}>
            {exerciciosAgrupados[grupo].map((ex) => (
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
        </div>
      ))}
    </div>
  );
}