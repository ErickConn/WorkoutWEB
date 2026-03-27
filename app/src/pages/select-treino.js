import React from 'react';
import styles from "./select-treino.module.css";
import { Link } from 'react-router-dom';

export default function Selecttreino() {
    return (
        <div className={styles['app-container']}>
            <main className={styles.content}>
                <div className={styles['banner-blue']}>
                    <h2>Escolha Seu Treino</h2>
                    <p>Selecione o treino de hoje</p>
                </div>

                <Link to='/treino' className={`${styles.card} ${styles['card-last-workout']}`}>
                    <div className={styles['card-header-small']}>
                        <span>📅 ÚLTIMO TREINO</span>
                    </div>
                    <h3>Treino A - Peito e Tríceps</h3>
                    <p className={styles['text-muted']}>Realizado há 2 dias</p>
                </Link>

                <Link to='/treino' className={`${styles.card} ${styles['card-green']}`} onClick={() => {}}>
                    <div className={styles['card-header-flex']}>
                        <span className={styles['badge-title']}>✨ RECOMENDADO HOJE</span>
                        <span className={styles.arrow}>➔</span>
                    </div>
                    <h2>Treino B</h2>
                    <p className={styles.subtitle}>Costas e Bíceps</p>
                    <div className={styles['card-stats']}>
                        <span>6 exercícios</span> • <span>~50 min</span>
                    </div>
                </Link>

                <Link to='/treino' className={`${styles.card} ${styles['card-white']}`} onClick={() => {}}>
                    <div className={styles['card-body-flex']}>
                        <div className={`${styles['icon-letter']} ${styles['bg-blue-light']}`}>A</div>
                        <div className={styles['workout-info']}>
                            <h3>Treino A</h3>
                            <p className={styles['text-muted']}>Peito e Tríceps</p>
                        </div>
                        <div className={styles['workout-time']}>
                            <span className={styles['time-label']}>Última vez</span>
                            <p><strong>2 dias atrás</strong></p>
                        </div>
                    </div>
                    <div className={styles['card-footer-stats']}>
                        <span>5 exercícios</span> • <span>~45 min</span>
                    </div>
                </Link>

                <Link to='/treino' className={`${styles.card} ${styles['card-white']}`} onClick={() => {}}>
                    <div className={styles['card-body-flex']}>
                        <div className={`${styles['icon-letter']} ${styles['bg-purple-light']}`}>C</div>
                        <div className={styles['workout-info']}>
                            <h3>Treino C</h3>
                            <p className={styles['text-muted']}>Pernas e Ombros</p>
                        </div>
                        <div className={styles['workout-time']}>
                            <span className={styles['time-label']}>Última vez</span>
                            <p><strong>4 dias atrás</strong></p>
                        </div>
                    </div>
                    <div className={styles['card-footer-stats']}>
                        <span>7 exercícios</span> • <span>~60 min</span>
                    </div>
                </Link>

                <div className={styles.divider}>
                    <span>OU</span>
                </div>
                
                <Link to='/treino-livre' className={`${styles.card} ${styles['card-purple']}`} onClick={() => {}}>
                    <div className={styles['card-header-flex']}>
                        <span className={styles['badge-title']}>✨ PERSONALIZE</span>
                        <span className={styles.arrow}>➔</span>
                    </div>
                    <h2>Treino Livre</h2>
                    <p className={styles.subtitle}>Monte sua própria sessão</p>
                    <p className={styles['small-text']}>Escolha os exercícios que você quer fazer hoje</p>
                </Link>
            </main>
        </div>
    );
}
