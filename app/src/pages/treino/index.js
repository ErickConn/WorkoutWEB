import React, { useEffect } from "react";
import styles from './treino.module.css';
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTreinoList, finalizarTreino } from "../../redux/treino/slices";
// Certifique-se de que essa action envia os dados para o treinoReducer
import { fetchProgresso } from "../../redux/progresso/actions"; 
import OffCanvasNavBar from "../../components/OffCanvasNavBar";
import FooterButton from "../../components/FooterButton";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import TreinoCard from "./components/treino-card";

export default function Treino() {
  const dispatch = useDispatch();
  
  // Puxa os planos do Treino Reducer
  const planos = useSelector(state => state.treinoReducer.planos);
  const loadingTreino = useSelector(state => state.treinoReducer.loading);

  console.log(planos);

  // Puxa o histórico e os registros do Progresso Reducer
  const historico = useSelector(state => state.progressoReducer.historico); 
  const registrosUsuario = useSelector(state => state.progressoReducer.registrosUsuario); 
  const loadingProgresso = useSelector(state => state.progressoReducer.loading);

  // Usamos um loading geral que espera os dois reducers terminarem
  const loading = loadingTreino || loadingProgresso;

  useEffect(() => {
    // Como o array de dependências só tem o 'dispatch', 
    // este bloco roda apenas 1x quando a tela carrega.

    // Agora ele verifica se não existe OU se é um array vazio
    if (!planos || planos.length === 0) {
      dispatch(fetchTreinoList());
    }
    
    // Mesma lógica para o histórico
    if (!historico || historico.length === 0) {
      dispatch(fetchProgresso());
    }
    
  }, [dispatch]);

  const handleFinalizar = async () => {
    try {
      await dispatch(finalizarTreino());
      alert("Parabéns! Treino Concluido!");
    } catch (err) {
      console.error("Erro ao finalizar treino:", err);
      alert("Erro ao finalizar treino. Tente novamente.");
    }
  };

  const planoAtivo = planos?.find(p => p.ativo);
  
  // A tela de loading aguarda a finalização das requisições
  if (loading) {
    return (
      <div className={styles.mainContainer}>
        <OffCanvasNavBar />
        <Spinner className="vh-100" />
      </div>
    );
  }

  // Se não houver planos MESMO APÓS o loading terminar
  if (!planoAtivo) {
    return (
      <>
        <OffCanvasNavBar />
        <div className={styles.noPlanContainer}>
          <p className={styles.noPlanMessage}>Parece que você ainda não selecionou um plano de treino.</p>
          <p className={styles.noPlanSubMessage}>Para acessar a biblioteca de treinos:</p>
          <Button link="/biblioteca-treino" title="Clique Aqui"></Button>
        </div >
      </>
    );
  }

  const rotinaHoje = planoAtivo.rotina
    ? planoAtivo.rotina.find(treino => treino.ativo === true) || planoAtivo.rotina[0]
    : null;

  return (
    <>
      <OffCanvasNavBar />
      <main className={styles.mainContainer}>
        <Link to='/select-treino' className={styles.progressCard}>
          <div className={styles.progressHeader}>
            <div>
              <h2 className={styles.progressTitle}>{planoAtivo.titulo}</h2>
              <p className={styles.progressSubtitle}>Hoje: {rotinaHoje?.foco}</p>
            </div>
            <div className={styles.progressBadge}>
              <span className={styles.badgeText}>{rotinaHoje?.dia}</span>
            </div>
          </div>
          <div className={styles.progressBarBg}>
            <div className={styles.progressBarFill} style={{ width: '40%' }}></div>
          </div>
        </Link>

        <Link to='/biblioteca-treino' className={styles.planCard}>
          <div className={styles.planContent}>
            <div>
              <p className={styles.planLabel}>Plano Ativo</p>
              <p className={styles.planName}>{planoAtivo.titulo}</p>
            </div>
            <div className={styles.planTag}>
              {planoAtivo.categoria || "Personalizado"}
            </div>
          </div>
        </Link>

        {rotinaHoje ? (
          <TreinoCard rotina={rotinaHoje} historico={historico || []} />
        ) : (
          <p>Nenhum exercício encontrado para hoje.</p>
        )}
        <FooterButton title="Finalizar Treino" onClick={handleFinalizar}></FooterButton>
      </main>
    </>
  );
}