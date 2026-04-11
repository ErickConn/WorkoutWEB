import React, { useState } from 'react';
import styles from '../biblioteca.module.css';

export default function CardExercicio({ exercicio, onAdd }) {
  return (
    <div className={styles.itemBiblioteca}>
      <div className={styles.itemInfo}>
        <p className={styles.itemName}>{exercicio.nome}</p>
        <p className={styles.itemMeta}>
          Grupo: {exercicio.grupo} | Equipamento: {exercicio.equipamento}
        </p>
      </div>
      <button 
        className={styles.btnAdd} 
        onClick={() => onAdd(exercicio)}
      >
        +
      </button>
    </div>
  );
}