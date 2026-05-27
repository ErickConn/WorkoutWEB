import mongoose from 'mongoose';
const { Schema } = mongoose;

const exercicioSchema = new Schema({
    id: { type: String, required: true },
    nome: { type: String, required: true },
    grupo: { type: String }, // peito, pernas, costas...
    nivel_experiencia: { type: String, enum: ['Iniciante', 'Intermediário', 'Avançado', 'iniciante', 'intermediário', 'avançado'] },
    equipamento: { type: String, enum: ['Barra', 'Halteres', 'Máquina', 'Peso Corporal', 'Polia', 'barra', 'halteres', 'máquina', 'polia', 'peso corporal'] }, 
    categoria: { type: String }, // categoria alternativa (peito, pernas, costas...)
    descricao: { type: String }, // explicação do movimento
});

const serieSchema = new Schema({
    carga: { type: Number, min: 0 },
    reps: { type: Number, required: true, min: 1 },
    concluida: { type: Boolean, default: false },
}, { _id: false });

const exercicioTreinoSchema = new Schema({
    id: { type: String, required: true },
    dia: {type : String, required: true},
    seriesRealizadas: [serieSchema],
    concluido: { type: Boolean, default: false },
}, { _id: false });


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
export const ExercicioTreino = mongoose.model('ExercicioTreino', exercicioTreinoSchema);
