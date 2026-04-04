import React from 'react';
import styles from './home.module.css';

const ResultCard = ({ tmbCalculada, gastoEnergetico }) => {
    return (
        <div className={styles.resultCard}>
            <h3 className={styles.resultTitle}>📊 Análise Calculada</h3>
            <div className={styles.resultRowGroup}>
                
                <div className={styles.resultBox}>
                    <span className={styles.resultLabel}>TMB (Taxa Metabólica Basal)</span>
                    <span className={styles.resultValue}>{tmbCalculada} Kcal</span>
                </div>
                
                <div className={styles.resultBox}>
                    <span className={styles.resultLabel}>Gasto Energético Total</span>
                    <span className={styles.resultValue}>{gastoEnergetico} Kcal</span>
                </div>
                
            </div>
        </div>
    );
};

export default ResultCard;