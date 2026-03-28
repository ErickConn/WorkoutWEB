import React from "react";
import styles from '../exercicio.module.css';

export default function SeriesCard({ historico, dica }) {
  return (
    <>
      <section className={`${styles.infoCard} ${styles.blueCard}`}>
        <div className={styles.cardHeader}>
          <span className={styles.icon}>📊</span>
          <h3 className={styles.cardTitle}>Última Execução</h3>
        </div>
        <div className={styles.historyList}>
          {historico.map((h, index) => (
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
        <p className={styles.textLong}>{dica}</p>
      </section>
    </>
  );
}