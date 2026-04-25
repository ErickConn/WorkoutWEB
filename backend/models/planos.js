import mongoose from 'mongoose';
import { rotinaSchema } from './treinos.js';
const { Schema } = mongoose;

const planosSchema = new Schema({
    titulo: String,
    rotina: [rotinaSchema],
    nivel: String,
    categoria: String,
    userId: String,
}, { strict: false });

planosSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret.__v;
        return ret;
    }
});

const Planos = mongoose.model('Planos', planosSchema);

export default Planos;
