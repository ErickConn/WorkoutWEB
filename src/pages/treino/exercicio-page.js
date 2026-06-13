import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import RegistroCard from "./components/RegistroCard";

export default function ExercicioPage() {
  const { id } = useParams();
  const planos = useSelector(state => state.planosReducer.planos);
  const loading = useSelector(state => state.planosReducer.loading);
  const planoAtivo = planos.find(p => p.ativo);

  const treinoAtivo = planoAtivo?.rotina.find(t => t.ativo);
  const exercicioOriginal = treinoAtivo?.exercicios.find(ex => String(ex.id) === String(id));

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!exercicioOriginal) {
    return <p>Exercício não encontrado.</p>;
  }

  return (
    <RegistroCard exercicioOriginal={exercicioOriginal} planoAtivo={planoAtivo} />
  );
}