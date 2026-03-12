const ctx = document.getElementById('mainChart');
let chart; // variável para guardar o gráfico atual

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

// Função para renderizar gráfico
function renderChart(config) {
  if (chart) chart.destroy(); // remove gráfico anterior
  chart = new Chart(ctx, config);
}

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

