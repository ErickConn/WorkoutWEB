import React, { useState, useEffect } from "react";
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import styles from './treino-livre.module.css';
import Filtro from "../../components/Filtro";
import SearchBar from "../../components/SearchBar";
import ExercicioItem from "./components/exercicio-item";
import ExercicioSelecionado from "./components/exercicio-selecionado";
import { adicionarTreinoNaRotina, adicionarTreinoAoPlano, atualizarTreinoNoPlano, atualizarTreinoDaRotinaEdicao } from "../../redux/treino/actions";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button";
import FooterButton from "../../components/FooterButton";
import { fetchExercicioList } from "../../redux/exercicio/actions";

export default function TreinoLivreModal({ show, handleClose, rotina = null, idPlano = null, treinoEmEdicao = null }) {
  const [busca, setBusca] = useState("");
  const [grupoAtivo, setGrupoAtivo] = useState("Todos");
  const [nomeTreino, setNomeTreino] = useState("");
  const [selecionados, setSelecionados] = useState([]);
  const [showSeriesModal, setShowSeriesModal] = useState(false);
  const [exercicioSelecionado, setExercicioSelecionado] = useState(null);
  const [series, setSeries] = useState("");
  const [repeticoes, setRepeticoes] = useState("");

  const dispatch = useDispatch();
  const exercicios = useSelector(state => state.exercicioReducer.exercicios);
  const planoEmEdicaoRotina = useSelector(state => state.treinoReducer.planoEmEdicao).rotina;
  // Use rotina from props, or fallback to planoEmEdicao.rotina from Redux
  const rotinaAtual = rotina !== null ? rotina : planoEmEdicaoRotina;

  useEffect(() => {
    if (show && exercicios.length === 0) {
      dispatch(fetchExercicioList());
    }
  }, [show, exercicios.length, dispatch]);

  useEffect(() => {
    if (!show) return;

    if (treinoEmEdicao) {
      setNomeTreino(treinoEmEdicao.foco || "");
      setSelecionados(treinoEmEdicao.exercicios.map((ex) => ({
        ...ex,
        series: ex.series ?? ex.seriesPadrao ?? 3,
        repeticoes: ex.reps ?? ex.repsPadrao ?? 12
      })));
    } else {
      setNomeTreino("");
      setSelecionados([]);
    }
  }, [show, treinoEmEdicao]);

  const filtros = ["Todos", "Peito", "Costas", "Pernas", "Ombros", "Bíceps", "Tríceps"];

  const abrirModalSeries = (exercicio) => {
    setExercicioSelecionado(exercicio);
    setSeries("");
    setRepeticoes("");
    setShowSeriesModal(true);
  };

  const adicionarExercicioComSeries = () => {
    if (!series || !repeticoes) {
      alert("Por favor, preencha séries e repetições");
      return;
    }

    if (!selecionados.find(ex => ex.id === exercicioSelecionado.id)) {
      const exercicioComDados = {
        ...exercicioSelecionado,
        series: parseInt(series),
        repeticoes: parseInt(repeticoes)
      };
      setSelecionados([...selecionados, exercicioComDados]);
    }

    setShowSeriesModal(false);
    setExercicioSelecionado(null);
  };

  const removerExercicio = (id) => {
    setSelecionados(selecionados.filter(ex => ex.id !== id));
  };

  const bibliotecaFiltrada = exercicios.filter((ex) => {
    const jaSelecionado = selecionados.some(sel => sel.id === ex.id);
    const bateBusca = ex.nome.toLowerCase().includes(busca.toLowerCase());
    const bateGrupo = grupoAtivo === "Todos" || ex.grupo === grupoAtivo;
    return !jaSelecionado && bateBusca && bateGrupo;
  });

  const handleSalvar = () => {
    const letras = ["A", "B", "C", "D", "E", "F", "G"];
    const letraAtual = letras[rotinaAtual.length] || "?";

    const exerciciosFormatados = selecionados.map((ex) => ({
      ...ex,
      seriesPadrao: ex.series ?? ex.seriesPadrao ?? 3,
      repsPadrao: ex.repeticoes ?? ex.repsPadrao ?? 12
    }));

    if (idPlano !== null) {
      if (treinoEmEdicao) {
        dispatch(atualizarTreinoNoPlano(idPlano, {
          ...treinoEmEdicao,
          foco: nomeTreino || treinoEmEdicao.foco,
          exercicios: exerciciosFormatados
        }, rotinaAtual));
      } else {
        dispatch(adicionarTreinoAoPlano(idPlano, nomeTreino, selecionados, rotinaAtual));
      }
    } else if (treinoEmEdicao) {
      dispatch(atualizarTreinoDaRotinaEdicao({
        ...treinoEmEdicao,
        foco: nomeTreino || treinoEmEdicao.foco,
        exercicios: exerciciosFormatados
      }));
    } else {
      dispatch(adicionarTreinoNaRotina(nomeTreino, selecionados, letraAtual));
    }

    handleClose();
    setSelecionados([]);
    setNomeTreino("");
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" scrollable centered>
      <Modal.Header closeButton className={styles.modalHeader}>
      </Modal.Header>

      <Modal.Body className={styles.modalBody}>
        <section className={styles.card}>
          <label className={styles.label}>Nome do Treino</label>
          <input
            type="text"
            placeholder="Ex: Meu Treino A"
            className={styles.inputNome}
            value={nomeTreino}
            onChange={(e) => setNomeTreino(e.target.value)}
          />
        </section>

        <SearchBar
          placeholder="Buscar exercícios..."
          value={busca}
          onChange={setBusca}
        />

        <Filtro
          tipo="GRUPO MUSCULAR"
          filtros={filtros}
          ativo={grupoAtivo}
          onSelect={setGrupoAtivo}
        />

        <section className={styles.bibliotecaSection}>
          <div className={styles.headerFlex}>
            <h3 className={styles.sectionTitle}>Biblioteca</h3>
            <Button
              title="Ver Tudo"
              link="/biblioteca-exercicio"
              variant="primary"
            />
          </div>
          <div className={styles.listaBiblioteca}>
            {bibliotecaFiltrada.length > 0 ? (
              bibliotecaFiltrada.map(ex => (
                <ExercicioItem
                  key={ex.id}
                  exercicio={ex}
                  onAdd={() => abrirModalSeries(ex)}
                />
              ))
            ) : (
              <p className={styles.noResults}>Nenhum exercício encontrado.</p>
            )}
          </div>
        </section>

        <section className={styles.selecionadosCard}>
          <div className={styles.selecionadosHeader}>
            <h3 className={styles.selecionadosTitle}>📋 Selecionados ({selecionados.length})</h3>
          </div>

          <div className={styles.listaSelecionados}>
            {selecionados.length > 0 ? (
              selecionados.map(ex => (
                <ExercicioSelecionado
                  key={ex.id}
                  exercicio={ex}
                  onRemove={() => removerExercicio(ex.id)}
                />
              ))
            ) : (
              <p className={styles.emptySelection}>Selecione exercícios acima.</p>
            )}
          </div>
        </section>
      </Modal.Body>

      <Modal.Footer>
        <FooterButton title="Salvar Treino" onClick={() => handleSalvar()}></FooterButton>
      </Modal.Footer>
      {/* Modal para inserir séries e repetições */}
      <Modal show={showSeriesModal} onHide={() => setShowSeriesModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Configurar Exercício</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {exercicioSelecionado && (
            <div>
              <h5>{exercicioSelecionado.nome}</h5>
              <p className={styles.itemMeta}>{exercicioSelecionado.grupo} • {exercicioSelecionado.equipamento}</p>

              <div style={{ marginTop: '20px' }}>
                <label className={styles.label}>Série(s)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Digite a quantidade de séries"
                  className={styles.inputNome}
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
                />
              </div>

              <div style={{ marginTop: '15px' }}>
                <label className={styles.label}>Repetição(ões)</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  placeholder="Digite a quantidade de repetições"
                  className={styles.inputNome}
                  value={repeticoes}
                  onChange={(e) => setRepeticoes(e.target.value)}
                />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <BootstrapButton variant="secondary" onClick={() => setShowSeriesModal(false)}>
            Cancelar
          </BootstrapButton>
          <BootstrapButton variant="primary" onClick={adicionarExercicioComSeries}>
            Adicionar
          </BootstrapButton>
        </Modal.Footer>
      </Modal>    </Modal>
  );
}