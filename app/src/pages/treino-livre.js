import React from "react";
import './treino-livre.css';
import { Link } from "react-router-dom";

export default function TreinoLivre(){
    return(
        <>
            <main>
        <div className="buscar">
            <a className="lupa">🔍</a>
            <input type="text" placeholder="Buscar exercícios..."/>
        </div>
        <div className="filtro">
            <h3>FILTRAR POR GRUPO MUSCULAR</h3>
            <div className="filtros">
                <div className="selecionado tipo">
                    <a>Todos</a>
                </div>
                <div className="tipo">
                    <a>Peito</a>
                </div>
                <div className="tipo">
                    <a>Costas</a>
                </div>
                <div className="tipo">
                    <a>Pernas</a>
                </div>
                <div className="tipo">
                    <a>Ombros</a>
                </div>
                <div className="tipo">
                    <a>Bíceps</a>
                </div>
                <div className="tipo">
                    <a>Tríceps</a>
                </div>
            </div>
        </div>
        <div className="selecionados">
            <a className="title">🗓️ Exercícios Selecionados</a>
            <a className="quantidade">3 exercícios</a>
            <div className="exercicios-selecionados">
                <div className="exercicio">
                    <p className="titulo">Supino Reto</p>
                    <a>Peito . 4x 8-10</a>
                    <a className="x">❌</a>
                </div>
                <div className="exercicio">
                    <p className="titulo">Remada Curvada</p>
                    <a>Costas . 4x 8-10</a>
                    <a className="x">❌</a>
                </div>
                <div className="exercicio">
                    <p className="titulo">Agachamento Livre</p>
                    <a>Pernas . 4x 8-10</a>
                    <a className="x">❌</a>
                </div>
            </div>
        </div>
        <div className="exercicios">
            <h3>BIBLIOTECA DE EXERCÍCIOS</h3>
            <div className="card-exercicio">
                <a className="adicionar">➕</a>
                <div className="descricao">
                    <a>Crucifixo com Halteres</a>
                    <p>Peito . Halteres</p>
                </div>
                <a className="arrow">></a>
            </div>
           <div className="card-exercicio">
                <a className="adicionar">➕</a>
                <div className="descricao">
                    <a>Crucifixo com Halteres</a>
                    <p>Peito . Halteres</p>
                </div>
                <a className="arrow">></a>
            </div>
            <div className="card-exercicio">
                <a className="adicionar">➕</a>
                <div className="descricao">
                    <a>Crucifixo com Halteres</a>
                    <p>Peito . Halteres</p>
                </div>
                <a className="arrow">></a>
            </div>
           <div className="card-exercicio">
                <a className="adicionar">➕</a>
                <div className="descricao">
                    <a>Crucifixo com Halteres</a>
                    <p>Peito . Halteres</p>
                </div>
                <a className="arrow">></a>
            </div>
            <div className="card-exercicio">
                <a className="adicionar">➕</a>
                <div className="descricao">
                    <a>Crucifixo com Halteres</a>
                    <p>Peito . Halteres</p>
                </div>
                <a className="arrow">></a>
            </div>
        </div>
        <div className="iniciar">
            <Link to="/treino">▶️ Iniciar Treino (3 exercícios)</Link>
        </div>
    </main>
        </>
    )
}