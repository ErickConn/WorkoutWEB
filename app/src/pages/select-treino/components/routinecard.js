import React from 'react';
import styles from "./select-treino.module.css";

const RoutineCard = ({ 
    letter, 
    colorClass, 
    dia, 
    foco, 
    lastDone, 
    exercises, 
    time,
    onClick
}) => {
    return (
        <div 
            onClick={onClick} 
            className={`${styles.card} ${styles['card-white']}`}
            style={{ cursor: 'pointer' }} 
        >
            <div className={styles['card-body-flex']}>
                
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
        </div>
    );
};

export default RoutineCard;