import mongoose from 'mongoose';

const serieRealizadaSchema = new mongoose.Schema({
    carga: { type: String, default: "" },
    reps: { type: String, default: "" },
    concluida: { type: Boolean, default: false }
}, { _id: false });

const exercicioExecutadoSchema = new mongoose.Schema({
    exercicioId: { type: String, required: true },
    concluido: { type: Boolean, default: false },
    seriesRealizadas: [serieRealizadaSchema]
}, { _id: false });

const registroTreinoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    planoId: { type: String, required: true },
    dia: { type: String, required: true },
    dataExecucao: { type: String, required: true },
    finalizado: { type: Boolean, default: false },
    exercicios: [exercicioExecutadoSchema]
}, { timestamps: true });

registroTreinoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

const RegistroTreino = mongoose.model('RegistroTreino', registroTreinoSchema);
export default RegistroTreino;