import mongoose from 'mongoose';
const { Schema } = mongoose;

const treinoSchema = new mongoose.Schema({
    planoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plano'
    },
    foco: {
        type: String,
        required: true
    },
    dia: {
        type: String,
        required: true
    },
    exercicios: [{
        idExercicio: {
            type: String,
            required: true
        },
        numSeries: {
            type: Number,
            required: true,
            min: 1
        },
        numReps: {
            type: Number,
            required: true,
            min: 1
        },
        // Snapshot dos dados do exercício no momento em que foi adicionado ao plano.
        // Mantém a referência mesmo se o exercício for removido do catálogo.
        nome: { type: String },
        grupo: { type: String },
        equipamento: { type: String },
        nivel_experiencia: { type: String },
    }]
}, { timestamps: true });

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