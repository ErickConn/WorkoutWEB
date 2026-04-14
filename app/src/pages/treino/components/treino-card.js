import React from "react";
import styles from '../treino.module.css';
import { useSelector } from "react-redux";
import ExerciseCard from "./exercise-card";

export default function TreinoCard({ rotina }) {
  const registrosUsuario = useSelector(state => state.progressoReducer.registrosUsuario);
  const loading = useSelector(state => state.progressoReducer.loading);
  
  const dataAtual = new Date().toISOString().split('T')[0];

  if (!rotina || !rotina.exercicios) return null;

  const exerciciosAgrupados = rotina.exercicios.reduce((acc, ex) => {
    const grupo = ex.grupo || "Outros";
    if (!acc[grupo]) acc[grupo] = [];

    // Busca o registro de progresso de hoje para este exercício
    const registroHoje = registrosUsuario?.find(r =>
      String(r.exercicioId) === String(ex.id) && r.data === dataAtual
    );

    const seriesRealizadas = registroHoje?.seriesRealizadas || [];
    
    // Pega a carga da última série preenchida hoje para exibir na lista
    const ultimaSerieComCarga = [...seriesRealizadas].reverse().find(s => s.carga);
    const cargaExibicao = ultimaSerieComCarga ? ultimaSerieComCarga.carga : "";

    // Consolida o status de conclusão e a carga
    const exercicioConsolidado = {
      ...ex,
      cargaRealizada: cargaExibicao,
      concluido: ex.concluido || (seriesRealizadas.length > 0 && seriesRealizadas.every(s => s.concluida))
    };

    acc[grupo].push(exercicioConsolidado);
    return acc;
  }, {});

  const gruposMusculares = Object.keys(exerciciosAgrupados);

  // Opcional: Mostra um estado de loading para os cards não renderizarem vazios
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
                // Garante que pega a informação independente de como está salva no seu JSON (seriesPadrao ou series)
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