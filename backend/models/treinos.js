import mongoose from 'mongoose';
import { exerciciosSchema } from './exercicios.js'
const { Schema } = mongoose;

const treinoSchema = new Schema({
    dia: String,
    foco: String,
    exercicios: [exerciciosSchema],
}, { strict: false });

export { treinoSchema };