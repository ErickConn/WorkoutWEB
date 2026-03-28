import React from "react";
import styles from '../exercicio.module.css';

export default function RegistroCard({ numSeries, carga }) {
  return (
    <section className={styles.whiteCard}>
      <h2 className={styles.sectionTitle}>⚡ Registro de Hoje</h2>
      
      <div className={styles.registrationList}>
        {Array.from({ length: numSeries }).map((a, index) => (
          <div key={index} className={`${styles.regBox} ${index === 0 ? styles.active : ''}`}>
            <div className={styles.regHeader}>
              <span className={styles.regNumber}>{index + 1}</span>
              <span className={styles.regTitle}>Série #{index + 1}</span>
            </div>
            
            <div className={styles.inputGroup}>
              <div className={styles.inputField}>
                <label>Peso (kg)</label>
                <input type="number" placeholder={carga?.replace('kg', '')} />
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
  );
}