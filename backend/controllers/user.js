import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";

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
        const { senha, ...userData } = req.body;
        const hashedPassword = await bcrypt.hash(senha, 10);
        const user = await Usuario.create({ ...userData, senha: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao criar user" })
    }
}

const updateUser = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (updateData.senha) {
            updateData.senha = await bcrypt.hash(updateData.senha, 10);
        }
        const user = await Usuario.findByIdAndUpdate(req.params.id, updateData, { new: true });
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

const loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(401).json({ ok: false, message: "Email ou senha incorretos" });
        }
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(401).json({ ok: false, message: "Email ou senha incorretos" });
        }
        return res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao fazer login" });
    }
}

const userControllers = {
    getAllUser,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}

export default userControllers;
