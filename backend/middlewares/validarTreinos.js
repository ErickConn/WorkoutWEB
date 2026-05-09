import mongoose from 'mongoose';
import Treino from '../models/treinos.js';

const validateEmptyBody = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ ok: false, message: "O corpo da requisição não pode estar vazio" });
    }
    next();
};

const validateTreinoId = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ ok: false, message: "Formato de ID inválido" });
    }
    try {
        const treino = await Treino.findById(req.params.id);
        if (!treino) {
            return res.status(404).json({ ok: false, message: "Treino não encontrado" });
        }
        next();
    } catch (error) {
        res.status(500).json({ ok: false, message: "Erro ao validar o treino" });
    }
};

const treinosMiddlewares = {
    validateEmptyBody,
    validateTreinoId
};

export default treinosMiddlewares;
