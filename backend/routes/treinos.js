import express from 'express';
import Treinos from '../models/treinos.js';

const routerTreinos = express.Router();

routerTreinos.get('/treinos', async (req, res) => {
    try {
        const treinos = await Treinos.find({});
        res.json(treinos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao listar treinos" });
    }
});

routerTreinos.get('/treinos/:id', async (req, res) => {
    try {
        const treino = await Treinos.findById(req.params.id);
        if (!treino) {
            return res.status(404).json({ ok: false, message: "Treino não encontrado" });
        }
        res.json(treino);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao ler treino" });
    }
});

routerTreinos.post('/treinos', async (req, res) => {
    try {
        const treino = await Treinos.create(req.body);
        res.status(201).json(treino);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao criar treino" });
    }
});

routerTreinos.patch('/treinos/:id', async (req, res) => {
    try {
        const treino = await Treinos.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!treino) {
            return res.status(404).json({ ok: false, message: "Treino não encontrado" });
        }
        res.json(treino);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao atualizar treino" });
    }
});

routerTreinos.put('/treinos/:id', async (req, res) => {
    try {
        const treino = await Treinos.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, overwrite: true }
        );
        if (!treino) {
            return res.status(404).json({ ok: false, message: "Treino não encontrado" });
        }
        res.json(treino);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao atualizar treino" });
    }
});

routerTreinos.delete('/treinos/:id', async (req, res) => {
    try {
        const treino = await Treinos.findByIdAndDelete(req.params.id);
        if (!treino) {
            return res.status(404).json({ ok: false, message: "Treino não encontrado" });
        }
        res.json({ ok: true, message: "Treino deletado com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao deletar treino" });
    }
});

export default routerTreinos;