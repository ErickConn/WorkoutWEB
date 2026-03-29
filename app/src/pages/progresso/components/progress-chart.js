import React, { useState } from "react";
import styles from "../progresso.module.css";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export default function ProgressChart({datas, cargas, pesos}) {
  const [tipoGrafico, setTipoGrafico] = useState("forca");
  // Configuração do gráfico
  const dadosForca = {
      labels: datas,
      datasets: [{
          label: 'Carga Total (kg)',
          data: cargas,
          backgroundColor: '#ffcc00'
      }]
  };
  const opcoesForca = {
      scales: {
      y: {
          ticks: {
          callback: function(value) {
              return (value / 1000) + "k"; // exibe 6000 como "6k"
          }
          }
      }
      }
  };

  const dadosPeso = {
      labels: datas,
      datasets: [{
      label: "Peso (kg)",
      data: pesos,
      borderColor: "#3399ff",
      backgroundColor: "#0b7ef1",
      fill: false
      }]
  };

  return (
    <div className={styles['chart-area']}>
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
      {tipoGrafico === "forca" ? (
        <Bar data={dadosForca} options={opcoesForca} />
      ) : (
        <Line data={dadosPeso} />
      )}
    </div>
  );
}