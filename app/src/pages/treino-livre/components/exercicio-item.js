import styles from '../treino-livre.module.css';

export default function ExercicioItem({ exercicio, onAdd }) {
  return (
    <div className={styles.itemBiblioteca}>
      <button className={styles.btnAdd} onClick={() => onAdd(exercicio)}>+</button>
      <div className={styles.itemInfo}>
        <h4 className={styles.itemName}>{exercicio.nome}</h4>
        <p className={styles.itemMeta}>{exercicio.grupo} • {exercicio.equipamento}</p>
      </div>
      <span className={styles.itemArrow}>›</span>
    </div>
  );
}