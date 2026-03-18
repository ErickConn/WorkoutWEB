import React from "react";
import './treino-livre.css';
import { Link } from "react-router-dom";

export default function TreinoLivre(){
    return(
        <>
            <main>
        <div class="buscar">
            <a class="lupa">🔍</a>
            <input type="text" placeholder="Buscar exercícios..."/>
        </div>
        <div class="filtro">
            <h3>FILTRAR POR GRUPO MUSCULAR</h3>
            <div class="filtros">
                <div class="selecionado tipo">
                    <a>Todos</a>
                </div>
                <div class="tipo">
                    <a>Peito</a>
                </div>
                <div class="tipo">
                    <a>Costas</a>
                </div>
                <div class="tipo">
                    <a>Pernas</a>
                </div>
                <div class="tipo">
                    <a>Ombros</a>
                </div>
                <div class="tipo">
                    <a>Bíceps</a>
                </div>
                <div class="tipo">
                    <a>Tríceps</a>
                </div>
            </div>
        </div>
        <div class="selecionados">
            <a class="title">🗓️ Exercícios Selecionados</a>
            <a class="quantidade">3 exercícios</a>
            <div class="exercicios-selecionados">
                <div class="exercicio">
                    <p class="titulo">Supino Reto</p>
                    <a>Peito . 4x 8-10</a>
                    <a class="x">❌</a>
                </div>
                <div class="exercicio">
                    <p class="titulo">Remada Curvada</p>
                    <a>Costas . 4x 8-10</a>
                    <a class="x">❌</a>
                </div>
                <div class="exercicio">
                    <p class="titulo">Agachamento Livre</p>
                    <a>Pernas . 4x 8-10</a>
                    <a class="x">❌</a>
                </div>
            </div>
        </div>
        <div class="exercicios">
            <h3>BIBLIOTECA DE EXERCÍCIOS</h3>
            <div class="card-exercicio">
                <a class="adicionar">➕</a>
                <div class="descricao">
                    <a>Crucifixo com Halteres</a>
                    <p>Peito . Halteres</p>
                </div>
                <a class="arrow">></a>
            </div>
           <div class="card-exercicio">
                <a class="adicionar">➕</a>
                <div class="descricao">
                    <a>Crucifixo com Halteres</a>
                    <p>Peito . Halteres</p>
                </div>
                <a class="arrow">></a>
            </div>
            <div class="card-exercicio">
                <a class="adicionar">➕</a>
                <div class="descricao">
                    <a>Crucifixo com Halteres</a>
                    <p>Peito . Halteres</p>
                </div>
                <a class="arrow">></a>
            </div>
           <div class="card-exercicio">
                <a class="adicionar">➕</a>
                <div class="descricao">
                    <a>Crucifixo com Halteres</a>
                    <p>Peito . Halteres</p>
                </div>
                <a class="arrow">></a>
            </div>
            <div class="card-exercicio">
                <a class="adicionar">➕</a>
                <div class="descricao">
                    <a>Crucifixo com Halteres</a>
                    <p>Peito . Halteres</p>
                </div>
                <a class="arrow">></a>
            </div>
        </div>
        <div class="iniciar">
            <Link to="/treino">▶️ Iniciar Treino (3 exercícios)</Link>
        </div>
    </main>
        </>
    )
}