import React from "react";
import styles from '../treino.module.css';
import { useSelector } from "react-redux";
import ExerciseCard from "./exercise-card";

export default function TreinoCard({ rotina, idPlano }) {
  const registrosUsuario = useSelector(state => state.progressoReducer.registrosUsuario);
  const loading = useSelector(state => state.progressoReducer.loading);

  const dataAtual = new Date().toISOString().split('T')[0];

  if (!rotina || !rotina.exercicios) return null;

  const exerciciosAgrupados = rotina.exercicios.reduce((acc, ex) => {
    const grupo = ex.grupo || "Outros";
    if (!acc[grupo]) acc[grupo] = [];

    const registroHoje = registrosUsuario?.find(r =>
      String(r.exercicioId) === String(ex.id) && 
      r.data === dataAtual && 
      (r.dia === rotina.dia) && 
      (r.idPlano === idPlano)
    );

    const seriesRealizadas = registroHoje?.seriesRealizadas || [];

    const seriesComCarga = seriesRealizadas.filter(s => s.carga && !isNaN(parseFloat(s.carga)));
    const cargaExibicao = seriesComCarga.length > 0
      ? (seriesComCarga.reduce((sum, s) => sum + parseFloat(s.carga), 0) / seriesComCarga.length).toFixed(1).replace(/\.0$/, '')
      : "";

    const exercicioConsolidado = {
      ...ex,
      cargaRealizada: cargaExibicao,
      concluido: registroHoje?.concluido || (seriesRealizadas.length > 0 && seriesRealizadas.every(s => s.concluida))
    };

    acc[grupo].push(exercicioConsolidado);
    return acc;
  }, {});

  const gruposMusculares = Object.keys(exerciciosAgrupados);

  if (loading) {
    return <div className="text-center p-4 text-muted">Carregando seus exercícios...</div>;
  }

  return (
    <div className={styles.treino}>
      {gruposMusculares.map((grupo) => (
        <div key={grupo} className={styles['grupo-muscular']}>
          <h3 className={styles.tituloGrupo}>{grupo}</h3>

          <div className={styles.listaCards}>
            {exerciciosAgrupados[grupo].map((ex) => (
              <ExerciseCard
                key={ex.id}
                id={ex.id}
                nome={ex.nome}
                series={ex.seriesPadrao || ex.series}
                reps={ex.repsPadrao || ex.reps}
                cargaRealizada={ex.cargaRealizada}
                concluido={ex.concluido}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}