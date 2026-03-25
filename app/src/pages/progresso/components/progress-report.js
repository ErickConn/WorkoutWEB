import React from "react";
import styles from "../progresso.module.css";

export default function ProgressReport({ cargaInicial, cargaAtual, pesoInicial, pesoAtual, semanas }) {
    // Se só existe uma semana, não há dados suficientes para comparação
    if (semanas <= 1) {
        return (
        <div className={styles.report}>
            <h3>📊 Relatório de Evolução</h3>
            <p>Ainda não há dados suficientes para gerar comparações. Continue registrando seus treinos para acompanhar sua evolução!</p>
        </div>
        );
    }

    const variacaoForca = (cargaAtual - cargaInicial).toFixed(1);
    const variacaoPercForca = (variacaoForca / cargaInicial * 100).toFixed(1);
    const variacaoPeso = (pesoAtual - pesoInicial).toFixed(1);
    const mediaProgresso = ((cargaAtual - cargaInicial) / semanas).toFixed(1);

    return (
        <div className={styles.report}>
        <h3>📊 Relatório de Evolução</h3>
        <ul>
            <li>Força {variacaoForca > 0 ? "aumentou" : "diminuiu"} {variacaoPercForca}% em {semanas} semanas.</li>
            <li>{variacaoPeso > 0 ? "Ganho" : "Perda"} de {Math.abs(variacaoPeso)}kg de peso corporal.</li>
            <li>Progressão média de {mediaProgresso}kg/semana.</li>
        </ul>
        </div>
    );
}
