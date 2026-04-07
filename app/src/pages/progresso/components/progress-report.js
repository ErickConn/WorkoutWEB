import React from "react";
import styles from "../progresso.module.css";
import { calcularRelatorio } from "../utils/calcularRelatorio";

export default function ProgressReport({ dadosUsuario }) {
    const relatorio = calcularRelatorio(dadosUsuario);
    // Se só existe uma semana, não há dados suficientes para comparação
    if (!relatorio.suficiente) {
        return (
        <div className={styles.report}>
            <h3>📊 Relatório de Evolução</h3>
            <p>Ainda não há dados suficientes para gerar comparações. Continue registrando seus treinos para acompanhar sua evolução!</p>
        </div>
        );
    }

    return (
        <div className={styles.report}>
        <h3>📊 Relatório de Evolução</h3>
        <ul>
            <li>Força {relatorio.variacaoForca > 0 ? "aumentou" : "diminuiu"} <strong>{relatorio.variacaoPercForca}%</strong> em {relatorio.semanas} semanas.</li>
            <li>{relatorio.variacaoPeso > 0 ? "Ganho" : "Perda"} de <strong>{Math.abs(relatorio.variacaoPeso)}kg</strong> de peso corporal.</li>
            <li>Progressão média de <strong>{relatorio.mediaProgresso}kg/semana</strong>.</li>
            <li>Consistência de treino: <strong>{relatorio.consistenciaMedia}%</strong></li>
        </ul>
        </div>
    );
}
