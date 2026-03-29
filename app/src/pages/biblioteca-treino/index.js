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
    footerText: "Treino A (Peito/Tríceps), B (Costas/Bíceps), C (Pernas/Ombros)",
    rotina: [
      {
        dia: "A",
        foco: "Peito e Tríceps",
        exercicios: [
          { id: 101, nome: "Supino Reto", seriesPadrao: 4, repsPadrao: 10 },
          { id: 102, nome: "Supino Inclinado", seriesPadrao: 4, repsPadrao: 10 },
          { id: 103, nome: "Crucifixo Halteres", seriesPadrao: 3, repsPadrao: 12 },
          { id: 104, nome: "Tríceps Testa", seriesPadrao: 3, repsPadrao: 12 },
          { id: 105, nome: "Tríceps Corda", seriesPadrao: 3, repsPadrao: 15 }
        ]
      },
      {
        dia: "B",
        foco: "Costas e Bíceps",
        exercicios: [
          { id: 106, nome: "Puxada Frontal", seriesPadrao: 4, repsPadrao: 10 },
          { id: 107, nome: "Remada Curvada", seriesPadrao: 4, repsPadrao: 10 },
          { id: 108, nome: "Serrote", seriesPadrao: 3, repsPadrao: 12 },
          { id: 109, nome: "Rosca Direta", seriesPadrao: 3, repsPadrao: 10 },
          { id: 110, nome: "Rosca Martelo", seriesPadrao: 3, repsPadrao: 12 }
        ]
      },
      {
        dia: "C",
        foco: "Pernas e Ombros",
        exercicios: [
          { id: 111, nome: "Agachamento Livre", seriesPadrao: 4, repsPadrao: 10 },
          { id: 112, nome: "Leg Press 45°", seriesPadrao: 4, repsPadrao: 12 },
          { id: 113, nome: "Cadeira Extensora", seriesPadrao: 3, repsPadrao: 15 },
          { id: 114, nome: "Desenvolvimento", seriesPadrao: 4, repsPadrao: 10 },
          { id: 115, nome: "Elevação Lateral", seriesPadrao: 3, repsPadrao: 15 }
        ]
      }
    ]
  },

  { 
    id: 2, 
    titulo: "Full Body Iniciante", 
    nivel: "Iniciante", 
    categoria: "modelo",
    badge: "FB",
    badgeColor: "bgOrange",
    subtitulo: "1 treino • 8 exercícios",
    tags: ["Adaptação", "3x/semana"],
    rotina: [
      {
        dia: "Único",
        foco: "Corpo Inteiro",
        exercicios: [
          { id: 201, nome: "Leg Press 45°", seriesPadrao: 3, repsPadrao: 12 },
          { id: 202, nome: "Cadeira Flexora", seriesPadrao: 3, repsPadrao: 12 },
          { id: 203, nome: "Supino Máquina", seriesPadrao: 3, repsPadrao: 12 },
          { id: 204, nome: "Puxada Alta", seriesPadrao: 3, repsPadrao: 12 },
          { id: 205, nome: "Desenvolvimento Máquina", seriesPadrao: 3, repsPadrao: 12 },
          { id: 206, nome: "Rosca Halter", seriesPadrao: 2, repsPadrao: 15 },
          { id: 207, nome: "Tríceps Pulley", seriesPadrao: 2, repsPadrao: 15 },
          { id: 208, nome: "Prancha Abdominal", seriesPadrao: 3, repsPadrao: "30s" }
        ]
      }
    ]
  },

  { 
    id: 3, 
    titulo: "Heavy Duty", 
    nivel: "Avançado", 
    categoria: "modelo",
    badge: "HD",
    badgeColor: "bgBlue",
    subtitulo: "1 treino • Alta Intensidade",
    tags: ["Força", "Falha Total"],
    rotina: [
      {
        dia: "A",
        foco: "Alta Intensidade",
        exercicios: [
          { id: 301, nome: "Peck Deck (Pré-exaustão)", seriesPadrao: 1, repsPadrao: "Falha" },
          { id: 302, nome: "Supino Inclinado", seriesPadrao: 1, repsPadrao: "Falha" },
          { id: 303, nome: "Leg Press (Slow)", seriesPadrao: 1, repsPadrao: "Falha" },
          { id: 304, nome: "Pullover Halter", seriesPadrao: 1, repsPadrao: "Falha" }
        ]
      }
    ]
  },

  { 
    id: 4, 
    titulo: "Push/Pull/Legs", 
    nivel: "Intermediário", 
    categoria: "modelo",
    badge: "PPL",
    badgeColor: "bgBlue",
    subtitulo: "3 treinos • Foco em biomecânica",
    tags: ["Volume Médio", "6x/semana"],
    rotina: [
      {
        dia: "Push",
        foco: "Empurrar",
        exercicios: [
          { id: 401, nome: "Supino Reto", seriesPadrao: 3, repsPadrao: 8 },
          { id: 402, nome: "Desenvolvimento Militar", seriesPadrao: 3, repsPadrao: 10 },
          { id: 403, nome: "Paralelas", seriesPadrao: 3, repsPadrao: 12 }
        ]
      },
      {
        dia: "Pull",
        foco: "Puxar",
        exercicios: [
          { id: 404, nome: "Levantamento Terra", seriesPadrao: 3, repsPadrao: 5 },
          { id: 405, nome: "Barra Fixa", seriesPadrao: 3, repsPadrao: "Falha" },
          { id: 406, nome: "Rosca Inclinada", seriesPadrao: 3, repsPadrao: 12 }
        ]
      },
      {
        dia: "Legs",
        foco: "Pernas",
        exercicios: [
          { id: 407, nome: "Agachamento Sumô", seriesPadrao: 4, repsPadrao: 10 },
          { id: 408, nome: "Stiff", seriesPadrao: 4, repsPadrao: 12 },
          { id: 409, nome: "Panturrilha Gêmeos", seriesPadrao: 4, repsPadrao: 15 }
        ]
      }
    ]
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
    tags: ["Personalizado"],
    rotina: [
      {
        dia: "A",
        foco: "Superior Foco Ombro",
        exercicios: [
          { id: 991, nome: "Desenvolvimento Arnold", seriesPadrao: 4, repsPadrao: 10 },
          { id: 992, nome: "Elevação Lateral Cabo", seriesPadrao: 4, repsPadrao: 15 },
          { id: 993, nome: "Supino Reto Halteres", seriesPadrao: 3, repsPadrao: 10 },
          { id: 994, nome: "Remada Baixa", seriesPadrao: 3, repsPadrao: 12 }
        ]
      }
    ]
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