import Progresso from "../models/progresso.js";

const getUserProgress = async (req, res) => {
  try {
    const progresso = await Progresso.find({ userId: req.params.userId });
    res.json(progresso);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Erro ao listar progresso" });
  }
};

const addProgress = async (req, res) => {
  try {
    const { pesoInicial, pesoAtual, frequenciaSemanalTreinos, cargaTotalSemana, idade, altura, nivelExperiencia } = req.body;

    const variacaoPeso = pesoAtual && pesoInicial ? pesoAtual - pesoInicial : null;

    const progresso = await Progresso.create({
      userId: req.params.userId,
      idade,
      altura,
      pesoInicial,
      pesoAtual,
      nivelExperiencia,
      variacaoPeso,
      frequenciaSemanalTreinos,
      cargaTotalSemana
    });

    res.status(201).json(progresso);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Erro ao adicionar progresso" });
  }
};

const updateProgress = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.pesoAtual && updateData.pesoInicial) {
      updateData.variacaoPeso = updateData.pesoAtual - updateData.pesoInicial;
    }

    const progresso = await Progresso.findByIdAndUpdate(req.params.progressId, updateData, { new: true });
    res.json(progresso);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Erro ao atualizar progresso" });
  }
};

const progressoControllers = {
  getUserProgress,
  addProgress,
  updateProgress
};

export default progressoControllers;