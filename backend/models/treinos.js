import mongoose from 'mongoose';
const { Schema } = mongoose;

const rotinaSchema = new Schema({
    dia: String,
    foco: String,
    exercicios: [exercicioSchema],
    ativo: Boolean
});

const Treinos = mongoose.model('treinos', rotinaSchema);

export default Treinos;