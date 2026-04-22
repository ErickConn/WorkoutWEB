import styles from '../biblioteca.module.css';
import formatarNomeExercicio from '../utils/formatarNome';

export default function CardExercicio({ exercicio, onEdit, onDelete }) {
  return (
    <div className={styles.itemBiblioteca}>
      <div className={styles.itemInfo}>
        <p className={styles.itemName}>{formatarNomeExercicio(exercicio.nome)}</p>
        <p className={styles.itemMeta}>
          Grupo: {exercicio.grupo} | Equipamento: {exercicio.equipamento} | Nível: {exercicio.nivel_experiencia}
        </p>
      </div>
      <div className={styles.cardActions}>

        {/* Botão de editar */}
        <button 
          className={styles.btnEdit} 
          onClick={() => onEdit(exercicio)}
        >
          ✎
        </button>

        {/* Botão de excluir */}
        <button 
          className={styles.btnDelete} 
          onClick={() => onDelete(exercicio.id)}
        >
          🗑
        </button>
      </div>
    </div>
  );
}