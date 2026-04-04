import React from 'react';
import styles from '/workspaces/WorkoutWEB/app/src/pages/perfil/perfil.module.css';

const MetricItem = ({ label, valor, unidade }) => {
    return (
        <div className={styles.dadoItem}>
            <span className={styles.dadoLabel}>{label}</span>
            <p className={styles.dadoValor}>
                {valor} <span className={styles.dadoUnidade}>{unidade}</span>
            </p>
        </div>
    );
};

export default MetricItem;