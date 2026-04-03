import React, { useState, useEffect } from "react";
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import styles from './treino-livre.module.css';
import Filtro from "../../components/Filtro";
import SearchBar from "../../components/SearchBar";
import ExercicioItem from "./components/exercicio-item";
import ExercicioSelecionado from "./components/exercicio-selecionado";
import { fetchExercicioList } from "../../redux/treino/actions";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button";
import FooterButton from "../../components/FooterButton";
import { adicionarTreinoNaRotina } from "../../redux/treino/actions";

export default function TreinoLivreModal({ show, handleClose }) {
  const [busca, setBusca] = useState("");
  const [grupoAtivo, setGrupoAtivo] = useState("Todos");
  const [nomeTreino, setNomeTreino] = useState("");
  const [selecionados, setSelecionados] = useState([]);
  
  const dispatch = useDispatch();
  const exercicios = useSelector(state => state.treinoReducer.exercicios);
  const { rotina } = useSelector(state => state.treinoReducer.planoEmEdicao);

  useEffect(() => {
  if (show && exercicios.length === 0) {
    dispatch(fetchExercicioList());
  }
}, [show, exercicios.length, dispatch]);

  const filtros = ["Todos", "Peito", "Costas", "Pernas", "Ombros", "Bíceps", "Tríceps"];

  const adicionarExercicio = (exercicio) => {
    if (!selecionados.find(ex => ex.id === exercicio.id)) {
      setSelecionados([...selecionados, exercicio]);
    }
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
  const letraAtual = letras[rotina.length] || "?";

  dispatch(adicionarTreinoNaRotina(nomeTreino, selecionados, letraAtual));

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
                  onAdd={() => adicionarExercicio(ex)} 
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
        <FooterButton title="Salvar Treino" onClick={()=>handleSalvar()}></FooterButton>
      </Modal.Footer>
    </Modal>
  );
}