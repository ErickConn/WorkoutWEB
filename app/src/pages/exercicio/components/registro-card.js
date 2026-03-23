import React from "react";
import styles from '../exercicio.module.css';

export default function RegistroCard(){
    return(
        <div className={styles.registro}>
                    <div className={styles.desempenho}>
                        <h3>⚡Registro de Desempenho</h3>
                        <div className={styles.carga}>
                            <p className={styles['carga-ant']}>CARGA ANTERIOR</p>
                            <p className={styles.peso}><strong>20</strong> kg</p>
                        </div>
                        <div className={styles['carga-hoje']}>
                            <label>Carga de Hoje</label>
                            <div className={styles['input-container']}>
                                <input type="number" min="0" step="0.01" placeholder="22"/>
                                <a>kg</a>
                            </div>
                        </div>
                    </div>
                        <div className={styles.progresso}>
                            <p><strong>+2.0kg de progresso! 🟢</strong></p>
                        </div>
                    </div>
    )
}