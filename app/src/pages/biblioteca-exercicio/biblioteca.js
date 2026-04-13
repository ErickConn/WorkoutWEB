import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./biblioteca.module.css";
import HeaderBack from "../../components/HeaderBack";
import { fetchExercicioList } from '../../redux/exercicio/actions';
import ListaExercicios from "./components/lista-exercicios";
import NovoExercicioModal from "./modals/modalNovoExercicio";
import EditarExercicioModal from "./modals/modalEditarExercicio";
import DeletarExercicioModal from "./modals/modalDeletarExercicio";

export default function BibliotecaExercicios() {
  const dispatch = useDispatch();
  const { exercicios, loading, error } = useSelector(state => state.exercicioReducer);

  const location = useLocation();
  const navigate = useNavigate();

  const voltar = () => {
    if (location.state?.from === "treino-livre") {
      navigate("/treino-livre");
    } else {
      navigate(-1);
    }
  };

  const [busca, setBusca] = useState("");
  const [selecionados, setSelecionados] = useState([]);
  const [showNovoModal, setShowNovoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const grupos = ["Todos", "Peito", "Costas", "Pernas", "Ombros", "Bíceps", "Tríceps"];
    const [grupoAtivo, setGrupoAtivo] = useState("Todos");
  // futuro: níveis disponíveis
  const niveis = ["Todos", "Básico", "Intermediário", "Avançado"];
  const [nivelAtivo, setNivelAtivo] = useState("Todos");

  const handleDelete = (id) => {
    const exercicio = exercicios.find(ex => ex.id === id);
    setSelecionados(exercicio);
    setShowDeleteModal(true);
  };

  const handleEdit = (exercicio) => {
    setSelecionados(exercicio);
    setShowEditModal(true);
  };

  const handleAdd = (exercicio) => {
    alert(`Adicionar exercício: ${exercicio.nome}`);
  };

  useEffect(() => {
    dispatch(fetchExercicioList());
  }, [dispatch]);

  if (loading) return <p>Carregando página, aguarde...</p>;
  if (error) return <p>Erro: {error}</p>;


  // filtro atual (grupo + busca) => futuro: (grupo + busca + nível)
  const exerciciosFiltrados = exercicios.filter(ex => {
    const nomeOuTitulo = ex.nome || ex.titulo || "";
    const bateBusca = nomeOuTitulo.toLowerCase().includes(busca.toLowerCase());
    const grupo = ex.grupo || "";
    const bateGrupo = grupoAtivo === "Todos" || grupo === grupoAtivo;
    const nivel = ex.nivel || "";
    const bateNivel = nivelAtivo === "Todos" || nivel === nivelAtivo;
    return bateBusca && bateGrupo && bateNivel;
  });
  

  const adicionarExercicio = (exercicio) => {
    if (!selecionados.find(s => s.id === exercicio.id)) {
      setSelecionados([...selecionados, exercicio]);
    }
  };

  const removerExercicio = (id) => {
    setSelecionados(selecionados.filter(s => s.id !== id));
  };

  return (
    <div className={styles.biblioteca}>
      <HeaderBack
        title="Biblioteca de Exercícios"
        subtitle="Várias opções para escolher"
        onBack={voltar}
      />

      <div>
        <button
          className={styles.btnAddExercicio}
          onClick={() => setShowNovoModal(true)}
        >
          + Adicionar Exercício
        </button>
        <NovoExercicioModal show={showNovoModal} handleClose={() => setShowNovoModal(false)} />
      </div>

      <input
        className={styles.search}
        placeholder="Buscar exercício..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
      />

      <div className={styles.filtro}>
        {grupos.map(grupo => (
          <button
            key={grupo}
            className={grupoAtivo === grupo ? styles.active : ""}
            onClick={() => setGrupoAtivo(grupo)}
          >
            {grupo}
          </button>
        ))}
      </div>

      {/* Futuro: filtro por nível */}
      {/*
      <div className={styles.filtro}>
        {niveis.map(nivel => (
          <button
            key={nivel}
            className={nivelAtivo === nivel ? styles.active : ""}
            onClick={() => setNivelAtivo(nivel)}
          >
            {nivel}
          </button>
        ))}
      </div>
      */}

      <ListaExercicios
        titulo="Exercícios"
        dados={exerciciosFiltrados}
        onAdd={adicionarExercicio}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditarExercicioModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        exercicio={selecionados}
      />
      <DeletarExercicioModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        exercicio={selecionados}
      />

      {exerciciosFiltrados.length === 0 && (
        <div className={styles.emptyState}>
          <p>
            Nenhum exercício encontrado para <strong>{grupoAtivo}</strong> com busca <strong>"{busca}"</strong>.
          </p>
        </div>
      )}

      <section className={styles.selecionadosCard}>
        <h3 className={styles.selecionadosTitle}>📋 Selecionados ({selecionados.length})</h3>
        <div className={styles.listaSelecionados}>
          {selecionados.length > 0 ? (
            selecionados.map(ex => (
              <div key={ex.id} className={styles.cardSelecionado}>
                <p className={styles.nomeEx}>{ex.nome}</p>
                {/* Futuro: mostrar nível */}
                {/* <p className={styles.nivelEx}>Nível: {ex.nivel}</p> */}
                <button
                  className={styles.btnRemove}
                  onClick={() => removerExercicio(ex.id)}
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <p className={styles.emptySelection}>Selecione exercícios acima.</p>
          )}
        </div>
      </section>
    </div>
  );
}