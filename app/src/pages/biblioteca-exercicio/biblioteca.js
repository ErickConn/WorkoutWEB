import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./biblioteca.module.css";
import HeaderBack from "../../components/HeaderBack";
import { fetchExercicioList } from '../../redux/exercicio/slices';
import ListaExercicios from "./components/lista-exercicios";
import NovoExercicioModal from "./modals/modalNovoExercicio";
import EditarExercicioModal from "./modals/modalEditarExercicio";
import DeletarExercicioModal from "./modals/modalDeletarExercicio";

export default function BibliotecaExercicios() {
  const dispatch = useDispatch();
  const { exercicios, loading, error } = useSelector(state => state.exercicioReducer);
  console.log("Exercícios no estado:", exercicios);

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

  // Filtros
  const grupos = ["Todos", "Peito", "Costas", "Pernas", "Ombros", "Bíceps", "Tríceps"];
  const [grupoAtivo, setGrupoAtivo] = useState("Todos");
  
  const niveis = ["Todos", "Iniciante", "Intermediário", "Avançado"];
  const [nivelAtivo, setNivelAtivo] = useState("Todos");

  const handleDelete = (id) => {
    const exercicio = exercicios.find(ex => ex.id === id);
    console.log("Exercício encontrado para deletar:", exercicio);
    setSelecionados(exercicio);
    setShowDeleteModal(true);
  };

  const handleEdit = (exercicio) => {
    setSelecionados(exercicio);
    setShowEditModal(true);
  };


  useEffect(() => {
    console.log("Carregando exercícios...");
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
    const nivel = ex.nivel_experiencia || "";
    const bateNivel = nivelAtivo === "Todos" || nivel === nivelAtivo;
    console.log(`Exercício: "${nomeOuTitulo}", Grupo: "${grupo}", Nível: "${nivel}"`);
    if (bateBusca && bateGrupo && bateNivel) {
      console.log(`Filtrando exercício: "${nomeOuTitulo}", Busca: ${bateBusca}, Grupo: ${grupo} (${bateGrupo}), Nível: ${nivel} (${bateNivel})`);
    }
    return bateBusca && bateGrupo && bateNivel;
  });
  

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

      <ListaExercicios
        titulo="Exercícios"
        dados={exerciciosFiltrados}
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
            Nenhum exercício encontrado para <strong>{grupoAtivo}</strong> e <strong>{nivelAtivo}</strong> com busca <strong>"{busca}"</strong>.
          </p>
        </div>
      )}

    </div>
  );
}