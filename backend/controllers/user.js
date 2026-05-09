import Usuario from "../models/usuario.js";

const getAllUser = async (req, res) => {
    try {
        const user = await Usuario.find({});
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao listar user" });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await Usuario.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ ok: false, message: "User nao encontrado" })
        }
        return res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao listar user" })
    }
}

const createUser = async (req, res) => {
    try {
        const user = await Usuario.create(req.body);

        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao criar user" })
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao atualizar user" })
    }
}

const deleteUser = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        return res.json({ ok: true, message: "User deletado" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao deletar user" })
    }
}

const userControllers = {
    getAllUser,
    getUser,
    createUser,
    updateUser,
    deleteUser
}

export default userControllers;
