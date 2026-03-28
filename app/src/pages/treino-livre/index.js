import React, { useState } from "react";
import styles from './treino-livre.module.css';
import Filtro from "../../components/Filtro";
import HeaderBack from "../../components/HeaderBack";
import FooterButton from "../../components/FooterButton";
import SearchBar from "../../components/SearchBar";
import ExercicioItem from "./components/exercicio-item";
import ExercicioSelecionado from "./components/exercicio-selecionado";

export default function TreinoLivre() {
  const [busca, setBusca] = useState("");
  const [grupoAtivo, setGrupoAtivo] = useState("Todos");
  const [nomeTreino, setNomeTreino] = useState("");

  const [biblioteca, setBiblioteca] = useState([
    { id: 101, nome: "Crucifixo com Halteres", grupo: "Peito", equipamento: "Halteres" },
    { id: 102, nome: "Puxada Frontal", grupo: "Costas", equipamento: "Máquina" },
    { id: 103, nome: "Leg Press 45°", grupo: "Pernas", equipamento: "Máquina" },
    { id: 104, nome: "Rosca Direta", grupo: "Bíceps", equipamento: "Barra" },
    { id: 105, nome: "Supino Reto", grupo: "Peito", detalhes: "4x 8-10" },
    { id: 106, nome: "Remada Curvada", grupo: "Costas", detalhes: "4x 10-12" },
  ]);

  const [selecionados, setSelecionados] = useState([]);

  const filtros = ["Todos", "Peito", "Costas", "Pernas", "Ombros", "Bíceps", "Tríceps"];

  const adicionarExercicio = (exercicio) => {
    setBiblioteca(biblioteca.filter(ex => ex.id !== exercicio.id));
    setSelecionados([...selecionados, exercicio]);
  };

  const removerExercicio = (id) => {
    const exercicioParaVoltar = selecionados.find(ex => ex.id === id);
    setSelecionados(selecionados.filter(ex => ex.id !== id));
    setBiblioteca([...biblioteca, exercicioParaVoltar]);
  };

  const bibliotecaFiltrada = biblioteca.filter((ex) => {
    const bateBusca = ex.nome.toLowerCase().includes(busca.toLowerCase());
    const bateGrupo = grupoAtivo === "Todos" || ex.grupo === grupoAtivo;
    return bateBusca && bateGrupo;
  });

  return (
    <div className={styles.container}>
      <HeaderBack title="Criar Treino Personalizado" subtitle="Monte sua sessão" />

      <div className={styles.content}>
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
          placeholder="Buscar exercícios para adicionar..." 
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
          <h3 className={styles.sectionTitle}>Biblioteca de Exercícios</h3>
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
              <p className={styles.noResults}>Nenhum exercício disponível nesta categoria.</p>
            )}
          </div>
        </section>

        <section className={styles.selecionadosCard}>
          <div className={styles.selecionadosHeader}>
            <h3 className={styles.selecionadosTitle}>📋 Selecionados</h3>
            <span className={styles.countBadge}>{selecionados.length} exercícios</span>
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
                <p className={styles.emptySelection}>Nenhum exercício selecionado ainda.</p>
            )}
          </div>
        </section>
      </div>

      <FooterButton title="Salvar Treino Personalizado" link={-1} />
    </div>
  );
}