import React from "react"
import './treino.css';
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Treino(){
    return(
        <main>
        <div class="card-treino">
            <p><strong>Treino Sugerido </strong><span class="treino-atual-num">2/5</span> </p>
            <span class="treino-atual">Treino A - Peito e Tríceps</span>
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
        </div>
        <div class="treino-livre">
            <Link to="/treino-livre"><strong>🌟 Iniciar Treino Livre</strong></Link>
        </div>
        <div id="treino">
        <div class="grupo-muscular">
            <h3>Peito</h3>
            <div class="box-exercicio">
                <label class="container">
                    <input type="checkbox" class="check"/>
                    <span class="checkmark"></span>
                </label>
                <span class="nome-exercicio">Supino Reto</span>
                <p><span class="num-series">4x </span>
                <span class="num-repeticoes">8-10</span> . <span class="carga">60kg</span></p>
                <span class="edit">></span>
            </div>
        </div>
        <div class="grupo-muscular">
            <h3>Tríceps</h3>
            <div class="box-exercicio">
                <label class="container">
                    <input type="checkbox" class="check"/>
                    <span class="checkmark"></span>
                </label>                
                <span class="nome-exercicio">Tríceps Corda</span>
                <p><span class="num-series">4x </span><span class="num-repeticoes">8-10</span> . <span class="carga">60kg</span></p>
                <span class="edit">></span>
            </div>
        </div>
    </div>
    </main>
    )
}