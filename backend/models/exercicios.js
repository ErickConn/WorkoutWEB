import mongoose from 'mongoose';
const { Schema } = mongoose;

const exercicioSchema = new Schema({
    nome: { type: String, required: true },
});

export const Exercicio = mongoose.model('Exercicio', exercicioSchema);