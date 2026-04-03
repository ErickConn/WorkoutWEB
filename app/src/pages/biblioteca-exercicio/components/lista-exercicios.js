import CardExercicio from "./card-exercicio";
import styles from "../biblioteca.module.css";

export default function ListaExercicios({ titulo, dados }) {
  if (!dados || dados.length === 0) return null;

  return (
    <div className={styles.containerLista}>
      <h3 className={styles.sessaoTitle}>{titulo}</h3>
      {dados.map((exercicio) => (
        <CardExercicio 
          key={exercicio.id} 
          {...exercicio} 
        />
      ))}
    </div>
  );
}