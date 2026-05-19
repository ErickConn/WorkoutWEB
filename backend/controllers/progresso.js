import Progresso from "../models/progresso.js";

const getUserProgress = async (req, res) => {
  try {
    const progresso = await Progresso.findOne({ userId: req.params.userId });
    if (!progresso) {
      return res.status(404).json({ ok: false, message: "Progresso do usuário não encontrado" });
    }
    res.json(progresso);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Erro ao listar progresso do usuário" });
  }
};

const addProgress = async (req, res) => {
  try {
    const { nivel_experiencia, historico_peso, historico_carga } = req.body;

    const progresso = await Progresso.create({
      userId: req.params.userId,
      nivel_experiencia,
      historico_peso: historico_peso || [],
      historico_carga: historico_carga || []
    });

    res.status(201).json(progresso);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Erro ao adicionar progresso do usuário" });
  }
};

const updateProgress = async (req, res) => {
  try {
    const updateData = { ...req.body };

    const progresso = await Progresso.findOneAndUpdate(
      { userId: req.params.userId },
      updateData,
      { new: true, upsert: true }
    );

    res.json(progresso);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Erro ao atualizar progresso do usuário" });
  }
};

const progressoControllers = {
  getUserProgress,
  addProgress,
  updateProgress
};

export default progressoControllers;