import React from "react";
import styles from "./progresso.module.css";

export default function Progresso() {
  return (
    <>
    <header className={styles['app-header']}>
        <h2>DashBoard de Progresso</h2>
    </header> 
    <main> 
        <div className={styles.dashboard}>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <div className={styles.emoji}>🏋️</div>
                    <h2><strong> 6000 </strong></h2>
                    <p>Carga Total (Kg)</p>
                    <div className={styles['status-ganho']}> +1500 kg</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.emoji}>⚖️</div>
                    <h2><strong> 81,2 </strong></h2>
                    <p>Peso Atual (Kg)</p>
                    <div className={styles['status-perda']}>-2,7 kg</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.emoji}>📅</div>
                    <h2><strong> 7 semanas</strong></h2>
                    <p>de acompanhamento</p>
                </div>
            </div>
            <div className={styles['chart-buttons']}>
                <button id="btnForca" className={styles.active}>Evolução da Força</button>
                <button id="btnPeso">Evolução do Peso</button>
            </div>
            <div className={styles['chart-area']}>
                <canvas id="mainChart"></canvas>
            </div>
            <div className={styles.report}>
                <h3>📊 Relatório de Evolução</h3>
                <ul>
                    <li> Sua porcentagem de aumento/diminuição de força aqui.</li>
                    <li>Ganho/Perda de peso corporal aqui.</li>
                    <li>Progressão média de carga por semana aqui.</li>
                </ul>
            </div>
        </div>
    </main>
    </>
  )
}