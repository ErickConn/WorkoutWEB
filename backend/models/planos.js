import mongoose from 'mongoose';
import { rotinaSchema } from './treinos.js';
const { Schema } = mongoose;

const planosSchema = new Schema({
    titulo: String,
    rotina: [rotinaSchema],
    isPreview: Boolean,
    ativo: Boolean,
    isCustom: Boolean,
    nivel: String,
    categoria: String,
    userId: String,
});

const Planos = mongoose.model('Planos', planosSchema);

export default Planos;
