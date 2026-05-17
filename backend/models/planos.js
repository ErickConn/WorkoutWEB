import mongoose from 'mongoose';
const { Schema } = mongoose;

const planoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    nivel: {
        type: String,
        enum: ['iniciante', 'intermediario', 'avancado', 'Iniciante', 'Intermediário', 'Avançado'],
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    rotina: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Treino'
    }]
}, { timestamps: true });

planoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

const Plano = mongoose.model('Plano', planoSchema);
export default Plano;