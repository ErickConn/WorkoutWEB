import React from "react";
import styles from '../exercicio.module.css';

export default function SubstitutosCard({ substitutos, idSelecionado, onSelecionar }) {
  return (
    <section className={`${styles.infoCard} ${styles.orangeCard}`}>
      <div className={styles.cardHeader}>
        <span className={styles.icon}>🔄</span>
        <h3 className={styles.cardTitle}>Exercícios Substitutos</h3>
      </div>
      <div className={styles.subtleList}>
        {(substitutos || []).map((sub, index) => {
          const isSelected = String(sub.id) === String(idSelecionado);

          return (
            <div 
              key={index} 
              className={`${styles.subtleItem} ${isSelected ? styles.itemSelecionado : ""}`}
              onClick={() => onSelecionar(sub.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.subtleItemContent}>
                <strong>{sub.nome}</strong>
                <span>Equipamento: {sub.equipamento}</span>
              </div>
              {isSelected && <span className={styles.checkSelectIcon}>🟢</span>}
            </div>
          );
        })}
      </div>
    </section>
  );
}