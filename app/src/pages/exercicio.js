import React from "react";
import './exercicio.css'

export default function Exercicio(){
    return(
        <>
        <header class="app-header">
        <div>
            <div class="title">
                <a class="arrow" href="./treino.html">⬅️</a>
                <h2>Supino Reto</h2>
            </div>
            <p class="subtitle"><a class="num-series">3x </a><a> 12-15 </a>reps</p>
            <div class="line"></div>
        </div>
    </header>
         <main>
        <div class="registro">
            <div class="desempenho">
                <h3>⚡Registro de Desempenho</h3>
                <div class="carga">
                    <p class="carga-ant">CARGA ANTERIOR</p>
                    <p class="peso"><strong>20</strong> kg</p>
                </div>
                <div class="carga-hoje">
                    <label>Carga de Hoje</label>
                    <div class="input-container">
                        <input type="number" min="0" step="0.01" placeholder="22"/>
                        <a>kg</a>
                    </div>
                </div>
            </div>
                <div class="progresso">
                    <p><strong>+2.0kg de progresso! 🟢</strong></p>
                </div>
            </div>
        <div class="dica">
            <a>🚨</a>
            <p class="title"><strong>💡 Dica de Execução</strong></p>
            <p>Mantenha uma leve flexão nos cotovelos durante todo o movimento. Desça
                os halteres até sentir um bom alongamento no peito e contraia com força na subida.
                Mantenha os ombros estabilizados no banco.
            </p>
        </div>
        <div class="series-container">
            <h3 class="title">📝 Séries Realizadas</h3>
            <div class="series">
                <p>
                    <a>Série #1</a>
                    <a class="detalhes">12 reps x 22kg</a>
                </p>
                 <p>
                    <a>Série #2</a>
                    <a class="detalhes">12 reps x 22kg</a>
                </p>
                 <p>
                    <a>Série #3</a>
                    <a class="detalhes">12 reps x 22kg</a>
                </p>
            </div>
        </div>
        <div class="substitutos-container">
            <div class="substitutos-title">
                <a class="substituir">🔄️</a>
                <div>
                    <p class="title">Exercícios Substitutos</p>
                    <p class="subtitle">Alternativas para o mesmo grupo muscular:</p>
                </div>
            </div>
            <div class="exercicios-substitutos">
                <div class="exercicio-substituto">
                    <p class="exercicio">Supino com Halteres</p>
                    <p>Grupo: <a>Peito</a> . Equipamento: <a>Halteres</a></p>
                </div>
                <div class="exercicio-substituto">
                    <p class="exercicio">Supino com Halteres</p>
                    <p>Grupo: <a>Peito</a> . Equipamento: <a>Halteres</a></p>
                </div>
                <div class="exercicio-substituto">
                    <p class="exercicio">Supino com Halteres</p>
                    <p>Grupo: <a>Peito</a> . Equipamento: <a>Halteres</a></p>
                </div>
            </div>
        </div>
    </main>
        </>
    )
}