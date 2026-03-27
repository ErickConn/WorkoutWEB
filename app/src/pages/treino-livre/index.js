import React from "react";
import styles from './treino-livre.module.css';
import Filtro from "../../components/Filtro";
import HeaderBack from "../../components/HeaderBack";
import { Link } from "react-router-dom";

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
      <HeaderBack title="Criar Treino Personalizado" subtitle="Monte sua sessão"></HeaderBack>

      <div className={styles.content}>
            <section className={styles.card}>
              <label className={styles.label}>Nome do Treino</label>
              <input
                type="text"
                placeholder="Ex: Meu Treino A"
                className={styles.inputNome}
              />
            </section>

            <section className={styles.card}>
              <div className={styles.searchBar}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                  type="text"
                  placeholder="Buscar exercícios para adicionar..."
                  className={styles.searchInput}
                />
              </div>
            </section>

            <Filtro tipo="GRUPO MUSCULAR" filtros={filtros} />

            <section className={styles.bibliotecaSection}>
              <h3 className={styles.sectionTitle}>Biblioteca de Exercícios</h3>
              <div className={styles.listaBiblioteca}>
                {biblioteca.map(ex => (
                  <div key={ex.id} className={styles.itemBiblioteca}>
                    <button className={styles.btnAdd}>+</button>
                    <div className={styles.itemInfo}>
                      <h4 className={styles.itemName}>{ex.nome}</h4>
                      <p className={styles.itemMeta}>{ex.grupo} • {ex.equipamento}</p>
                    </div>
                    <span className={styles.itemArrow}>›</span>
                  </div>
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
                  <div key={ex.id} className={styles.cardSelecionado}>
                    <div className={styles.info}>
                      <p className={styles.nomeEx}>{ex.nome}</p>
                      <p className={styles.detalheEx}>{ex.grupo} • {ex.detalhes}</p>
                    </div>
                    <button className={styles.btnRemove}>×</button>
                  </div>
                ))}
              </div>
            </section>
      </div>
      <Link to={-1} className={styles.footer}>
            <button className={styles.btnSave}>
                <span>💾</span> Salvar Treino Personalizado
            </button>
      </Link>
    </div>
  );
}