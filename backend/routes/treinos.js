import express from 'express';
import Treinos from '../models/treinos.js';

const routerTreinos = express.Router();

routerTreinos.get('/treinos', async (req, res) => {
    const treinos = await Treinos.find({});
    res.json(treinos);
});

routerTreinos.post('/treinos', async (req, res) => {
    try {
        const { dia, foco, exercicios, ativo } = req.body;
        const treino = await Treinos.create({
            dia,
            foco,
            exercicios,
            ativo
        });
        res.json({ "ok": true, message: "Treino criado com sucesso", treino });
    } catch (error) {
        console.log(error);
        res.json({ "ok": false, message: "Erro ao criar treino" });
    }
});

export default routerTreinos;