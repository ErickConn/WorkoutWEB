import React from "react";
import styles from './index.module.css';
import HeaderBack from "../../components/HeaderBack";
import FooterButton from "../../components/FooterButton";
import SearchBar from "../../components/SearchBar";
import Filtro from "../../components/Filtro";
import ListaTreinos from "./components/lista-treinos";

export default function BibliotecaTreino() {
  const recomendados = [
    {
      id: 1,
      titulo: "ABC Intermediário",
      subtitulo: "3 treinos • 5-6 exercícios cada",
      badge: "ABC",
      badgeColor: "bgGreen",
      recomendado: true,
      tags: ["Hipertrofia", "4x/semana"],
      footerText: "Treino A (Peito/Tríceps), B (Costas/Bíceps), C (Pernas/Ombros)"
    }
  ];

  const planosModelo = [
    {
      id: 2,
      titulo: "Full Body Iniciante",
      subtitulo: "1 treino • 8-10 exercícios",
      badge: "FB",
      badgeColor: "bgOrange",
      nivel: "Iniciante",
      tags: ["Corpo Inteiro", "3x/semana"]
    },
    {
      id: 3,
      titulo: "AB Intermediário",
      subtitulo: "2 treinos • 6-7 exercícios cada",
      badge: "AB",
      badgeColor: "bgBlue",
      nivel: "Intermediário",
      tags: ["Push/Pull", "4x/semana"]
    }
  ];

  const personalizados = [
    {
      id: 99,
      titulo: "Treino Upper Body Custom",
      subtitulo: "Criado por você • 8 exercícios",
      badge: "⚡",
      badgeColor: "bgPurple",
      isCustom: true,
      tags: ["Personalizado"]
    }
  ];

  return (
    <div className={styles.container}>
      <HeaderBack title="Biblioteca de Treinos" subtitle="Planos modelo" />

      <div className={styles.content}>
        <SearchBar placeholder="Buscar treinos..." />
        <Filtro tipo="NÍVEL" filtros={["Todos", "Iniciante", "Intermediário", "Avançado"]} />

        <ListaTreinos titulo="✨ RECOMENDADOS PARA VOCÊ" dados={recomendados} />
        
        <ListaTreinos titulo="Todos os Planos Modelo" dados={planosModelo} />
        
        <ListaTreinos titulo="💜 Meus Treinos Personalizados" dados={personalizados} />
      </div>

      <FooterButton title="Criar Novo Treino" link="/treino-livre" />
    </div>
  );
}