import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import RegistroCard from "./components/RegistroCard";

export default function ExercicioPage() {
  const { id } = useParams();
  const planos = useSelector(state => state.treinoReducer.planos);
  const planoAtivo = planos.find(p => p.ativo);

  // procura o treino ativo
  const treinoAtivo = planoAtivo?.rotina.find(t => t.ativo);
  // procura o exercício pelo id
  const exercicioOriginal = treinoAtivo?.exercicios.find(ex => String(ex.id) === String(id));

  if (!exercicioOriginal) {
    return <p>Exercício não encontrado.</p>;
  }

  return (
    <RegistroCard exercicioOriginal={exercicioOriginal} planoAtivo={planoAtivo} />
  );
}