import React, { useState, useEffect } from "react";
//import axios from "axios";
import styles from "./progresso.module.css";
import ProgressChart from "./components/progress-chart";
import ProgressReport from "./components/progress-report";
import ProgressCard from "./components/progress-card";
import Menu from '../../components/Menu';

export default function Progresso() {
  // Simulação de dados vindos do backend => zerar valores para dps substituir por chamada real
  const [dadosUsuario, setDadosUsuario] = useState({
    semanas: 8,
    cargas: [4800, 5100, 5300, 5500, 5800, 6000, 6250,6500],
    pesos: [78.5, 80.1, 79.6, 78, 77.9, 77.6, 76.2, 75.8],
    datas: ['06/jan','11/jan','20/jan','27/jan','04/fev','10/fev','17/fev','24/fev']
  });
  // este usuário pratica 1x por semana

  /* // Buscar dados do backend
  useEffect(() => {
    axios.get(`/registros/${exercicioId}`).then(res => {
      const registros = res.data;
      setDadosUsuario({
        semanas: registros.length,
        cargas: registros.map(r => r.carga),
        pesos: registros.map(r => r.peso),
        datas: registros.map(r => new Date(r.data).toLocaleDateString())
      });
    });
  }, [exercicioId]);
  */
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
  const variacaoPeso = (pesoAtual - pesoInicial).toFixed(1);

  return (
    <>
    <header className={styles['app-header']}>
        <h2>Champion's Body - DashBoard de Progresso</h2>
    </header>
    <main> 
        <div className={styles.dashboard}>
            {/* Cards */}
            <div className={styles.cards}>
                <ProgressCard emoji="🏋️" valor={cargaAtual} titulo="Carga Total (Kg)" variacao={variacaoForca} descricao="kg"></ProgressCard >
                <ProgressCard emoji="⚖️" valor={pesoAtual} titulo="Peso Atual (Kg)" variacao={variacaoPeso} descricao="kg"></ProgressCard >
                <ProgressCard emoji="📅" valor={`${dadosUsuario.semanas} semanas`} titulo="de acompanhamento"></ProgressCard > 
            </div>
            {/* Gráfico */}
            <ProgressChart datas={dadosUsuario.datas} cargas={dadosUsuario.cargas} pesos={dadosUsuario.pesos}></ProgressChart>
            {/* Relatório */}
            <ProgressReport dadosUsuario={dadosUsuario}></ProgressReport>
        </div>
        <Menu></Menu>
    </main>
    </>
  )
}