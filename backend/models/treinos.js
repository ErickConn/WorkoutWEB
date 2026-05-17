import mongoose from 'mongoose';
const { Schema } = mongoose;

const treinoSchema = new mongoose.Schema({
    planoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plano',
        required: true
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
            required: true
        },
        numReps: {
            type: Number,
            required: true
        }
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