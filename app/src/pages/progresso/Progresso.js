import React, { useState } from "react";
import styles from "./progresso.module.css";
import ProgressChart from "./components/progress-chart";
import ProgressReport from "./components/progress-report";
import ProgressCard from "./components/progress-card";
import Menu from '../../components/Menu';

export default function Progresso() {
  // Simulação de dados vindos do backend
  const [dadosUsuario, setDadosUsuario] = useState({
    semanas: 7,
    cargas: [4500, 4800, 5100, 5300, 5500, 5800, 6000],
    pesos: [83.9, 83.5, 83, 82.9, 82.1, 81.6, 81.2],
    datas: ['06/jan','11/jan','20/jan','27/jan','04/fev','10/fev','17/fev']
  });
  // este usuário pratica 1x por semana

  const [tipoGrafico, setTipoGrafico] = useState("forca");

  // Peso inicial e atual a partir do array
  const pesoInicial = dadosUsuario.pesos[0];
  const pesoAtual = dadosUsuario.pesos[dadosUsuario.pesos.length - 1];

  // Carga inicial e atual a partir do array
  const cargaInicial = dadosUsuario.cargas[0];
  const cargaAtual = dadosUsuario.cargas[dadosUsuario.cargas.length-1];
  
  // Função para adicionar nova entrada
  function adicionarEntrada(novaCarga, novoPeso, novaData) {
    setDadosUsuario(prev => ({
      semanas: prev.semanas + 1,
      cargas: [...prev.cargas, novaCarga],
      pesos: [...prev.pesos, novoPeso],
      datas: [...prev.datas, novaData],
    }));
  }

  // Relatório
  const variacaoForca = (cargaAtual - cargaInicial).toFixed(1);
  const variacaoPercForca = (variacaoForca / cargaInicial * 100).toFixed(1);
  const variacaoPeso = (pesoAtual - pesoInicial).toFixed(1);
  const mediaProgresso = ((cargaAtual - cargaInicial) / dadosUsuario.semanas).toFixed(1);

  return (
    <>
    <header className={styles['app-header']}>
        <h2>DashBoard de Progresso</h2>
    </header> 
    <main> 
        <div className={styles.dashboard}>
            {/* Cards */}
            <div className={styles.cards}>
                <ProgressCard emoji="🏋️" valor={cargaAtual} titulo="Carga Total (Kg)" variacao={variacaoForca} descricao="kg"></ProgressCard >
                <ProgressCard emoji="⚖️" valor={pesoAtual} titulo="Peso Atual (Kg)" variacao={variacaoPeso} descricao="kg"></ProgressCard >
                <ProgressCard emoji="📅" valor={`${dadosUsuario.semanas} semanas`} titulo="de acompanhamento"></ProgressCard > 
            </div>
            {/* Botões */}
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
            {/* Gráfico */}
            <ProgressChart tipo={tipoGrafico} datas={dadosUsuario.datas} cargas={dadosUsuario.cargas} pesos={dadosUsuario.pesos}></ProgressChart>
            {/* Relatório */}
            <ProgressReport cargaInicial={cargaInicial} cargaAtual={cargaAtual} pesoInicial={pesoInicial} pesoAtual={pesoAtual} semanas={dadosUsuario.semanas}></ProgressReport>
            <div>
              <p> O botão abaixo serve apenas para fins de demonstração e não estará no produto final:</p>
            </div>
            {/* Botão para simular nova entrada */}
            <button onClick={() => adicionarEntrada(6200, 80.9, '25/fev')}>
              ➕ Adicionar nova semana
            </button>
        </div>
        <Menu></Menu>
    </main>
    </>
  )
}