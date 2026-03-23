import React from "react";
import styles from '../exercicio.module.css';

export default function SeriesCard(){
    return(
        <div className={styles['series-container']}>
                    <h3 className={styles.title}>📝 Séries Realizadas</h3>
                    <div className={styles.series}>
                        <p>
                            <a>Série #1</a>
                            <a className={styles.detalhes}>12 reps x 22kg</a>
                        </p>
                         <p>
                            <a>Série #2</a>
                            <a className={styles.detalhes}>12 reps x 22kg</a>
                        </p>
                         <p>
                            <a>Série #3</a>
                            <a className={styles.detalhes}>12 reps x 22kg</a>
                        </p>
                    </div>
                </div>
    )
}