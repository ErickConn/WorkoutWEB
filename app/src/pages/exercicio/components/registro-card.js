import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from '../exercicio.module.css';
import { salvarRegistroExercicio } from "../../../redux/progresso/actions";

export default function RegistroCard({ exercicioOriginal, isLoading }) {
  const dispatch = useDispatch();

  const numSeries = exercicioOriginal?.seriesPadrao || exercicioOriginal?.series || 3;

  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (isLoading) return;

    if (exercicioOriginal?.seriesRealizadas?.length > 0) {
      setSeries(exercicioOriginal.seriesRealizadas);
    } else {
      setSeries(
        Array.from({ length: numSeries }, () => ({
          carga: "",
          reps: "",
          concluida: false
        }))
      );
    }
  }, [exercicioOriginal, numSeries, isLoading]);

  const handleSerieChange = (index, field, value) => {
    const novasSeries = [...series];
    novasSeries[index] = { ...novasSeries[index], [field]: value, concluida: false };
    setSeries(novasSeries);
  };

  const handleConcluirSerie = (index) => {
    const serieAtual = series[index];
    if (!serieAtual.carga || !serieAtual.reps) {
      alert("Preencha carga e repetições.");
      return;
    }

    const novasSeries = [...series];
    novasSeries[index] = { ...serieAtual, concluida: true };
    setSeries(novasSeries);

    dispatch(salvarRegistroExercicio(exercicioOriginal.id, novasSeries));
  };

  const todasSeriesConcluidas = series.length > 0 && series.every(s => s.concluida);

  if (isLoading || !exercicioOriginal) {
    return (
      <section className={styles.whiteCard}>
        <p className={styles.loadingText} style={{ textAlign: "center", padding: "20px", color: "#666" }}>
          Carregando dados do exercício...
        </p>
      </section>
    );
  }

  return (
    <section className={styles.whiteCard}>
      <h2 className={styles.sectionTitle}>⚡ Registro de Hoje</h2>
      {series.map((serie, index) => (
        <div key={index} className={`${styles.serieContainer} ${serie.concluida ? styles.serieConcluida : ''}`}>
          <div className={styles.serieHeader}>
            <h4 className={styles.serieTitle}>Série {index + 1}</h4>
            {serie.concluida && <span className={styles.checkIcon}>✓</span>}
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputField}>
              <label>Peso (kg)</label>
              <input
                type="number"
                value={serie.carga}
                onChange={e => handleSerieChange(index, 'carga', e.target.value)}
              />
            </div>
            <div className={styles.inputField}>
              <label>Reps Realizadas</label>
              <input
                type="number"
                value={serie.reps}
                onChange={e => handleSerieChange(index, 'reps', e.target.value)}
              />
            </div>
          </div>
          <button
            className={serie.concluida ? styles.salvarSerieBtn : styles.concluirSerieBtn}
            onClick={() => handleConcluirSerie(index)}
          >
            {serie.concluida ? 'Atualizar Série' : 'Concluir Série'}
          </button>
        </div>
      ))}
      {todasSeriesConcluidas && (
        <div className={styles.exercicioConcluido}>
          <p>🎉 Exercício concluído!</p>
        </div>
      )}
    </section>
  );
}