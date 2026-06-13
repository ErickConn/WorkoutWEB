import { Exercicio, ExercicioTreino } from "../models/exercicios.js";

const getAllExercicios = async (req, res) => {
  try {
    const exercicios = await Exercicio.find({});
    res.json(exercicios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Erro ao listar exercícios" });
  }
};

const getExercicio = async (req, res) => {
  try {
    const exercicio = await Exercicio.findById(req.params.id);
    if (!exercicio) {
      return res.status(404).json({ ok: false, message: "Exercício não encontrado" });
    }
    res.json(exercicio);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Erro ao buscar exercício" });
  }
};

const getExerciciosTreino = async (req, res) => {
  try {
    const exerciciosTreino = await ExercicioTreino.find({ treinoId: req.params.treinoId });
    res.json(exerciciosTreino);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Erro ao buscar exercícios do treino" });
  }
};

const createExercicio = async (req, res) => {
  try {
    const exercicio = await Exercicio.create(req.body);
    res.status(201).json(exercicio);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Erro ao criar exercício" });
  }
};

const updateExercicio = async (req, res) => {
  try {
    const exercicio = await Exercicio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(exercicio);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Erro ao atualizar exercício" });
  }
};

const deleteExercicio = async (req, res) => {
  try {
    const exercicio = await Exercicio.findByIdAndUpdate(req.params.id, {ativo: false}, { new: true });
    res.json({ ok: true, message: "Exercício desativado com sucesso", exercicio });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Erro ao desativar exercício" });
  }
};

const exerciciosControllers = {
  getAllExercicios,
  getExercicio,
  getExerciciosTreino,
  createExercicio,
  updateExercicio,
  deleteExercicio
};

export default exerciciosControllers;