import React, { useState, useEffect } from 'react';
import styles from './components/home.module.css';
import { Link } from 'react-router-dom';
import { fetchBiometriaList } from '../../redux/Biometria/actions';
import { useDispatch,useSelector } from 'react-redux';
import CalcCard from './components/CalcCard';
import ResultCard from './components/ResultCard';
import LevelCard from './components/LevelCard';

export default function Home() {
  
  const dispatch = useDispatch();
  const biometria = useSelector(state => state.biometriaReducer.biometria);
  console.log('Dados biométricos:', biometria);
  useEffect(() => {
      dispatch(fetchBiometriaList());
    }, [dispatch]);
    if (!biometria || biometria.length === 0) {
    return (
      <div className={styles.container}>
        <p>Carregando dados biométricos...</p>
      </div>
    );
    
  }
    const usuario = biometria[0]?.usuario;
    const perfil = usuario?.perfil_biometrico;
    const analise = usuario?.analise_metabolica;
  return (
   <div className={styles.pageWrapper}>
            <div className={styles.container}>

                {/* Header */}
                <div className={styles.header}>
                    <h1 className={styles.headerTitle}>Dashboard Biométrico</h1>
                    <p className={styles.headerSubtitle}>Análise do seu perfil</p>
                </div>

                {/* Content */}
                <div className={styles.content}>
                    
                    <CalcCard 
                        peso={perfil?.peso_kg} 
                        altura={perfil?.altura_cm} 
                        idade={perfil?.idade} 
                    />

                    <ResultCard 
                        tmbCalculada={analise?.tmb_kcal || "1,845"} 
                        gastoEnergetico={analise?.gasto_energetico_total_kcal} 
                    />

                    <LevelCard 
                        nivelAtual="Intermediário"
                        descricao="Com base no seu perfil, o sistema identificou que você está no nível intermediário. Isso significa que você tem experiência com treinos regulares e pode realizar exercícios mais complexos."
                    />

                    {/* Botão Final */}
                    <Link to="/" className={styles.actionBtn}>
                        <span>🎯</span> Salvar
                    </Link>

                </div>
            </div>
        </div>
  );
}