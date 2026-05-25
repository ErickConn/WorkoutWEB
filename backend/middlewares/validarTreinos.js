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

const validateTreinoStructure = (req, res, next) => {
    const { foco, dia, exercicios } = req.body;

    if (foco !== undefined && typeof foco !== 'string') {
        return res.status(400).json({ ok: false, message: "O campo 'foco' deve ser do tipo texto (string)" });
    }

    if (dia !== undefined && typeof dia !== 'string') {
        return res.status(400).json({ ok: false, message: "O campo 'dia' deve ser do tipo texto (string)" });
    }

    if (exercicios !== undefined) {
        if (!Array.isArray(exercicios)) {
            return res.status(400).json({ ok: false, message: "O campo 'exercicios' deve ser um array" });
        }

        for (let i = 0; i < exercicios.length; i++) {
            const ex = exercicios[i];
            const exId = ex.idExercicio || ex.id || ex.exercicioId;
            if (!exId) {
                return res.status(400).json({ ok: false, message: `O exercício no índice ${i} deve conter um identificador ('idExercicio')` });
            }
            if (ex.numSeries !== undefined && (typeof ex.numSeries !== 'number' || ex.numSeries < 1)) {
                return res.status(400).json({ ok: false, message: `O exercício no índice ${i}: 'numSeries' deve ser um número >= 1` });
            }
            if (ex.numReps !== undefined && (typeof ex.numReps !== 'number' || ex.numReps < 1)) {
                return res.status(400).json({ ok: false, message: `O exercício no índice ${i}: 'numReps' deve ser um número >= 1` });
            }
        }
    }

    next();
};

const treinosMiddlewares = {
    validateEmptyBody,
    validateTreinoId,
    validateTreinoStructure
};

const treinosMiddlewares = {
    validateEmptyBody,
    validateTreinoId,
    validateTreinoStructure
};

export default treinosMiddlewares;