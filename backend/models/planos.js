import mongoose from 'mongoose';
const { Schema } = mongoose;

const planosSchema = new Schema({
    titulo: String,
    nivel: String,
    categoria: String,
    rotina: [{
        type: Schema.Types.ObjectId,
        ref: 'Treino'
    }],
});

const Plano = mongoose.model('Plano', planosSchema);
export default Plano;