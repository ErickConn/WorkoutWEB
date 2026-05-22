import mongoose from 'mongoose';
import { ExercicioTreino } from './exercicios';
const usuarioSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    role: String,
    imagem: String,
    activePlanId: String,
    activeDay: String,
    historico_carga: [
        {
            planoId: String,
            dia: String,
            data: String,
            exercicios: [
                ExercicioTreino.schema
            ] 
        }
    ],
    historico_peso: [
        {
            data: String,
            peso_kg: Number
        }
    ]
});

usuarioSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
