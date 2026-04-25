const validateEmptyBody = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ ok: false, message: "O corpo da requisição não pode estar vazio" });
    }
    next();
};

const validatePlanoTitle = (req, res, next) => {
    if (!req.body.titulo || typeof req.body.titulo !== 'string') {
        return res.status(400).json({ ok: false, message: "O título do plano é obrigatório e deve ser do tipo texto (string)" });
    }
    next();
};

const validatePlanoStructure = (req, res, next) => {
    const { nivel, categoria, rotina } = req.body;

    if (nivel !== undefined && typeof nivel !== 'string') {
        return res.status(400).json({ ok: false, message: "O campo 'nivel' deve ser do tipo texto (string)" });
    }

    if (categoria !== undefined && typeof categoria !== 'string') {
        return res.status(400).json({ ok: false, message: "O campo 'categoria' deve ser do tipo texto (string)" });
    }

    if (rotina !== undefined && !Array.isArray(rotina)) {
        return res.status(400).json({ ok: false, message: "O campo 'rotina' deve ser uma lista (array) de treinos" });
    }

    if (Array.isArray(rotina)) {
        for (let i = 0; i < rotina.length; i++) {
            const treino = rotina[i];
            if (!treino.dia || typeof treino.dia !== 'string') {
                return res.status(400).json({ ok: false, message: `O treino no índice ${i} deve conter um 'dia' válido` });
            }

            if (treino.exercicios !== undefined && !Array.isArray(treino.exercicios)) {
                return res.status(400).json({ ok: false, message: `Os exercícios do treino no índice ${i} devem ser um array` });
            }

            if (Array.isArray(treino.exercicios)) {
                for (let j = 0; j < treino.exercicios.length; j++) {
                    const exercicio = treino.exercicios[j];
                    if (!exercicio.nome || typeof exercicio.nome !== 'string') {
                        return res.status(400).json({ ok: false, message: `O exercício no índice ${j} do treino ${i} deve conter um 'nome' válido` });
                    }
                }
            }
        }
    }
    next();
};

const planosMiddleware = {
    validateEmptyBody,
    validatePlanoTitle,
    validatePlanoStructure
};

export default planosMiddleware;