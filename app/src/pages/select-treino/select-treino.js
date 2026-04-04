import React, { useState, useEffect } from 'react';
import styles from "./select-treino.module.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTreinoList } from '../../redux/treino/actions';
import RoutineCard from './components/routinecard';
import LastWorkout from './components/lastworkout.js';
import HighlightWorkoutCard from './components/HighlightWorkoutCard.js';


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

                <LastWorkout
                    dia={treino.rotina[0]?.dia}
                    foco={treino.rotina[0]?.foco}
                    lastDone={2}
                />

                <HighlightWorkoutCard
                    variant="green"
                    badgeText="✨ RECOMENDADO HOJE"
                    title={`Treino ${treino?.rotina[1]?.dia}`}
                    subtitle={treino?.rotina[1]?.foco}
                    footerText={
                        <>
                            <span>6 exercícios</span> • <span>~50 min</span>
                        </>
                    }
                    linkTo="/treino"
                />

                <RoutineCard
                    letter="A"
                    colorClass={styles['bg-blue-light']}
                    dia={treino?.rotina[0]?.dia}
                    foco={treino?.rotina[0]?.foco}
                    lastDone="2 dias atrás"
                    exercises={5}
                    time={45}
                />

                <RoutineCard
                    letter="C"
                    colorClass={styles['bg-purple-light']}
                    dia={treino?.rotina[2]?.dia}
                    foco={treino?.rotina[2]?.foco}
                    lastDone="4 dias atrás"
                    exercises={7}
                    time={60}
                />

                <div className={styles.divider}>
                    <span>OU</span>
                </div>

                <HighlightWorkoutCard
                    variant="purple"
                    badgeText="✨ PERSONALIZE"
                    title="Treino Livre"
                    subtitle="Monte sua própria sessão"
                    footerText="Escolha os exercícios que você quer fazer hoje"
                    linkTo="/plano"
                />
            </main>
        </div>
    );
}
