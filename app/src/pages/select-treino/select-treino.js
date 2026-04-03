import React, { useState, useEffect } from 'react';
import styles from "./select-treino.module.css";
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { fetchTreinoList } from '../../redux/treino/actions';


export default function Selecttreino() {
    const dispatch = useDispatch();
    const treino = useSelector(state => state.treinoReducer.planos[0]);
    console.log('Dados dos treinos:', treino);
    useEffect(() => {
        dispatch(fetchTreinoList());
    }, [dispatch]);
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
                    <h3>{`${treino?.rotina[0]?.dia} - ${treino?.rotina[0]?.foco}`}</h3>
                    <p className={styles['text-muted']}>Realizado há 2 dias</p>
                </Link>

                <Link to='/treino' className={`${styles.card} ${styles['card-green']}`} onClick={() => {}}>
                    <div className={styles['card-header-flex']}>
                        <span className={styles['badge-title']}>✨ RECOMENDADO HOJE</span>
                        <span className={styles.arrow}>➔</span>
                    </div>
                    <h2>Treino {treino?.rotina[1]?.dia}</h2>
                    <p className={styles.subtitle}>{treino?.rotina[1]?.foco}</p>
                    <div className={styles['card-stats']}>
                        <span>6 exercícios</span> • <span>~50 min</span>
                    </div>
                </Link>

                <Link to='/treino' className={`${styles.card} ${styles['card-white']}`} onClick={() => {}}>
                    <div className={styles['card-body-flex']}>
                        <div className={`${styles['icon-letter']} ${styles['bg-blue-light']}`}>A</div>
                        <div className={styles['workout-info']}>
                            <h3>Treino {treino?.rotina[0]?.dia}</h3>
                            <p className={styles['text-muted']}>{treino?.rotina[0]?.foco}</p>
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
                            <h3>Treino {treino?.rotina[2]?.dia}</h3>
                            <p className={styles['text-muted']}>{treino?.rotina[2]?.foco}</p>
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
