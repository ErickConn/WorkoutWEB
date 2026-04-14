import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from '../exercicio.module.css';
import { salvarRegistroExercicio } from "../../../redux/progresso/actions";

export default function RegistroCard({ exercicioOriginal, isLoading }) {
  const dispatch = useDispatch();

  // Garante que não vai quebrar se exercicioOriginal vier undefined nos primeiros milissegundos
  const numSeries = exercicioOriginal?.seriesPadrao || exercicioOriginal?.series || 3;
  
  // Iniciamos com um array vazio, o useEffect vai preenchê-lo
  const [series, setSeries] = useState([]);

  // A MÁGICA DA SINCRONIZAÇÃO: Escuta as mudanças do Redux
  useEffect(() => {
    if (isLoading) return; // Aguarda o fetch terminar

    if (exercicioOriginal?.seriesRealizadas?.length > 0) {
      // Se já existem séries salvas hoje, preenchemos o estado com elas
      setSeries(exercicioOriginal.seriesRealizadas);
    } else {
      // Se for um treino novo, criamos as séries em branco
      setSeries(
        Array.from({ length: numSeries }, () => ({
          carga: "",
          reps: "",
          salva: false,
          concluida: false
        }))
      );
    }
  }, [exercicioOriginal, numSeries, isLoading]);

  const handleSerieChange = (index, field, value) => {
    const novasSeries = [...series];
    novasSeries[index] = { ...novasSeries[index], [field]: value };
    setSeries(novasSeries);
  };

  const handleSalvarSerie = (index) => {
    const serieAtual = series[index];
    if (!serieAtual.carga || !serieAtual.reps) {
      alert("Preencha carga e repetições antes de salvar.");
      return;
    }

    const novasSeries = [...series];
    novasSeries[index] = { ...serieAtual, salva: true };
    setSeries(novasSeries);

    dispatch(salvarRegistroExercicio(exercicioOriginal.id, novasSeries));
  };

  const handleConcluirSerie = (index) => {
    const serieAtual = series[index];
    if (!serieAtual.salva) {
      alert("Salve a série antes de concluí-la.");
      return;
    }

    const novasSeries = [...series];
    novasSeries[index] = { ...serieAtual, concluida: true };
    setSeries(novasSeries);

    dispatch(salvarRegistroExercicio(exercicioOriginal.id, novasSeries));
  };

  const todasSeriesConcluidas = series.length > 0 && series.every(s => s.concluida);

  // Proteção de tela de carregamento para evitar bugs visuais
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
        <div key={index} className={`${styles.serieContainer} ${serie.concluida ? styles.serieConcluida : serie.salva ? styles.serieSalva : ''}`}>
          <div className={styles.serieHeader}>
            <h4 className={styles.serieTitle}>Série {index + 1}</h4>
            {serie.concluida && <span className={styles.checkIcon}>✓</span>}
            {serie.salva && !serie.concluida && <span className={styles.saveIcon}>💾</span>}
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputField}>
              <label>Peso (kg)</label>
              <input 
                type="number" 
                value={serie.carga} 
                onChange={e => handleSerieChange(index, 'carga', e.target.value)} 
                disabled={serie.salva || serie.concluida}
              />
            </div>
            <div className={styles.inputField}>
              <label>Reps Realizadas</label>
              <input 
                type="number" 
                value={serie.reps} 
                onChange={e => handleSerieChange(index, 'reps', e.target.value)} 
                disabled={serie.salva || serie.concluida}
              />
            </div>
          </div>
          {!serie.salva && (
            <button 
              className={styles.salvarSerieBtn} 
              onClick={() => handleSalvarSerie(index)}
            >
              Salvar Série
            </button>
          )}
          {serie.salva && !serie.concluida && (
            <button 
              className={styles.concluirSerieBtn} 
              onClick={() => handleConcluirSerie(index)}
            >
              Concluir Série
            </button>
          )}
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