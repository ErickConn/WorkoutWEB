import Planos from '../models/planos.js';

const getAllPlanos = async (req, res) => {
    try {
        const planos = await Planos.find({});
        res.json(planos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao listar planos" });
    }
}

const getPlano = async (req, res) => {
    try {
        const plano = await Planos.findById(req.params.id);
        if (!plano) {
            return res.status(404).json({ ok: false, message: "Plano não encontrado" });
        }
        res.json(plano);
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false, message: "Erro ao ler plano" });
    }
}

const createPlano = async (req, res) => {
    try {
        const plano = await Planos.create(req.body);
        res.status(201).json(plano);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao criar plano" });
    }
}

const patchPlano = async (req, res) => {
    try {
        const plano = await Planos.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!plano) {
            return res.status(404).json({ ok: false, message: "Plano não encontrado" });
        }
        res.json(plano);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao atualizar plano" });
    }
}

const putPlano = async (req, res) => {
    try {
        const plano = await Planos.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, overwrite: true }
        );
        if (!plano) {
            return res.status(404).json({ ok: false, message: "Plano não encontrado" });
        }
        res.json(plano);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao atualizar plano" });
    }
}

const deletePlano = async (req, res) => {
    try {
        const plano = await Planos.findByIdAndDelete(req.params.id);
        if (!plano) {
            return res.status(404).json({ ok: false, message: "Plano não encontrado" });
        }
        res.json({ ok: true, message: "Plano deletado com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao deletar plano" });
    }
}

const planosControllers = {
    getAllPlanos,
    getPlano,
    createPlano,
    patchPlano,
    putPlano,
    deletePlano
}

export default planosControllers;