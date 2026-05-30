import mongoose from 'mongoose';
import Biometria from '../models/biometria.js';
import Usuario from '../models/usuario.js';

const validateEmptyBody = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ ok: false, message: "O corpo da requisição não pode estar vazio" });
    }
    next();
};

const validateBiometriaId = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ ok: false, message: "Formato de ID de biometria inválido" });
    }
    try {
        const biometria = await Biometria.findById(req.params.id);
        if (!biometria) {
            return res.status(404).json({ ok: false, message: "Biometria não encontrada" });
        }
        next();
    } catch (error) {
        res.status(500).json({ ok: false, message: "Erro ao validar a biometria" });
    }
};

const validateBiometriaStructure = (req, res, next) => {
    const { id_usuario, perfil_biometrico, experiencia_usuario, analise_metabolica } = req.body;

    // Se for POST ou PUT (criação ou substituição), id_usuario e perfil_biometrico são obrigatórios
    if (req.method === 'POST') {
        if (!id_usuario) {
            return res.status(400).json({ ok: false, message: "O campo 'id_usuario' é obrigatório" });
        }
        if (!mongoose.Types.ObjectId.isValid(id_usuario)) {
            return res.status(400).json({ ok: false, message: "Formato do 'id_usuario' inválido" });
        }
        if (!perfil_biometrico) {
            return res.status(400).json({ ok: false, message: "O campo 'perfil_biometrico' é obrigatório" });
        }
    }

    if (id_usuario !== undefined && !mongoose.Types.ObjectId.isValid(id_usuario)) {
        return res.status(400).json({ ok: false, message: "Formato do 'id_usuario' inválido" });
    }

    if (perfil_biometrico !== undefined) {
        if (typeof perfil_biometrico !== 'object' || perfil_biometrico === null) {
            return res.status(400).json({ ok: false, message: "O campo 'perfil_biometrico' deve ser um objeto" });
        }

        const { sexo, idade, peso_kg, altura_cm, nivel_atividade } = perfil_biometrico;

        if (sexo !== undefined && !['masculino', 'feminino'].includes(sexo)) {
            return res.status(400).json({ ok: false, message: "O campo 'sexo' deve ser 'masculino' ou 'feminino'" });
        }

        if (idade !== undefined && (typeof idade !== 'number' || idade < 1)) {
            return res.status(400).json({ ok: false, message: "O campo 'idade' deve ser um número maior ou igual a 1" });
        }

        if (peso_kg !== undefined && (typeof peso_kg !== 'number' || peso_kg < 1)) {
            return res.status(400).json({ ok: false, message: "O campo 'peso_kg' deve ser um número maior ou igual a 1" });
        }

        if (altura_cm !== undefined && (typeof altura_cm !== 'number' || altura_cm < 1)) {
            return res.status(400).json({ ok: false, message: "O campo 'altura_cm' deve ser um número maior ou igual a 1" });
        }

        if (nivel_atividade !== undefined && !['sedentario', 'leve', 'moderado', 'intenso', 'muito_intenso'].includes(nivel_atividade)) {
            return res.status(400).json({ ok: false, message: "O campo 'nivel_atividade' inválido" });
        }
    }

    if (experiencia_usuario !== undefined) {
        if (typeof experiencia_usuario !== 'object' || experiencia_usuario === null) {
            return res.status(400).json({ ok: false, message: "O campo 'experiencia_usuario' deve ser um objeto" });
        }

        const { nivel_experiencia, objetivos } = experiencia_usuario;

        if (nivel_experiencia !== undefined && !['iniciante', 'intermediario', 'avancado'].includes(nivel_experiencia)) {
            return res.status(400).json({ ok: false, message: "O campo 'nivel_experiencia' inválido" });
        }

        if (objetivos !== undefined && !Array.isArray(objetivos)) {
            return res.status(400).json({ ok: false, message: "O campo 'objetivos' deve ser uma lista (array) de strings" });
        }
    }

    if (analise_metabolica !== undefined) {
        if (typeof analise_metabolica !== 'object' || analise_metabolica === null) {
            return res.status(400).json({ ok: false, message: "O campo 'analise_metabolica' deve ser um objeto" });
        }

        const { tmb_kcal, gasto_energetico_total_kcal } = analise_metabolica;

        if (tmb_kcal !== undefined && (typeof tmb_kcal !== 'number' || tmb_kcal < 0)) {
            return res.status(400).json({ ok: false, message: "O campo 'tmb_kcal' deve ser um número positivo" });
        }

        if (gasto_energetico_total_kcal !== undefined && (typeof gasto_energetico_total_kcal !== 'number' || gasto_energetico_total_kcal < 0)) {
            return res.status(400).json({ ok: false, message: "O campo 'gasto_energetico_total_kcal' deve ser um número positivo" });
        }
    }

    next();
};

const validateBiometriaOwner = async (req, res, next) => {
    try {
        const biometria = await Biometria.findById(req.params.id);
        if (!biometria) {
            return res.status(404).json({ ok: false, message: "Biometria não encontrada" });
        }
        
        const requester = await Usuario.findById(req.userId);
        if (!requester) {
            return res.status(404).json({ ok: false, message: "Usuário requisitante não encontrado" });
        }
        
        if (String(biometria.id_usuario) === String(req.userId) || requester.role === 'admin') {
            return next();
        }
        
        return res.status(403).json({ ok: false, message: "Você não tem permissão para acessar ou alterar esta biometria" });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "Erro ao verificar autorização da biometria" });
    }
};

const validateBiometriaOwnerOnCreate = async (req, res, next) => {
    try {
        const { id_usuario } = req.body;
        if (!id_usuario) {
            return res.status(400).json({ ok: false, message: "O campo 'id_usuario' é obrigatório" });
        }

        const requester = await Usuario.findById(req.userId);
        if (!requester) {
            return res.status(404).json({ ok: false, message: "Usuário requisitante não encontrado" });
        }

        if (String(id_usuario) === String(req.userId) || requester.role === 'admin') {
            return next();
        }

        return res.status(403).json({ ok: false, message: "Você não tem permissão para cadastrar biometria para outro usuário" });
    } catch (error) {
        return res.status(500).json({ ok: false, message: "Erro ao verificar autorização de criação de biometria" });
    }
};

const biometriaMiddlewares = {
    validateEmptyBody,
    validateBiometriaId,
    validateBiometriaStructure,
    validateBiometriaOwner,
    validateBiometriaOwnerOnCreate
};

export default biometriaMiddlewares;
