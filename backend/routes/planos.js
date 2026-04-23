import express from 'express';
import Planos from '../models/planos.js';

const routerPlanos = express.Router();

routerPlanos.get('/planos', async (req, res) => {
    const planos = await Planos.find({});
    res.json(planos);
});

routerPlanos.post('/planos', async (req, res) => {
    try {
        const { nome, descricao, treinos, ativo } = req.body;
        const plano = await Planos.create({
            nome,
            descricao,
            treinos,
            ativo
        });
        res.json({ "ok": true, message: "Plano criado com sucesso", plano });
    } catch (error) {
        console.log(error);
        res.json({ "ok": false, message: "Erro ao criar plano" });
    }
});

export default routerPlanos;