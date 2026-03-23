import React from "react";
import styles from './exercicio.module.css'
import { Link } from "react-router-dom";

export default function Exercicio(){
    return(
        <div className={styles.exercicioRoot}>
        <header className={styles['app-header']}>
        <div>
            <div className={styles.title}>
                <Link to ="/treino" className={styles.arrow}>⬅️</Link>
                <h2>Supino Reto</h2>
            </div>
            <p className={styles.subtitle}><a className={styles['num-series']}>3x </a><a> 12-15 </a>reps</p>
            <div className={styles.line}></div>
        </div>
    </header>
         <main>
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
        <div className={styles.dica}>
            <a>🚨</a>
            <p className={styles.title}><strong>💡 Dica de Execução</strong></p>
            <p>Mantenha uma leve flexão nos cotovelos durante todo o movimento. Desça
                os halteres até sentir um bom alongamento no peito e contraia com força na subida.
                Mantenha os ombros estabilizados no banco.
            </p>
        </div>
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
        <div className={styles['substitutos-container']}>
            <div className={styles['substitutos-title']}>
                <a className={styles.substituir}>🔄️</a>
                <div>
                    <p className={styles.title}>Exercícios Substitutos</p>
                    <p className={styles.subtitle}>Alternativas para o mesmo grupo muscular:</p>
                </div>
            </div>
            <div className={styles['exercicios-substitutos']}>
                <div className={styles['exercicio-substituto']}>
                    <p className={styles.exercicio}>Supino com Halteres</p>
                    <p>Grupo: <a>Peito</a> . Equipamento: <a>Halteres</a></p>
                </div>
                <div className={styles['exercicio-substituto']}>
                    <p className={styles.exercicio}>Supino com Halteres</p>
                    <p>Grupo: <a>Peito</a> . Equipamento: <a>Halteres</a></p>
                </div>
                <div className={styles['exercicio-substituto']}>
                    <p className={styles.exercicio}>Supino com Halteres</p>
                    <p>Grupo: <a>Peito</a> . Equipamento: <a>Halteres</a></p>
                </div>
            </div>
        </div>
    </main>
        </div>
    )
}