import Planos from '../models/planos.js';
import Treino from '../models/treinos.js';

const getAllPlanos = async (req, res) => {
    try {
        const userId = req.userId; // populado pelo authenticateToken (pode ser undefined em rotas públicas)

        const filtro = userId
            ? { $or: [{ categoria: 'modelo' }, { categoria: 'personalizado', userId }] }
            : { categoria: 'modelo' };

        const planos = await Planos.find(filtro).populate('rotina').populate('userId', 'nome imagem');
        res.json(planos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao listar planos" });
    }
}

const getPlano = async (req, res) => {
    try {
        // Fix #8: reutiliza req.plano já validado pelo middleware, evitando query duplicada
        const plano = req.plano;

        // Fix #3: verifica privacidade — planos personalizados só são visíveis pelo dono ou admin
        if (plano.categoria === 'personalizado') {
            const ownerId = String(plano.userId?._id || plano.userId || '');
            if (ownerId !== String(req.userId) && req.userRole !== 'admin') {
                return res.status(403).json({ ok: false, message: "Acesso negado: este plano é privado" });
            }
        }

        await plano.populate('rotina');
        await plano.populate({ path: 'userId', select: 'nome imagem' });
        res.json(plano);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao ler plano" });
    }
}

const syncTreinos = async (rotinaInput, planoId) => {
    if (!rotinaInput) return undefined;

    let rotinaIds = [];
    const planoAtual = planoId ? await Planos.findById(planoId) : null;
    const antigosIds = planoAtual ? planoAtual.rotina.map(id => id.toString()) : [];

    for (const treinoData of rotinaInput) {
        const { _id, ...dataToSave } = treinoData;
        dataToSave.planoId = planoId;

        if (dataToSave.exercicios && Array.isArray(dataToSave.exercicios)) {
            dataToSave.exercicios = dataToSave.exercicios.map(ex => ({
                idExercicio: ex.idExercicio || ex.id || ex.exercicioId,
                numSeries: ex.numSeries || ex.seriesPadrao || 1,
                numReps: ex.numReps || ex.repsPadrao || 1,
                // Snapshot: persiste os dados descritivos para manter referência mesmo se o exercício for deletado
                ...(ex.nome && { nome: ex.nome }),
                ...(ex.grupo && { grupo: ex.grupo }),
                ...(ex.equipamento && { equipamento: ex.equipamento }),
                ...(ex.nivel_experiencia && { nivel_experiencia: ex.nivel_experiencia }),
            }));
        }

        if (treinoData._id && antigosIds.includes(treinoData._id.toString())) {
            await Treino.findByIdAndUpdate(treinoData._id, dataToSave);
            rotinaIds.push(treinoData._id);
        } else {
            const novoTreino = await Treino.create(dataToSave);
            rotinaIds.push(novoTreino._id);
        }
    }

    if (planoId) {
        const novosIds = rotinaIds.map(id => id.toString());
        const idsParaRemover = antigosIds.filter(id => !novosIds.includes(id));
        if (idsParaRemover.length > 0) {
            for (const id of idsParaRemover) {
                const isUsedElsewhere = await Planos.exists({ rotina: id, _id: { $ne: planoId } });
                if (!isUsedElsewhere) {
                    await Treino.findByIdAndDelete(id);
                }
            }
        }
    }

    return rotinaIds;
};

const createPlano = async (req, res) => {
    try {
        const { rotina, ...planoData } = req.body;

        // Fix #4: o userId de planos personalizados sempre vem do token — nunca do body
        if (planoData.categoria === 'personalizado') {
            planoData.userId = req.userId;
        }

        const plano = await Planos.create(planoData);

        const rotinaIds = await syncTreinos(rotina, plano._id);
        if (rotinaIds) {
            plano.rotina = rotinaIds;
            await plano.save();
        }

        const planoPopulated = await plano.populate('rotina').then(p => p.populate('userId', 'nome imagem'));

        res.status(201).json(planoPopulated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao criar plano" });
    }
}

const patchPlano = async (req, res) => {
    try {
        const { rotina, ...planoData } = req.body;
        let updateData = { ...planoData };

        if (rotina !== undefined) {
            updateData.rotina = await syncTreinos(rotina, req.params.id);
        }

        const plano = await Planos.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate('rotina').populate('userId', 'nome imagem');

        res.json(plano);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao atualizar plano" });
    }
}

const putPlano = async (req, res) => {
    try {
        const { rotina, ...planoData } = req.body;
        let updateData = { ...planoData };

        if (rotina !== undefined) {
            updateData.rotina = await syncTreinos(rotina, req.params.id);
        }

        const plano = await Planos.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, overwrite: true }
        ).populate('rotina').populate('userId', 'nome imagem');

        res.json(plano);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao atualizar plano" });
    }
}

const deletePlano = async (req, res) => {
    try {
        const plano = await Planos.findByIdAndDelete(req.params.id);

        if (plano.rotina && plano.rotina.length > 0) {
            for (const id of plano.rotina) {
                const isUsedElsewhere = await Planos.exists({ rotina: id, _id: { $ne: plano._id } });
                if (!isUsedElsewhere) {
                    await Treino.findByIdAndDelete(id);
                }
            }
        }

        res.json({ ok: true, message: "Plano deletado com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao deletar plano" });
    }
}


const removerTreinoDaRotina = async (req, res) => {
    try {
        const { id, dia } = req.params;

        // Busca o plano com rotina populada para encontrar o treino pelo campo 'dia'
        const planoPopulado = await Planos.findById(id).populate('rotina');

        if (planoPopulado.rotina.length <= 1) {
            return res.status(400).json({
                ok: false,
                message: "O plano precisa ter pelo menos um treino. Delete o plano inteiro se desejar."
            });
        }

        const treinoParaRemover = planoPopulado.rotina.find(t => String(t.dia) === String(dia));
        if (!treinoParaRemover) {
            return res.status(404).json({ ok: false, message: `Treino com dia '${dia}' não encontrado neste plano` });
        }

        // Remove atomicamente: retira o ID do array do plano e apaga o documento Treino
        await Planos.findByIdAndUpdate(id, { $pull: { rotina: treinoParaRemover._id } });
        const isUsedElsewhere = await Planos.exists({ rotina: treinoParaRemover._id, _id: { $ne: id } });
        if (!isUsedElsewhere) {
            await Treino.findByIdAndDelete(treinoParaRemover._id);
        }

        res.json({ ok: true, message: "Treino removido com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao remover treino do plano" });
    }
};

const planosControllers = {
    getAllPlanos,
    getPlano,
    createPlano,
    patchPlano,
    putPlano,
    deletePlano,
    removerTreinoDaRotina
}

export default planosControllers;