import React from "react"
import styles from './treino.module.css';
import { Link } from "react-router-dom";

export default function Treino(){
    return(
        <main>
            <Link to='/treino-livre' className={styles['card-treino']}>
                <p><strong>Treino Sugerido </strong><span className={styles['treino-atual-num']}>2/5</span> </p>
                <span className={styles['treino-atual']}>Treino A - Peito e Tríceps</span>
                <div className={styles['progress-bar']}>
                    <div className={styles.progress}></div>
                </div>
            </Link>
            <div className={styles['treino-livre']}>
                <Link to="/treino-livre"><strong>🌟 Iniciar Treino Livre</strong></Link>
            </div>
            <div id="treino">
                <div className={styles['grupo-muscular']}>
                    <h3>Peito</h3>
                    <div className={styles['box-exercicio']}>
                        <label className={styles.container}>
                            <input type="checkbox" className={styles.check}/>
                            <span className={styles.checkmark}></span>
                        </label>
                        <span className={styles['nome-exercicio']}>Supino Reto</span>
                        <p><span className={styles['num-series']}>4x </span>
                        <span className={styles['num-repeticoes']}>8-10</span> . <span className={styles.carga}>60kg</span></p>
                        <Link to='/exercicio' className={styles.edit}>&gt;</Link>
                    </div>
                </div>
                <div className={styles['grupo-muscular']}>
                    <h3>Tríceps</h3>
                    <div className={styles['box-exercicio']}>
                        <label className={styles.container}>
                            <input type="checkbox" className={styles.check}/>
                            <span className={styles.checkmark}></span>
                        </label>
                        <span className={styles['nome-exercicio']}>Tríceps Corda</span>
                        <p><span className={styles['num-series']}>4x </span><span className={styles['num-repeticoes']}>8-10</span> . <span className={styles.carga}>60kg</span></p>
                        <Link to='/exercicio' className={styles.edit}>&gt;</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}