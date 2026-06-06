import mongoose from 'mongoose';
const { Schema } = mongoose;

const planoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: function () { return this.categoria === 'personalizado'; }
    },
    titulo: {
        type: String,
        required: true
    },
    nivel: {
        type: String,
        enum: ['Iniciante', 'Intermediário', 'Avançado'],
        required: true,
    },
    categoria: {
        type: String,
        enum: ['modelo', 'personalizado'],
        required: true
    },
    rotina: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Treino'
    }],
    ativo: { type: Boolean, default: false }
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