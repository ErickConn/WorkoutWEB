import mongoose from 'mongoose';

const biometriaSchema = new mongoose.Schema({
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    perfil_biometrico: {
        sexo: { type: String, enum: ['masculino', 'feminino'] },
        idade: { type: Number, min: 1 },
        peso_kg: { type: Number, min: 1 },
        altura_cm: { type: Number, min: 1 },
        nivel_atividade: { type: String, enum: ['sedentario', 'leve', 'moderado', 'intenso', 'muito_intenso'] }
    },
    experiencia_usuario: {
        nivel_experiencia: { type: String, enum: ['iniciante', 'intermediario', 'avançado'] },
        objetivos: [String]
    },
    analise_metabolica: {
        tmb_kcal: { type: Number, min: 0 },
        gasto_energetico_total_kcal: { type: Number, min: 0 }
    }
});

biometriaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

const Biometria = mongoose.model('Biometria', biometriaSchema);

export default Biometria;
