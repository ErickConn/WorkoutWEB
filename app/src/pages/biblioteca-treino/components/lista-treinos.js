import CardTreino from "./card-treino";
import styles from "../index.module.css";

export default function ListaTreinos({ titulo, dados }) {
  if (!dados || dados.length === 0) return null;

  return (
    <div className={styles.containerLista}>
      <h3 className={styles.sessaoTitle}>{titulo}</h3>
      {dados.map((treino) => (
        <CardTreino 
          key={treino.id} 
          {...treino} 
        />
      ))}
    </div>
  );
}