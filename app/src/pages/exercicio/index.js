import React from "react";
import styles from './exercicio.module.css';
import { Link, useParams } from "react-router-dom";
import HeaderBack from "../../components/HeaderBack";

export default function Exercicio() {
  const { id } = useParams();

  const exercicios = [
              {
                "id": 0,
                "nome": "Supino Reto",
                "numSeries": 3,
                "numReps": "8-12",
                "carga": "30kg",
                "dica": "Mantenha os pés firmes no chão e escápulas contraídas no banco.",
                "historico": [{ "serie": 1, "valor": "12 reps × 30kg" }],
                "substitutos": [{ "nome": "Supino com Halteres", "equipamento": "Halteres" }]
              },
    ]

  const exercicioAtual = exercicios.find(ex => ex.id === id) || exercicios[0];

  return (
    <div className={styles.container}>
      <HeaderBack title={exercicios[0].nome} subtitle={`${exercicios[0].numSeries} ${exercicios[0].numReps} reps`}></HeaderBack>

      <div className={styles.content}>
        <div className={styles.mainGrid}>
          
          <div className={styles.column}>
            <section className={`${styles.infoCard} ${styles.blueCard}`}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>📊</span>
                <h3 className={styles.cardTitle}>Última Execução</h3>
              </div>
              <div className={styles.historyList}>
                {exercicioAtual.historico.map((h, index) => (
                  <div key={index} className={styles.historyItem}>
                    <span>Série #{h.serie}</span>
                    <strong>{h.valor}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className={`${styles.infoCard} ${styles.purpleCard}`}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>💡</span>
                <h3 className={styles.cardTitle}>Dica Técnica</h3>
              </div>
              <p className={styles.textLong}>{exercicioAtual.dica}</p>
            </section>
          </div>

          <div className={styles.column}>
            <section className={styles.whiteCard}>
              <h2 className={styles.sectionTitle}>⚡ Registro de Hoje</h2>
              
              <div className={styles.registrationList}>
                {Array.from({ length: exercicioAtual.numSeries }).map((_, index) => (
                  <div key={index} className={`${styles.regBox} ${index === 0 ? styles.active : ''}`}>
                    <div className={styles.regHeader}>
                      <span className={styles.regNumber}>{index + 1}</span>
                      <span className={styles.regTitle}>Série #{index + 1}</span>
                    </div>
                    
                    <div className={styles.inputGroup}>
                      <div className={styles.inputField}>
                        <label>Peso (kg)</label>
                        <input type="number" placeholder={exercicioAtual.carga.replace('kg', '')} />
                      </div>
                      <div className={styles.inputField}>
                        <label>Reps Realizadas</label>
                        <input type="number" placeholder="0" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={`${styles.infoCard} ${styles.orangeCard}`}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>🔄</span>
                <h3 className={styles.cardTitle}>Exercícios Substitutos</h3>
              </div>
              <div className={styles.subtleList}>
                {exercicioAtual.substitutos.map((sub, index) => (
                  <div key={index} className={styles.subtleItem}>
                    <strong>{sub.nome}</strong>
                    <span>Equipamento: {sub.equipamento}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContent}>
           <Link to='/treino' className={styles.btnComplete}>Concluir</Link>
          <button className={styles.btnReplace}>Trocar Exercício</button>
        </div>
      </div>
    </div>
  );
}