import Treino from '../models/treinos.js';
import Planos from '../models/planos.js';

const getAllTreinos = async (req, res) => {
    try {
        const treinos = await Treino.find({});
        res.json(treinos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao listar treinos" });
    }
}

const getTreino = async (req, res) => {
    try {
        const treino = await Treino.findById(req.params.id);
        res.json(treino);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao ler treino" });
    }
}

const createTreino = async (req, res) => {
    try {
        const treino = await Treino.create(req.body);
        res.status(201).json(treino);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao criar treino" });
    }
}

const patchTreino = async (req, res) => {
    try {
        const treino = await Treino.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(treino);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao atualizar treino" });
    }
}

const putTreino = async (req, res) => {
    try {
        const treino = await Treino.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, overwrite: true }
        );
        res.json(treino);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao atualizar treino" });
    }
}

const deleteTreino = async (req, res) => {
    try {
        const treino = await Treino.findByIdAndDelete(req.params.id);
        if (!treino) {
            return res.status(404).json({ ok: false, message: "Treino não encontrado" });
        }
        // Fix #9: remove a referência órfã do array rotina do plano pai
        await Planos.updateMany({ rotina: req.params.id }, { $pull: { rotina: req.params.id } });
        res.json({ ok: true, message: "Treino deletado com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao deletar treino" });
    }
}

const treinosControllers = {
    getAllTreinos,
    getTreino,
    createTreino,
    patchTreino,
    putTreino,
    deleteTreino
}

export default treinosControllers;
