import React from 'react';
import { Link } from 'react-router-dom';
import styles from "/workspaces/WorkoutWEB/app/src/pages/select-treino/select-treino.module.css";

const LastWorkout = ({ dia, foco, lastDone }) => {
    return (
        <Link to='/treino' className={`${styles.card} ${styles['card-last-workout']}`}>
            <div className={styles['card-header-small']}>
                <span>📅 ÚLTIMO TREINO</span>
            </div>
            <h3>{`${dia} - ${foco}`}</h3>
            <p className={styles['text-muted']}>Realizado há {lastDone}</p>
        </Link>
    );
}

export default LastWorkout;