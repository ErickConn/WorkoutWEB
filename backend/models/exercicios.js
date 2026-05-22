import mongoose from 'mongoose';
import Treino from './treinos';
const { Schema } = mongoose;

const exercicioSchema = new Schema({
    id: { type: String, required: true },
    nome: { type: String, required: true },
    grupo: { type: String }, // peito, pernas, costas...
    nivel_experiencia: { type: String, enum: ["iniciante", "intermediário", "avançado"] },
});

const serieSchema = new Schema({
    carga: { type: Number, min: 0 },
    reps: { type: Number, required: true, min: 1 },
    concluida: { type: Boolean, default: false },
}, { _id: false });

const exercicioTreinoSchema = new Schema({
    id: { type: String, required: true },
    dia: {type : String, required: true},
    seriesRealizadas: [serieSchema],
    concluido: { type: Boolean, default: false },
}, { _id: false });



export const Exercicio = mongoose.model('Exercicio', exercicioSchema);
export const ExercicioTreino = mongoose.model('ExercicioTreino', exercicioTreinoSchema);