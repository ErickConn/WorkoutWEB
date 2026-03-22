import React from "react";
import "./progresso.css";

export default function Progresso() {
  return (
    <>
    <header className="app-header">
        <h2>DashBoard de Progresso</h2>
    </header> 
    <main> 
        <div className="dashboard">
            <div className="cards">
                <div className="card">
                    <div className="emoji">🏋️</div>
                    <h2><strong> 6000 </strong></h2>
                    <p>Carga Total (Kg)</p>
                    <div className="status-ganho"> +1500 kg</div>
                </div>
                <div className="card">
                    <div className="emoji">⚖️</div>
                    <h2><strong> 81,2 </strong></h2>
                    <p>Peso Atual (Kg)</p>
                    <div className="status-perda">-2,7 kg</div>
                </div>
                <div className="card">
                    <div className="emoji">📅</div>
                    <h2><strong> 7 semanas</strong></h2>
                    <p>de acompanhamento</p>
                </div>
            </div>
            <div className="chart-buttons">
                <button id="btnForca" className="active">Evolução da Força</button>
                <button id="btnPeso">Evolução do Peso</button>
            </div>
            <div className="chart-area">
                <canvas id="mainChart"></canvas>
            </div>
            <div className="report">
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