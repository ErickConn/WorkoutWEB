import mongoose from 'mongoose';
import { exerciciosSchema } from './exercicios.js'
const { Schema } = mongoose;

const rotinaSchema = new Schema({
    dia: String,
    foco: String,
    exercicios: [exerciciosSchema],
    ativo: Boolean
});

const Treinos = mongoose.model('treinos', rotinaSchema);

export default Treinos;
export { rotinaSchema };