import Biometria from "../models/biometria.js";

const getAllBiometria = async (req, res) => {
    try {
        const biometria = await Biometria.find({});
        res.json(biometria);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao listar biometria" });
    }
}

const getBiometria = async (req, res) => {
    try {
        const biometria = await Biometria.findById(req.params.id);
        if (!biometria) {
            return res.status(404).json({ ok: false, message: "Biometria não encontrada" });
        }
        res.json(biometria);
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false, message: "Erro ao ler biometria" });
    }
}

const createBiometria = async (req, res) => {
    try {
        const biometria = await Biometria.create(req.body);
        res.status(201).json(biometria);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao criar biometria" });
    }
}

const patchBiometria = async (req, res) => {
    try {
        const biometria = await Biometria.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!biometria) {
            return res.status(404).json({ ok: false, message: "Biometria não encontrada" });
        }
        res.json(biometria);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao atualizar biometria" });
    }
}

const putBiometria = async (req, res) => {
    try {
        const biometria = await Biometria.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, overwrite: true }
        );
        if (!biometria) {
            return res.status(404).json({ ok: false, message: "Biometria não encontrada" });
        }
        res.json(biometria);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao atualizar biometria" });
    }
}

const deleteBiometria = async (req, res) => {
    try {
        const biometria = await Biometria.findByIdAndDelete(req.params.id);
        if (!biometria) {
            return res.status(404).json({ ok: false, message: "Biometria não encontrada" });
        }
        res.json({ ok: true, message: "Biometria deletada com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao deletar biometria" });
    }
}

const biometriasControllers = {
    getAllBiometria,
    getBiometria,
    createBiometria,
    patchBiometria,
    putBiometria,
    deleteBiometria
}

export default biometriasControllers;