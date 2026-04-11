import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./biblioteca.module.css";
import HeaderBack from "../../components/HeaderBack";
import { fetchExercicioList } from '../../redux/exercicio/actions';
import ListaExercicios from "./components/lista-exercicios";

export default function BibliotecaExercicios() {
  const dispatch = useDispatch();
  const { exercicios, loading, error } = useSelector(state => state.exercicioReducer);
  
  const location = useLocation();
  const navigate = useNavigate();

  const voltar = () => {
    if (location.state?.from === "treino-livre") {
      navigate("/treino-livre");
    } else {
      navigate(-1); // volta para a página anterior
    }
  };


  const [busca, setBusca] = useState("");
  const [grupoAtivo, setGrupoAtivo] = useState("Todos");
  const [selecionados, setSelecionados] = useState([]);

  useEffect(() => {
    dispatch(fetchExercicioList());
  }, [dispatch]);

  if (loading) return <p>Carregando página, aguarde...</p>;
  if (error) return <p>Erro: {error}</p>;

  const grupos = ["Todos", "Peito", "Costas", "Pernas", "Ombros", "Bíceps", "Tríceps"];

  const exerciciosFiltrados = exercicios.filter(ex => {
    const nomeOuTitulo = ex.nome || ex.titulo || "";
    const bateBusca = nomeOuTitulo.toLowerCase().includes(busca.toLowerCase());
    const grupo = ex.grupo || "";
    const bateGrupo = grupoAtivo === "Todos" || grupo === grupoAtivo;
    return bateBusca && bateGrupo;
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

      <ListaExercicios 
        titulo="Exercícios" 
        dados={exerciciosFiltrados} 
        onAdd={adicionarExercicio} 
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
