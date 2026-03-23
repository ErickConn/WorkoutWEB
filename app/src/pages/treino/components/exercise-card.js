import React from "react";
import styles from '../treino.module.css';
import { Link } from "react-router-dom";

export default function ExerciseCard( properties ){
    return(
        <>
            <div className={styles['box-exercicio']}>
                <label className={styles.container}>
                    <input type="checkbox" className={styles.check}/>
                    <span className={styles.checkmark}></span>
                </label>
                <span className={styles['nome-exercicio']}>{properties.nome}</span>
                <p><span className={styles['num-series']}>{properties.numSeries} </span>
                <span className={styles['num-repeticoes']}>{properties.numReps}</span> . <span className={styles.carga}>{properties.carga}</span></p>
                <Link to={`/exercicio/${properties.id}`} className={styles.edit}>&gt;</Link>
            </div>
        </>
    )
}
