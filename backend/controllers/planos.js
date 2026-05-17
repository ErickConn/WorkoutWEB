import Planos from '../models/planos.js';
import Treino from '../models/treinos.js';

const getAllPlanos = async (req, res) => {
    try {
        const planos = await Planos.find({}).populate('rotina');
        res.json(planos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao listar planos" });
    }
}

const getPlano = async (req, res) => {
    try {
        const plano = await Planos.findById(req.params.id).populate('rotina');
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
                numReps: ex.numReps || ex.repsPadrao || 1
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

        const plano = await Planos.create(planoData);

        const rotinaIds = await syncTreinos(rotina, plano._id);
        if (rotinaIds) {
            plano.rotina = rotinaIds;
            await plano.save();
        }

        const planoPopulated = await plano.populate('rotina');

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
        ).populate('rotina');

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
        ).populate('rotina');

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

const planosControllers = {
    getAllPlanos,
    getPlano,
    createPlano,
    patchPlano,
    putPlano,
    deletePlano
}

export default planosControllers;