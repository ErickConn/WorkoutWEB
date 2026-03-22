import React from "react";
import "./progresso.css";

export default function Progresso() {
  return (
    <>
    <header class="app-header">
        <h2>DashBoard de Progresso</h2>
    </header> 
    <main> 
        <div class="dashboard">
            <div class="cards">
                <div class="card">
                    <div class="emoji">🏋️</div>
                    <h2><strong> 6000 </strong></h2>
                    <p>Carga Total (Kg)</p>
                    <div class="status-ganho"> +1500 kg</div>
                </div>
                <div class="card">
                    <div class="emoji">⚖️</div>
                    <h2><strong> 81,2 </strong></h2>
                    <p>Peso Atual (Kg)</p>
                    <div class="status-perda">-2,7 kg</div>
                </div>
                <div class="card">
                    <div class="emoji">📅</div>
                    <h2><strong> 7 semanas</strong></h2>
                    <p>de acompanhamento</p>
                </div>
            </div>
            <div class="chart-buttons">
                <button id="btnForca" class="active">Evolução da Força</button>
                <button id="btnPeso">Evolução do Peso</button>
            </div>
            <div class="chart-area">
                <canvas id="mainChart"></canvas>
            </div>
            <div class="report">
                <h3>📊 Relatório de Evolução</h3>
                <ul>
                    <li> Sua porcentagem de aumento/diminuição de força aqui.</li>
                    <li>Ganho/Perda de peso corporal aqui.</li>
                    <li>Progressão média de carga por semana aqui.</li>
                </ul>
            </div>
        </div>
    </main>
    </>
  )
}