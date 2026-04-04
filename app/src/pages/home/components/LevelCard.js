import React from 'react';
import styles from './home.module.css';

const LevelCard = ({ nivelAtual, descricao }) => {
    return (
        <div className={styles.levelCard}>
            <div className={styles.levelHeader}>
                <div className={styles.levelIcon}>⭐</div>
                
                <div className={styles.levelTextContainer}>
                    <h3 className={styles.levelSubtitle}>Nível de Experiência Detectado</h3>
                    <h2 className={styles.levelTitle}>{nivelAtual}</h2>
                    <p className={styles.levelDesc}>{descricao}</p>
                </div>
                
                <div className={styles.levelTabs}>
                    <div className={nivelAtual === 'Iniciante' ? styles.tabActive : styles.tabInactive}>Iniciante</div>
                    <div className={nivelAtual === 'Intermediário' ? styles.tabActive : styles.tabInactive}>Intermediário</div>
                    <div className={nivelAtual === 'Avançado' ? styles.tabActive : styles.tabInactive}>Avançado</div>
                </div>
            </div>
        </div>
    );
};

export default LevelCard;