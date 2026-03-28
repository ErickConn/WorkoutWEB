import React from "react";
import styles from './treino-livre.module.css';
import Filtro from "../../components/Filtro";
import HeaderBack from "../../components/HeaderBack";
import FooterButton from "../../components/FooterButton";
import SearchBar from "../../components/SearchBar";
import ExercicioItem from "./components/exercicio-item";
import ExercicioSelecionado from "./components/exercicio-selecionado";

export default function TreinoLivre() {
  const filtros = ["Todos", "Peito", "Costas", "Pernas", "Ombros", "Bíceps", "Tríceps"];

  const selecionados = [
    { id: 1, nome: "Supino Reto", grupo: "Peito", detalhes: "4x 8-10" },
    { id: 2, nome: "Remada Curvada", grupo: "Costas", detalhes: "4x 10-12" },
    { id: 3, nome: "Desenvolvimento com Halteres", grupo: "Ombros", detalhes: "3x 10-12" }
  ];

  const biblioteca = [
    { id: 101, nome: "Crucifixo com Halteres", grupo: "Peito", equipamento: "Halteres" },
    { id: 102, nome: "Puxada Frontal", grupo: "Costas", equipamento: "Máquina" },
    { id: 103, nome: "Leg Press 45°", grupo: "Pernas", equipamento: "Máquina" }
  ];

  return (
    <div className={styles.container}>
      <HeaderBack title="Criar Treino Personalizado" subtitle="Monte sua sessão" />

      <div className={styles.content}>
        <section className={styles.card}>
          <label className={styles.label}>Nome do Treino</label>
          <input type="text" placeholder="Ex: Meu Treino A" className={styles.inputNome} />
        </section>

        <SearchBar placeholder="Buscar exercícios para adicionar..." />

        <Filtro tipo="GRUPO MUSCULAR" filtros={filtros} />

        <section className={styles.bibliotecaSection}>
          <h3 className={styles.sectionTitle}>Biblioteca de Exercícios</h3>
          <div className={styles.listaBiblioteca}>
            {biblioteca.map(ex => (
              <ExercicioItem key={ex.id} exercicio={ex} onAdd={(e) => console.log('Adicionar', e)} />
            ))}
          </div>
        </section>

        <section className={styles.selecionadosCard}>
          <div className={styles.selecionadosHeader}>
            <h3 className={styles.selecionadosTitle}>📋 Selecionados</h3>
            <span className={styles.countBadge}>{selecionados.length} exercícios</span>
          </div>

          <div className={styles.listaSelecionados}>
            {selecionados.map(ex => (
              <ExercicioSelecionado key={ex.id} exercicio={ex} onRemove={(id) => console.log('Remover', id)} />
            ))}
          </div>
        </section>
      </div>

      <FooterButton title="Salvar Treino Personalizado" link={-1} />
    </div>
  );
}