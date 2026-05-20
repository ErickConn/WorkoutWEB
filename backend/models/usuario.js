import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    role: { type: String, enum: ['admin', 'aluno'], default: 'aluno' },
    imagem: { type: String },
    activePlanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plano', default: null },
    activeDay: { type: String, default: null }
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
