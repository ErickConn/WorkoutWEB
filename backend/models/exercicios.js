import mongoose, { Schema } from "mongoose";

const exerciciosSchema = new Schema({
    nome: String,
    grupo: String,
    equipamento: String,
    seriesPadrao: { type: Number, default: 3 },
    repsPadrao: { type: Number, default: 12 },
    dica: String,
    substitutos: [String],
}, { strict: false });

const Exercicios = mongoose.model('Exercicios', exerciciosSchema);

export default Exercicios;
export { exerciciosSchema };