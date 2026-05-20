import RegistroTreino from "../models/historico.js";

const getRegistrosUsuario = async (req, res) => {
    try {
        const { userId } = req.params;
        const registros = await RegistroTreino.find({ userId }).sort({ dataExecucao: -1 });

        const registrosFlat = [];
        for (const registro of registros) {
            for (const ex of registro.exercicios) {
                registrosFlat.push({
                    exercicioId: ex.exercicioId,
                    data: registro.dataExecucao,
                    dia: registro.dia,
                    idPlano: registro.planoId,
                    concluido: ex.concluido,
                    finalizado: registro.finalizado,
                    seriesRealizadas: ex.seriesRealizadas
                });
            }
        }

        res.json(registrosFlat);
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao buscar registros do usuário" });
    }
};


const getProgressoUsuario = async (req, res) => {
    try {
        const { userId } = req.params;
        const registros = await RegistroTreino.find({ userId }).sort({ dataExecucao: 1 });

        const semanaMap = {};
        for (const registro of registros) {
            const dataObj = new Date(registro.dataExecucao + "T00:00:00Z");
            const semanaNum = getWeekNumber(dataObj);

            if (!semanaMap[semanaNum]) {
                semanaMap[semanaNum] = { semana: semanaNum, treinos: [] };
            }

            semanaMap[semanaNum].treinos.push({
                data: registro.dataExecucao,
                dia: registro.dia,
                idPlano: registro.planoId,
                exercicios: registro.exercicios.map(ex => ({
                    id: ex.exercicioId,
                    dia: registro.dia,
                    concluido: ex.concluido,
                    seriesRealizadas: ex.seriesRealizadas
                }))
            });
        }

        const historicoCarga = Object.values(semanaMap).sort((a, b) => a.semana - b.semana);

        res.json({
            userId,
            historico_peso: [],
            historico_carga: historicoCarga
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao buscar progresso do usuário" });
    }
};


const salvarExercicio = async (req, res) => {
    try {
        const { userId } = req.params;
        const { exercicioId, seriesRealizadas, planoId, dia, concluido } = req.body;
        const dataAtual = new Date().toISOString().split("T")[0];

        if (!exercicioId || !planoId || !dia) {
            return res.status(400).json({ ok: false, message: "exercicioId, planoId e dia são obrigatórios" });
        }

        let registro = await RegistroTreino.findOne({
            userId, planoId, dia, dataExecucao: dataAtual, finalizado: false
        });

        if (!registro) {
            registro = new RegistroTreino({
                userId, planoId, dia, dataExecucao: dataAtual, finalizado: false, exercicios: []
            });
        }

        const exIndex = registro.exercicios.findIndex(
            e => String(e.exercicioId) === String(exercicioId)
        );

        const isConcluido = concluido !== undefined
            ? concluido
            : (seriesRealizadas && seriesRealizadas.length > 0 && seriesRealizadas.every(s => s.concluida));

        const dadosExercicio = {
            exercicioId,
            concluido: isConcluido,
            seriesRealizadas: seriesRealizadas || []
        };

        if (exIndex >= 0) {
            registro.exercicios[exIndex] = dadosExercicio;
        } else {
            registro.exercicios.push(dadosExercicio);
        }

        await registro.save();

        res.json({ ok: true, registro });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao salvar exercício" });
    }
};

const finalizarTreino = async (req, res) => {
    try {
        const { userId } = req.params;
        const { planoId, dia } = req.body;
        const dataAtual = new Date().toISOString().split("T")[0];

        if (!planoId || !dia) {
            return res.status(400).json({ ok: false, message: "planoId e dia são obrigatórios" });
        }

        let registro = await RegistroTreino.findOne({
            userId, planoId, dia, dataExecucao: dataAtual, finalizado: false
        });

        if (registro) {
            registro.finalizado = true;
            await registro.save();
        } else {
            registro = await RegistroTreino.create({
                userId, planoId, dia, dataExecucao: dataAtual, finalizado: true, exercicios: []
            });
        }

        res.json({ ok: true, registro });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: "Erro ao finalizar treino" });
    }
};

function getWeekNumber(date) {
    const startOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const diff = date - startOfYear;
    return Math.ceil((diff / (7 * 24 * 60 * 60 * 1000)) + 1);
}

const historicoControllers = {
    getRegistrosUsuario,
    getProgressoUsuario,
    salvarExercicio,
    finalizarTreino
};

export default historicoControllers;
