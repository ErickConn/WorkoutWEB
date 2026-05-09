import mongoose from 'mongoose';
const { Schema } = mongoose;

const treinoSchema = new Schema({
    foco: String,
    dia: String,
    exercicios: [{
        exercicioId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Exercicio', 
            required: false 
        },
        id: String,
        nome: String,
        grupo: String,
        seriesPadrao: Number,
        repsPadrao: Schema.Types.Mixed
    }],
});

treinoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

const Treino = mongoose.model('Treino', treinoSchema);
export default Treino;