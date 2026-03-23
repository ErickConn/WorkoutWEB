import React from "react";
import styles from '../treino.module.css';
import ExerciseCard from "./exercise-card";

export default function TreinoCard( { treino } ){
    console.log(treino)

    if (!treino) return <p>Carregando treino...</p>;

    return(
        <>
        <div id="treino">
            {treino.gruposMusculares.map((grupo, index) => (
                <div key={index} className={styles['grupo-muscular']}>
                    <h3>{grupo.nome}</h3>
                    {grupo.exercicios.map((exercicio, indexE) => (
                        <ExerciseCard 
                            key={indexE}
                            id={exercicio.id}
                            nome={exercicio.nome}
                            numSeries={exercicio.numSeries}
                            numReps={exercicio.numReps}
                            carga={exercicio.carga}
                        />
                    ))}
                </div>
            ))}
        </div>
        </>
    )
}