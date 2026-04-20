import CardExercicio from "./card-exercicio";
import styles from "../biblioteca.module.css";

export default function ListaExercicios({ titulo, dados, onAdd, onEdit, onDelete  }) {
  if (!dados || dados.length === 0) return null;

  return (
    <div className={styles.listaBiblioteca}>
      <h3 className={styles.sectionTitle}>{titulo}</h3>
      {dados.map((item) => (
        <CardExercicio 
          key={item.id} 
          exercicio={item} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}