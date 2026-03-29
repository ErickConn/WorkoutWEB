import React, { useState } from 'react';
import styles from './home.module.css';
import { Link } from 'react-router-dom';

export default function Home() {


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
          
          {/* Card 1: Calculadora */}
          <div className={styles.calcCard}>
            <h2 className={styles.cardTitle}>🔥 Taxa Metabólica Basal</h2>
            {/* Aqui os inputs vão virar 2x2 no PC */}
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <label>Peso Atual (kg)</label>
                <input type="number" step="0.1" min="0" placeholder='78.5' />
              </div>
              <div className={styles.inputWrapper}>
                <label>Altura (cm)</label>
                <input type="number" step="0.1" min="0" placeholder='175'/>
              </div>
              <div className={styles.inputWrapper}>
                <label>Idade</label>
                <input type="number" min="0" placeholder='28' />
              </div>
              <div className={styles.inputWrapper}>
                <label>Nível de Atividade</label>
                <select >
                  <option value="sedentario">Sedentário</option>
                  <option value="leve">Leve (1-3x/semana)</option>
                  <option selected value="moderado">Moderado (3-5x/semana)</option>
                  <option value="intenso">Intenso (6-7x/semana)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 2: Resultados */}
          <div className={styles.resultCard}>
            <h3 className={styles.resultTitle}>📊 Análise Calculada</h3>
            {/* Aqui os resultados ficam lado a lado no PC */}
            <div className={styles.resultRowGroup}>
              <div className={styles.resultBox}>
                <span className={styles.resultLabel}>TMB (Taxa Metabólica Basal)</span>
                <span className={styles.resultValue}>1,845 kcal</span>
              </div>
              <div className={styles.resultBox}>
                <span className={styles.resultLabel}>Gasto Energético Total</span>
                <span className={styles.resultValue}>2,490 kcal</span>
              </div>
            </div>
          </div>

          {/* Card 3: Nível */}
          <div className={styles.levelCard}>
            <div className={styles.levelHeader}>
              <div className={styles.levelIcon}>⭐</div>
              <div className={styles.levelTextContainer}>
                <h3 className={styles.levelSubtitle}>Nível de Experiência Detectado</h3>
                <h2 className={styles.levelTitle}>Intermediário</h2>
                <p className={styles.levelDesc}>
                  Com base no seu perfil, o sistema identificou que você está no nível intermediário. 
                  Isso significa que você tem experiência com treinos regulares e pode realizar exercícios mais complexos.
                </p>
              </div>
              
              <div className={styles.levelTabs}>
                <div className={styles.tabInactive}>Iniciante</div>
                <div className={styles.tabActive}>Intermediário</div>
                <div className={styles.tabInactive}>Avançado</div>
              </div>
            </div>
          </div>

          {/* Botão Final */}
          <Link to ="/" className={styles.actionBtn}>
            <span>🎯</span> Salvar
          </Link>

        </div>
      </div>
    </div>
  );
}