import mongoose from 'mongoose';
import Usuario from '../models/usuario.js';

const validateEmptyBody = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ ok: false, message: "O corpo da requisição não pode estar vazio" });
    }
    next();
};

const validateUserId = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ ok: false, message: "Formato de ID de usuário inválido" });
    }
    try {
        const user = await Usuario.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ ok: false, message: "Usuário não encontrado" });
        }
        next();
    } catch (error) {
        res.status(500).json({ ok: false, message: "Erro ao validar o ID do usuário" });
    }
};

const validateUserOwner = (req, res, next) => {
    if (String(req.userId) === String(req.params.id) || req.userRole === 'admin') {
        return next();
    }
    return res.status(403).json({ ok: false, message: "Acesso negado: você só pode acessar, alterar ou excluir seus próprios dados de conta." });
};

const validateUserStructure = (req, res, next) => {
    const { nome, email, senha, role, imagem } = req.body;

    // Se for criação (POST), os campos básicos são obrigatórios
    if (req.method === 'POST') {
        if (!nome || typeof nome !== 'string' || nome.trim() === '') {
            return res.status(400).json({ ok: false, message: "O campo 'nome' é obrigatório e deve ser texto" });
        }
        if (!email || typeof email !== 'string' || email.trim() === '') {
            return res.status(400).json({ ok: false, message: "O campo 'email' é obrigatório e deve ser texto" });
        }
        if (!senha || typeof senha !== 'string' || senha.trim() === '') {
            return res.status(400).json({ ok: false, message: "O campo 'senha' é obrigatório e deve ser texto" });
        }
    }

    if (nome !== undefined && (typeof nome !== 'string' || nome.trim() === '')) {
        return res.status(400).json({ ok: false, message: "O campo 'nome' deve ser um texto válido" });
    }

    if (email !== undefined) {
        if (typeof email !== 'string' || email.trim() === '') {
            return res.status(400).json({ ok: false, message: "O campo 'email' deve ser um texto válido" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ ok: false, message: "Formato de e-mail inválido" });
        }
    }

    if (senha !== undefined && (typeof senha !== 'string' || senha.trim() === '')) {
        return res.status(400).json({ ok: false, message: "O campo 'senha' deve ser um texto válido" });
    }

    if (role !== undefined && !['admin', 'aluno'].includes(role)) {
        return res.status(400).json({ ok: false, message: "O campo 'role' deve ser 'admin' ou 'aluno'" });
    }

    if (imagem !== undefined && typeof imagem !== 'string') {
        return res.status(400).json({ ok: false, message: "O campo 'imagem' deve ser do tipo texto (Base64)" });
    }

    next();
};

const userMiddlewares = {
    validateEmptyBody,
    validateUserId,
    validateUserOwner,
    validateUserStructure
};

export default userMiddlewares;
