import React from "react"

const ctx = document.getElementById('mainChart');
let chart; // variável para guardar o gráfico atual

// Dados de relatorio 
const cargaInicial = 4500; // Carga total da primeira insersao do usuario
const cargaAtual = 6000; // Carga total da ultima insersao do usuario
const pesoInicial = 83.9; // Peso da primeira insersao do usuario
const pesoAtual = 81.2; // Peso da ultima insersao do usuario
const semanas = 7; // Numero de semanas entre a primeira e a ultima insersao

// Dados dos gráficos
const dadosForca = {
  type: 'bar',
  data: {
    labels: ['06/jan','11/jan','20/jan','27/jan','04/fev','10/fev','17/fev'],
    datasets: [{
      label: 'Carga Total (kg) por Semana',
      data: [4500, 4800, 5100, 5300, 5500, 5800, 6000],
      backgroundColor: '#ffcc00'
    }]
  },
  options: {
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return (value / 1000) + 'k';
          }
        }
      },
    }
  }
};

const dadosPeso = {
  type: 'line',
  data: {
    labels: ['06/jan','11/jan','20/jan','27/jan','04/fev','10/fev','17/fev'],
    datasets: [{
      label: 'Peso (kg)',
      data: [83.9, 83.5, 83, 82.9, 82.1, 81.6, 81.2],
      borderColor: '#3399ff',
      backgroundColor: '#0b7ef1',
      fill: false
    }]
  }
};

// Funções da tela de progresso

// 1. Função para renderizar gráfico
function renderChart(config) {
  if (chart) chart.destroy(); // remove gráfico anterior
  // chart = new Chart(ctx, config);
}

// 2. Função para atualizar o relatório de progresso
function atualizarRelatorio() {
  // Lógica para calcular e atualizar os valores do relatório
  const relatorio = document.querySelector(".report ul");
  relatorio.innerHTML = ""; // limpa conteúdo anterior

  //Linha 1 : Força 
  const forcaPercentual = ((cargaAtual - cargaInicial) / cargaInicial * 100).toFixed(1); 
  const liForca = document.createElement('li');
  if (forcaPercentual > 0) {
    liForca.innerHTML = `Força aumentou <strong>${forcaPercentual}%</strong> em ${semanas} semanas.`;
  } else if (forcaPercentual < 0) {
    liForca.innerHTML = `Força diminuiu <strong>${Math.abs(forcaPercentual)}%</strong> em ${semanas} semanas.`;
  } else {
    liForca.innerHTML = `Força permaneceu estável em ${semanas} semanas.`;
  }
  relatorio.appendChild(liForca);

  //Linha 2 : Peso
  const diferencaPeso = (pesoAtual - pesoInicial).toFixed(1);
  const liPeso = document.createElement('li');
  if (diferencaPeso > 0) {
    liPeso.innerHTML = `Ganho de <strong>${diferencaPeso}kg</strong> de peso corporal.`;
  } else if (diferencaPeso < 0) {
    liPeso.innerHTML = `Perda de <strong>${Math.abs(diferencaPeso)}kg</strong> de peso corporal.`;
  } else {
    liPeso.innerHTML = `Peso corporal estável.`;
  }
  relatorio.appendChild(liPeso);

  // Linha 3: Progressão média semanal
  const progressaoMedia = ((cargaAtual - cargaInicial) / semanas).toFixed(1);
  const liProgressao = document.createElement('li');
  liProgressao.innerHTML = `Progressão média <strong>${progressaoMedia}kg/semana</strong>.`;
  relatorio.appendChild(liProgressao);

}

// Inicializa relatório
document.addEventListener('DOMContentLoaded', () => {
  atualizarRelatorio();
});

// Inicializa com gráfico de força
renderChart(dadosForca);

// Botões
document.getElementById('btnForca').addEventListener('click', () => {
  renderChart(dadosForca);
  document.getElementById('btnForca').classList.add('active');
  document.getElementById('btnPeso').classList.remove('active');
});

document.getElementById('btnPeso').addEventListener('click', () => {
  renderChart(dadosPeso);
  document.getElementById('btnPeso').classList.add('active');
  document.getElementById('btnForca').classList.remove('active');
});

