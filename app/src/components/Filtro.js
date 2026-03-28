import React from "react";
import styles from './filtro.module.css';

export default function Filtro({ tipo, filtros, ativo, onSelect }) {
  return (
    <section className={styles.filtro}>
      <h3>{tipo}</h3>
      <div className={styles.filtros}>
        {filtros.map((f) => (
          <div
            key={f}
            // Verifica se o filtro atual é o que está ativo
            className={`${styles.tipo} ${ativo === f ? styles.selecionado : ""}`}
            onClick={() => onSelect(f)}
          >
            {f}
          </div>
        ))}
      </div>
    </section>
  );
}