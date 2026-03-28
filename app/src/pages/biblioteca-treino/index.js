import styles from './index.module.css';
import HeaderBack from "../../components/HeaderBack";
import FooterButton from "../../components/FooterButton";
import SearchBar from "../../components/SearchBar";
import Filtro from "../../components/Filtro";
import ListaTreinos from "./components/lista-treinos";

import React, { useState } from "react";

export default function BibliotecaTreino() {
  const [busca, setBusca] = useState("");
  const [nivelAtivo, setNivelAtivo] = useState("Todos");

  const todosOsTreinos = [
  { 
    id: 1, 
    titulo: "ABC Intermediário", 
    nivel: "Intermediário", 
    categoria: "recomendado", 
    badge: "ABC", 
    badgeColor: "bgGreen",
    subtitulo: "3 treinos • 5-6 exercícios cada",
    recomendado: true,
    tags: ["Hipertrofia", "4x/semana"],
    footerText: "Treino A (Peito/Tríceps), B (Costas/Bíceps), C (Pernas/Ombros)"
  },

  { 
    id: 2, 
    titulo: "Full Body Iniciante", 
    nivel: "Iniciante", 
    categoria: "modelo",
    badge: "FB",
    badgeColor: "bgOrange",
    subtitulo: "1 treino • 8-10 exercícios",
    tags: ["Adaptação", "3x/semana"]
  },

  { 
    id: 3, 
    titulo: "Heavy Duty", 
    nivel: "Avançado", 
    categoria: "modelo",
    badge: "HD",
    badgeColor: "bgBlue",
    subtitulo: "1 treino • Alta Intensidade",
    tags: ["Força", "Falha Total"]
  },

  { 
    id: 4, 
    titulo: "Push/Pull/Legs", 
    nivel: "Intermediário", 
    categoria: "modelo",
    badge: "PPL",
    badgeColor: "bgBlue",
    subtitulo: "3 treinos • Foco em biomecânica",
    tags: ["Volume Médio", "6x/semana"]
  },

  { 
    id: 99, 
    titulo: "Treino Upper Body Custom", 
    nivel: "Avançado", 
    categoria: "personalizado",
    badge: "⚡",
    badgeColor: "bgPurple",
    isCustom: true,
    subtitulo: "Criado por você • 8 exercícios",
    tags: ["Personalizado"]
  }
];

  const treinosFiltrados = todosOsTreinos.filter((treino) => {
    const bateBusca = treino.titulo.toLowerCase().includes(busca.toLowerCase());
    const bateNivel = nivelAtivo === "Todos" || treino.nivel === nivelAtivo;
    return bateBusca && bateNivel;
  });

  const recomendados = treinosFiltrados.filter(t => t.categoria === "recomendado");
  const modelos = treinosFiltrados.filter(t => t.categoria === "modelo");
  const personalizados = treinosFiltrados.filter(t => t.categoria === "personalizado");

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <HeaderBack title="Biblioteca de Treinos" subtitle="Planos modelo"></HeaderBack>
        
        <SearchBar 
          placeholder="Buscar treinos..." 
          value={busca} 
          onChange={setBusca} 
        />

        <Filtro 
          tipo="NÍVEL" 
          filtros={["Todos", "Iniciante", "Intermediário", "Avançado"]} 
          ativo={nivelAtivo}
          onSelect={setNivelAtivo}
        />

        <ListaTreinos titulo="✨ RECOMENDADOS" dados={recomendados} />
        <ListaTreinos titulo="Todos os Planos Modelo" dados={modelos} />
        <ListaTreinos titulo="Seus Treinos" dados={personalizados} />

        {treinosFiltrados.length === 0 && (
          <div className={styles.emptyState}>
            <p>Nenhum treino de nível <strong>{nivelAtivo}</strong> encontrado para <strong>"{busca}"</strong>.</p>
          </div>
        )}
        <FooterButton title="Criar Novo Treino" link="/treino-livre"></FooterButton>
      </div>
    </div>
  );
}