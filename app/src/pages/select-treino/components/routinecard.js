import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./select-treino.module.css";

const RoutineCard = ({ 
    letter, 
    colorClass, 
    dia, 
    foco, 
    lastDone, 
    exercises, 
    time 
}) => {
    return (
        <Link to='/treino' className={`${styles.card} ${styles['card-white']}`}>
            <div className={styles['card-body-flex']}>
                
                {/* O ícone com a letra (A, B, C...) e a cor dinâmica */}
                <div className={`${styles['icon-letter']} ${colorClass}`}>
                    {letter}
                </div>
                
                <div className={styles['workout-info']}>
                    <h3>Treino {dia}</h3>
                    <p className={styles['text-muted']}>{foco}</p>
                </div>
                
                <div className={styles['workout-time']}>
                    <span className={styles['time-label']}>Última vez</span>
                    <p><strong>{lastDone}</strong></p>
                </div>
                
            </div>
            
            <div className={styles['card-footer-stats']}>
                <span>{exercises} exercícios</span> • <span>~{time} min</span>
            </div>
        </Link>
    );
};

export default RoutineCard;