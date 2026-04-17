import React, { useEffect } from "react";
import styles from './exercicio.module.css';
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchTreinoList } from "../../redux/treino/slices";
import { fetchProgresso } from "../../redux/progresso/actions";
import { carregarRegistrosUsuario } from "../../redux/progresso/actions"; 

import HeaderBack from "../../components/HeaderBack";
import RegistroCard from "./components/registro-card";
import SeriesCard from "./components/series-card";
import SubstitutosCard from "./components/substitutos-card";

export default function Exercicio() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // 1. DADOS SEPARADOS NOS SEUS RESPECTIVOS REDUCERS
  const planos = useSelector(state => state.treinoReducer.planos);
  const loadingTreino = useSelector(state => state.treinoReducer.loading);

  const historico = useSelector(state => state.progressoReducer.historico);
  const registrosUsuario = useSelector(state => state.progressoReducer.registrosUsuario);
  const loadingProgresso = useSelector(state => state.progressoReducer.loading);
  const progressoLoaded = useSelector(state => state.progressoReducer.loaded);

  const loading = loadingTreino || loadingProgresso;

  // 2. USEEFFECT BLINDADO CONTRA LOOP E PREPARADO PARA F5
  useEffect(() => {
    if (!planos || planos.length === 0) {
      dispatch(fetchTreinoList());
    }
    
    if (!progressoLoaded) {
      dispatch(fetchProgresso());
    }

    // A Action crucial que formata as séries para o RegistroCard ler
    if (!progressoLoaded) {
      dispatch(carregarRegistrosUsuario());
    }
  }, [dispatch, planos, progressoLoaded]); 

  // 3. USO DO OPTIONAL CHAINING (?.) PARA NÃO QUEBRAR DURANTE O LOADING
  const planoAtivo = planos?.find(p => p.ativo);
  const rotinaHoje = planoAtivo?.rotina?.find(treino => treino.ativo === true) || planoAtivo?.rotina?.[0];

  // Adicionada comparação segura com String() caso a URL traga o id como string e o banco como número
  const exercicioAtual = rotinaHoje?.exercicios?.find(ex => String(ex.id) === String(id)) || null;

  const dataAtual = new Date().toISOString().split('T')[0];
  
  const todosRegistrosDoExercicio = registrosUsuario?.filter(r =>
    String(r.exercicioId) === String(id) && 
    (r.dia === rotinaHoje?.dia) && 
    (r.idPlano === planoAtivo?.id)
  );

  const registroHoje = todosRegistrosDoExercicio?.find(r => r.data === dataAtual);
  const registrosPassados = todosRegistrosDoExercicio?.filter(r => r.data !== dataAtual);
  const ultimoRegistro = registrosPassados?.sort((a, b) => new Date(b.data) - new Date(a.data))[0];

  const seriesRealizadas = registroHoje?.seriesRealizadas || [];
  const historicoRealizado = ultimoRegistro?.seriesRealizadas || [];

  // Protegemos a tela não só pelo loading, mas garantimos que as variáveis base já existem
  if (loading || !planos || !registrosUsuario) {
    return (
      <div className={styles.container}>
        <HeaderBack title="Carregando..." />
        <p style={{ textAlign: "center", marginTop: "2rem", color: "#666" }}>Carregando exercício...</p>
      </div>
    );
  }

  if (!exercicioAtual) {
    return (
      <div className={styles.container}>
        <HeaderBack title="Exercício não encontrado" />
        <p style={{ textAlign: "center", marginTop: "2rem", color: "#666" }}>Exercício não encontrado no treino atual.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Fallbacks adicionados para seriesPadrao ou series, dependendo de como está no seu JSON */}
      <HeaderBack 
        title={exercicioAtual.nome} 
        subtitle={`${exercicioAtual.seriesPadrao || exercicioAtual.series || "-"} x ${exercicioAtual.repsPadrao || exercicioAtual.reps || "-"} reps`} 
      />

      <div className={styles.content}>
        <div className={styles.mainGrid}>
          
          <div className={styles.column}>
            {/* O SeriesCard agora envia as séries passadas mais recentes para servir de referência */}
            <SeriesCard 
                historico={historicoRealizado} 
                dica={exercicioAtual.dica || "Execute o exercício com técnica correta."} 
            />
          </div>

          <div className={styles.column}>
            <RegistroCard 
                exercicioOriginal={{...exercicioAtual, seriesRealizadas}} 
                isLoading={loading}
            />
            
            <SubstitutosCard 
                substitutos={exercicioAtual.substitutos} 
            />
          </div>

        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <Link to='/treino' className={styles.btnComplete}>Voltar para o Treino</Link>
          <button className={styles.btnReplace}>Trocar Exercício</button>
        </div>
      </div>
    </div>
  );
}