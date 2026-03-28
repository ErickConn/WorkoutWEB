import React from "react";
import styles from '../exercicio.module.css';

export default function SubstitutosCard({ substitutos }) {
  return (
    <section className={`${styles.infoCard} ${styles.orangeCard}`}>
      <div className={styles.cardHeader}>
        <span className={styles.icon}>🔄</span>
        <h3 className={styles.cardTitle}>Exercícios Substitutos</h3>
      </div>
      <div className={styles.subtleList}>
        {substitutos.map((sub, index) => (
          <div key={index} className={styles.subtleItem}>
            <strong>{sub.nome}</strong>
            <span>Equipamento: {sub.equipamento}</span>
          </div>
        ))}
      </div>
    </section>
  );
}