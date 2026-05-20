import mongoose from 'mongoose';
const { Schema } = mongoose;

const exercicioSchema = new Schema({
    nome: { type: String, required: true },
    grupo: { type: String }, // Peito, Costas, Pernas, Ombros, Bíceps, Tríceps...
    equipamento: { type: String }, // Barra, Halteres, Máquina, Peso Corporal...
    categoria: { type: String }, // categoria alternativa (peito, pernas, costas...)
    descricao: { type: String }, // explicação do movimento
    nivel_experiencia: { type: String, enum: ['Iniciante', 'Intermediário', 'Avançado', 'iniciante', 'intermediário', 'avançado'] },
});

exercicioSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

export const Exercicio = mongoose.model('Exercicio', exercicioSchema);
export default Exercicio;