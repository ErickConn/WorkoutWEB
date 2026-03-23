import React from "react"
import styles from './treino.module.css';
import { Link } from "react-router-dom";
import TreinoCard from "./components/treino-card";

export default function Treino(){
    const treino = {
        nome: "Treino A - Peito e Tríceps",
        gruposMusculares: [
            {
                nome: "Peito",
                exercicios: [
                    { nome: "Supino Reto", numSeries: "4x", numReps: "8-10", carga: "80kg" },
                    { nome: "Supino Inclinado", numSeries: "4x", numReps: "8-10", carga: "80kg" }
                ]
            },
            {
                nome: "Tríceps",
                exercicios: [
                    { nome: "Tríceps Corda", numSeries: "4x", numReps: "8-10", carga: "80kg" },
                    { nome: "Tríceps Barra", numSeries: "4x", numReps: "8-10", carga: "80kg" }
                ]
            }
        ]
    };

    return(
        <main>
            <Link to='/select-treino' className={styles['card-treino']}>
                <p><strong>Treino Sugerido </strong><span className={styles['treino-atual-num']}>2/5</span> </p>
                <span className={styles['treino-atual']}>{treino.nome}</span>
                <div className={styles['progress-bar']}>
                    <div className={styles.progress}></div>
                </div>
            </Link>
            <div className={styles['treino-livre']}>
                <Link to="/treino-livre"><strong>🌟 Iniciar Treino Livre</strong></Link>
            </div>
            <TreinoCard treino={treino}></TreinoCard>
        </main>
    )
}