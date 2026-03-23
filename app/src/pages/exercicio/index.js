import React from "react";
import styles from './exercicio.module.css'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import SubstitutosCard from "./components/substitutos-card";
import SeriesCard from "./components/series-card";
import RegistroCard from "./components/registro-card";

export default function Exercicio(){
    const exercicios = [
                    { nome: "Supino Reto", numSeries: "3x", numReps: "8-12", carga: "30kg", dica: "Faça o supino reto...", substitutos:[{
                        nome: "Supino Banco",
                        grupo: "Peito",
                        equipamento: "Halteres",
                    },
                    {
                        nome: "Supino Máquina",
                        grupo: "Peito",
                        equipamento: "Máquina", 
                    }
                ]},
                    { nome: "Supino Inclinado", numSeries: "4x", numReps: "8-10", carga: "50kg", dica: "Faça o supino inclinado...", substitutos:[{
                        nome: "Supino Banco",
                        grupo: "Peito",
                        equipamento: "Halteres",
                    },
                    {
                        nome: "Supino Máquina",
                        grupo: "Peito",
                        equipamento: "Máquina", 
                    }
                ]},
                    { nome: "Tríceps Corda", numSeries: "3x", numReps: "8", carga: "30kg", dica: "Faça o tríceps corda...", substitutos:[{
                        nome: "Tríceps Banco",
                        grupo: "Tríceps",
                        equipamento: "Halteres",
                    },
                    {
                        nome: "Tríceps Máquina",
                        grupo: "Tríceps",
                        equipamento: "Máquina", 
                    }
                ]},
                    { nome: "Tríceps Barra", numSeries: "4x", numReps: "8-10", carga: "40kg", dica: "Faça o tríceps barra...", substitutos:[{
                        nome: "Tríceps Banco",
                        grupo: "Tríceps",
                        equipamento: "Halteres",
                    },
                    {
                        nome: "Tríceps Máquina",
                        grupo: "Tríceps",
                        equipamento: "Máquina", 
                    }
                ]}
                ]
    const { id } = useParams();
    return(
        <div className={styles.exercicioRoot}>
        <div className={`${styles.exerciseHeader} ${styles['app-header']}`}>
            <div className={styles.title}>
                <Link to ="/treino" className={styles.arrow}>⬅️</Link>
                <h2>{exercicios[id].nome}</h2>
            </div>
            <p className={styles.subtitle}><a className={styles['num-series']}>{exercicios[id].numSeries} </a><a> {exercicios[id].numReps} </a>reps</p>
            <div className={styles.line}></div>
        </div>
         <main>
        <RegistroCard></RegistroCard>
        <div className={styles.dica}>
            <a>🚨</a>
            <p className={styles.title}><strong>💡 Dica de Execução</strong></p>
            <p>{exercicios[id].dica}
            </p>
        </div>
        <SeriesCard></SeriesCard>
        <SubstitutosCard dados={exercicios[id].substitutos}></SubstitutosCard>
    </main>
        </div>
    )
}