import mongoose, { Schema } from "mongoose";

const exerciciosSchema = new Schema({
    nome: String,
});

const Exercicios = mongoose.model('Exercicios', exerciciosSchema);

export default Exercicios;
export { exerciciosSchema };