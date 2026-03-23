import React from "react";
import styles from '../exercicio.module.css';

export default function SubstitutosCard(properties){
    console.log(properties.dados)
    return(
       <div className={styles['substitutos-container']}>
            <div className={styles['substitutos-title']}>
                <a className={styles.substituir}>🔄️</a>
                <div>
                    <p className={styles.title}>Exercícios Substitutos</p>
                    <p className={styles.subtitle}>Alternativas para o mesmo grupo muscular:</p>
                </div>
            </div>
            <div className={styles['exercicios-substitutos']}>
                {properties.dados.map((exercicio, index)=>{
                    return(
                        <div key={index} className={styles['exercicio-substituto']}>
                            <p className={styles.exercicio}>{exercicio.nome}</p>
                            <p>Grupo: <a>{exercicio.grupo}</a> . Equipamento: <a>{exercicio.equipamento}</a></p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}