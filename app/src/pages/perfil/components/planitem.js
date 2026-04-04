import React from 'react';
import styles from './perfil.module.css';

const PlanItem = ({ label, valor, destaque = false }) => {
    return (
        <div className={styles.planoItem}>
            <span className={styles.label}>{label}</span>
            <p className={destaque ? styles.valorDestaque : styles.valor}>{valor}</p>
        </div>
    );
};

export default PlanItem;