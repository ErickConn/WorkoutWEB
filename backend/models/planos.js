import mongoose from 'mongoose';
const { Schema } = mongoose;

const planosSchema = new Schema({
    titulo: String,
    nivel: String,
    categoria: String,
    userId: String,
    rotina: [{
        type: Schema.Types.ObjectId,
        ref: 'Treino'
    }],
});

planosSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

const Plano = mongoose.model('Plano', planosSchema);
export default Plano;