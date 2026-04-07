import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgresso } from "../../redux/progresso/actions";
import styles from "./progresso.module.css";
import ProgressChart from "./components/progress-chart";
import ProgressReport from "./components/progress-report";
import ProgressCard from "./components/progress-card";
import OffCanvasNavBar from "../../components/OffCanvasNavBar";

export default function Progresso() {
  // Simulação de dados vindos do backend =>  este usuário pratica 1x por semana
  /*const [dadosUsuario, setDadosUsuario] = useState({
    semanas: 8,
    cargas: [4800, 5100, 5300, 5500, 5800, 6000, 6250,6500],
    pesos: [78.5, 80.1, 79.6, 78, 77.9, 77.6, 76.2, 75.8],
    datas: ['06/jan','11/jan','20/jan','27/jan','04/fev','10/fev','17/fev','24/fev']
  });*/
  const dispatch = useDispatch();
  const { historico, loading, error } = useSelector(state => state.progressoReducer);

  useEffect(() => {
    dispatch(fetchProgresso());
  }, [dispatch]);


  if (loading) return <p>Carregando dados de progresso...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!historico.length) return <p>Nenhum dado encontrado.</p>;

  // Pegando o usuario exemplo
  const usuario = historico[0];

  // exemplo: pegar peso e carga do histórico
  const pesos = usuario.historico_peso.map(p => p.peso_kg);
  const datas = usuario.historico_peso.map(p => new Date(p.data).toLocaleDateString());
  const cargas = usuario.historico_carga.map(semana =>
    semana.treinos.reduce((total, treino) =>
      total + treino.exercicios.reduce((soma, ex) => soma + ex.carga_kg, 0), 0)
  );

  // Peso inicial e atual a partir do array
  const pesoInicial = pesos[0];
  const pesoAtual = pesos[pesos.length - 1];

  // Carga inicial e atual a partir do array
  const cargaInicial = cargas[0];
  const cargaAtual = cargas[cargas.length-1];

  // Relatório
  const variacaoForca = (cargaAtual - cargaInicial).toFixed(1);
  const variacaoPeso = (pesoAtual - pesoInicial).toFixed(1);

  return (
    <>
    <OffCanvasNavBar></OffCanvasNavBar>
    <main> 
        <div className={styles.dashboard}>
            {/* Cards */}
            <div className={styles.cards}>
                <ProgressCard emoji="🏋️" valor={cargaAtual} titulo="Carga Total (Kg)" variacao={variacaoForca} descricao="kg"></ProgressCard >
                <ProgressCard emoji="⚖️" valor={pesoAtual} titulo="Peso Atual (Kg)" variacao={variacaoPeso} descricao="kg"></ProgressCard >
                <ProgressCard emoji="📅" valor={`${usuario.historico_peso.length} semanas`} titulo="de acompanhamento"></ProgressCard > 
            </div>
            {/* Gráfico */}
            <ProgressChart datas={datas} cargas={cargas} pesos={pesos}></ProgressChart>
            {/* Relatório */}
            <ProgressReport dadosUsuario={usuario}></ProgressReport>
        </div>
    </main>
    </>
  )
}