import mongoose from 'mongoose';
const usuarioSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    role: String,
    imagem: String,
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
