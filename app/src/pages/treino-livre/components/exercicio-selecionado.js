import styles from '../treino-livre.module.css';

export default function ExercicioSelecionado({ exercicio, onRemove }) {
  return (
    <div className={styles.cardSelecionado}>
      <div className={styles.info}>
        <p className={styles.nomeEx}>{exercicio.nome}</p>
        <p className={styles.detalheEx}>{exercicio.grupo} • {exercicio.detalhes}</p>
        {exercicio.series && exercicio.repeticoes && (
          <p className={styles.detalheEx} style={{ marginTop: '5px', fontSize: '0.85em', color: '#666' }}>
            {exercicio.series} série(s) × {exercicio.repeticoes} repetição(ões)
          </p>
        )}
      </div>
      <button className={styles.btnRemove} onClick={() => onRemove(exercicio.id)}>×</button>
    </div>
  );
}