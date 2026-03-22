import React from "react"
import './treino.css';
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Treino(){
    return(
        <main>
        <div className="card-treino">
            <p><strong>Treino Sugerido </strong><span className="treino-atual-num">2/5</span> </p>
            <span className="treino-atual">Treino A - Peito e Tríceps</span>
            <div className="progress-bar">
                <div className="progress"></div>
            </div>
        </div>
        <div className="treino-livre">
            <Link to="/treino-livre"><strong>🌟 Iniciar Treino Livre</strong></Link>
        </div>
        <div id="treino">
        <div className="grupo-muscular">
            <h3>Peito</h3>
            <div className="box-exercicio">
                <label className="container">
                    <input type="checkbox" className="check"/>
                    <span className="checkmark"></span>
                </label>
                <span className="nome-exercicio">Supino Reto</span>
                <p><span className="num-series">4x </span>
                <span className="num-repeticoes">8-10</span> . <span className="carga">60kg</span></p>
                <span className="edit">></span>
            </div>
        </div>
        <div className="grupo-muscular">
            <h3>Tríceps</h3>
            <div className="box-exercicio">
                <label className="container">
                    <input type="checkbox" className="check"/>
                    <span className="checkmark"></span>
                </label>                
                <span className="nome-exercicio">Tríceps Corda</span>
                <p><span className="num-series">4x </span><span className="num-repeticoes">8-10</span> . <span className="carga">60kg</span></p>
                <span className="edit">></span>
            </div>
        </div>
    </div>
    </main>
    )
}