import mongoose from 'mongoose';
const { Schema } = mongoose;

const exercicioSchema = new Schema({
    nome: { type: String, required: true },
    categoria: { type: String }, // peito, pernas, costas...
    descricao: { type: String }, // explicação do movimento
    dificuldade: { type: String, enum: ["iniciante", "intermediário", "avançado"] },
});

export const Exercicio = mongoose.model('Exercicio', exercicioSchema);