import React, { useState } from "react";
//import { Line, Bar } from "react-chartjs-2";
import styles from "./progresso.module.css";

export default function Progresso() {
  // Simulação de dados vindos do backend
  const [dadosUsuario, setDadosUsuario] = useState({
    semanas: 7,
    cargas: [4500, 4800, 5100, 5300, 5500, 5800, 6000],
    pesos: [83.9, 83.5, 83, 82.9, 82.1, 81.6, 81.2],
    datas: ['06/jan','11/jan','20/jan','27/jan','04/fev','10/fev','17/fev']
  });
  // este usuário pratica 1x por semana

  const [tipoGrafico, setTipoGrafico] = useState("forca");

  // Peso inicial e atual a partir do array
  const pesoInicial = dadosUsuario.pesos[0];
  const pesoAtual = dadosUsuario.pesos[dadosUsuario.pesos.length - 1];

  // Carga inicial e atual a partir do array
  const cargaInicial = dadosUsuario.cargas[0];
  const cargaAtual = dadosUsuario.cargas[dadosUsuario.cargas.length-1];

  // Dados do gráfico
  const chartData = {
    //type: tipoGrafico === "forca" ? 'bar' : 'line',
    labels: dadosUsuario.datas,
    datasets: [{
      label: tipoGrafico === "forca" ? "Carga Total (kg)" : "Peso Corporal (kg)",
      data: tipoGrafico === "forca" ? dadosUsuario.cargas : dadosUsuario.pesos,
      borderColor: tipoGrafico === "forca" ? "#ffc100":"#3399ff",
      backgroundColor: tipoGrafico === "forca" ? "rgba(255, 204, 0, 0.82)":"rgba(51, 153, 255, 0.64)",
      fill: true
    }]
  };
  
  // Função para adicionar nova entrada
  function adicionarEntrada(novaCarga, novoPeso, novaData) {
    setDadosUsuario(prev => ({
      semanas: prev.semanas + 1,
      cargas: [...prev.cargas, novaCarga],
      pesos: [...prev.pesos, novoPeso],
      datas: [...prev.datas, novaData],
    }));
  }

  // Relatório
  const variacaoForca = (cargaAtual - cargaInicial).toFixed(1);
  const variacaoPercForca = (variacaoForca / cargaInicial * 100).toFixed(1);
  const variacaoPeso = (pesoAtual - pesoInicial).toFixed(1);
  const mediaProgresso = ((cargaAtual - cargaInicial) / dadosUsuario.semanas).toFixed(1);

  return (
    <>
    <header className={styles['app-header']}>
        <h2>DashBoard de Progresso</h2>
    </header> 
    <main> 
        <div className={styles.dashboard}>
            {/* Cards */}
            <div className={styles.cards}>
                <div className={styles.card}>
                    <div className={styles.emoji}>🏋️</div>
                    <h2><strong> {cargaAtual} </strong></h2>
                    <p>Carga Total (Kg)</p>
                    <div className={variacaoForca < 0 ? styles['status-perda'] : styles['status-ganho']}> {variacaoForca} kg</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.emoji}>⚖️</div>
                    <h2><strong> {pesoAtual} </strong></h2>
                    <p>Peso Atual (Kg)</p>
                    <div className={variacaoPeso < 0 ? styles['status-perda'] : styles['status-ganho']}>{variacaoPeso}</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.emoji}>📅</div>
                    <h2><strong> {dadosUsuario.semanas} semanas</strong></h2>
                    <p>de acompanhamento</p>
                </div>
            </div>
            {/* Botões */}
            <div className={styles['chart-buttons']}>
              <button
                onClick={() => setTipoGrafico("forca")}
                className={tipoGrafico === "forca" ? styles.active : ""}
              >
                Evolução da Força
              </button>
              <button
                onClick={() => setTipoGrafico("peso")}
                className={tipoGrafico === "peso" ? styles.active : ""}
              >
                Evolução do Peso
              </button>
            </div>
            {/* Gráfico */}
            <div className={styles['chart-area']}>
                {/*{tipoGrafico === "forca" ? <Bar data={chartData} /> : <Line data={chartData} />}*/}
                <canvas id="mainChart"></canvas>
            </div>
            {/* Relatório */}
            <div className={styles.report}>
                <h3>📊 Relatório de Evolução</h3>
                <ul>
                    <li> Força {variacaoForca > 0 ? "aumentou" : "diminuiu"} {variacaoPercForca}% em {dadosUsuario.semanas} semanas.</li>
                    <li>{variacaoPeso > 0 ? "Ganho" : "Perda"} de {Math.abs(variacaoPeso)}kg de peso corporal.</li>
                    <li>Progressão média de {mediaProgresso}kg/semana.</li>
                </ul>
            </div>
            <div>
              <p> O botão abaixo serve apenas para fins de demonstração e não estará no produto final:</p>
            </div>
            {/* Botão para simular nova entrada */}
            <button onClick={() => adicionarEntrada(6200, 80.9, '25/fev')}>
              ➕ Adicionar nova semana
            </button>
        </div>
    </main>
    </>
  )
}