import React, { useEffect, useState } from "react"; 
import styles from './exercicio.module.css';
import { Link, useParams, useNavigate } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";

import { fetchPlanoList } from "../../redux/planos/slices";
import { fetchProgresso, carregarRegistrosUsuario } from "../../redux/progresso/slices";
import { trocarExercicioNoPlano } from "../../redux/planos/slices"; 

import HeaderBack from "../../components/HeaderBack";
import Spinner from "../../components/Spinner";
import RegistroCard from "./components/registro-card";
import SeriesCard from "./components/series-card";
import SubstitutosCard from "./components/substitutos-card";

export default function Exercicio() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [substitutoSelecionado, setSubstitutoSelecionado] = useState(null);

  const planos = useSelector(state => state.planosReducer.planos);
  const loadingTreino = useSelector(state => state.planosReducer.loading);

  const historico = useSelector(state => state.progressoReducer.historico);
  const registrosUsuario = useSelector(state => state.progressoReducer.registrosUsuario);
  const loadingProgresso = useSelector(state => state.progressoReducer.loading);
  const progressoLoaded = useSelector(state => state.progressoReducer.loaded);

  const loading = loadingTreino || loadingProgresso;

  useEffect(() => {
    if (!planos || planos.length === 0) {
      dispatch(fetchPlanoList());
    }

    if (!progressoLoaded) {
      dispatch(fetchProgresso());
    }

    if (!progressoLoaded) {
      dispatch(carregarRegistrosUsuario());
    }
  }, [dispatch, planos, progressoLoaded]);

  const planoAtivo = planos?.find(p => p.ativo);
  const rotinaHoje = planoAtivo?.rotina?.find(treino => treino.ativo === true) || planoAtivo?.rotina?.[0];
  const exercicioAtual = rotinaHoje?.exercicios?.find(ex => String(ex.id) === String(id)) || null;

  const dataAtual = new Date().toISOString().split('T')[0];

  const todosRegistrosDoExercicio = registrosUsuario?.filter(r =>
    String(r.exercicioId) === String(id)
  );

  const registroHoje = todosRegistrosDoExercicio?.find(r => r.data === dataAtual && r.finalizado === false);
  const registrosPassados = todosRegistrosDoExercicio?.filter(r => r.finalizado === true || r.data !== dataAtual);
  const ultimoRegistro = registrosPassados?.sort((a, b) => new Date(b.data) - new Date(a.data))[0];

  const seriesRealizadas = registroHoje?.seriesRealizadas || [];
  const historicoRealizado = ultimoRegistro?.seriesRealizadas || [];

  const handleConfirmarTroca = async () => {
    if (!substitutoSelecionado) {
      alert("Por favor, selecione um exercício substituto na lista primeiro!");
      return;
    }

    try {
      // Aguarda o backend confirmar a troca e o Redux ser atualizado
      // antes de navegar, senão a nova página carrega sem o exercício no plano
      await dispatch(trocarExercicioNoPlano({
        idPlano: planoAtivo?.id,
        idRotina: rotinaHoje?.id,
        idAntigo: id,
        idNovo: substitutoSelecionado
      })).unwrap();

      // Limpa a seleção e navega apenas após sucesso
      setSubstitutoSelecionado(null);
      navigate(`/exercicio/${substitutoSelecionado}`);
    } catch (err) {
      alert(`Erro ao trocar exercício: ${err?.message || err}`);
    }
  };

  if (loading || !planos || !registrosUsuario) {
    return (
      <div className={styles.container}>
        <HeaderBack title="Carregando..." />
        <Spinner className="vh-100" />
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
      <HeaderBack
        to="/treino"
        title={exercicioAtual.nome}
        subtitle={`${exercicioAtual.seriesPadrao || exercicioAtual.series || "-"} x ${exercicioAtual.repsPadrao || exercicioAtual.reps || "-"} reps`}
      />

      <div className={styles.content}>
        <div className={styles.mainGrid}>

          <div className={styles.column}>
            <SeriesCard
              historico={historicoRealizado}
              dica={exercicioAtual.dica_tecnica || "Execute o exercício com técnica correta."}
            />
          </div>

          <div className={styles.column}>
            <RegistroCard
              exercicioOriginal={{ ...exercicioAtual, seriesRealizadas }}
              isLoading={loading}
            />

            <SubstitutosCard
              substitutos={exercicioAtual.substitutos}
              idSelecionado={substitutoSelecionado}
              onSelecionar={setSubstitutoSelecionado}
            />
          </div>

        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <Link to='/treino' className={styles.btnComplete}>Voltar para o Treino</Link>
          <button 
            type="button" 
            className={`${styles.btnReplace} ${substitutoSelecionado ? styles.btnReplaceActive : ''}`} 
            onClick={handleConfirmarTroca}
          >
            {substitutoSelecionado ? "Confirmar Troca" : "Trocar Exercício"}
          </button>
        </div>
      </div>
    </div>
  );
}