import mongoose from 'mongoose';

const biometriaSchema = new mongoose.Schema({
    id_usuario: String,
    perfil_biometrico: {
        sexo: String,
        idade: Number,
        peso_kg: Number,
        altura_cm: Number,
        nivel_atividade: String
    },
    experiencia_usuario: {
        nivel_experiencia: String,
        objetivos: [String]
    },
    analise_metabolica: {
        tmb_kcal: Number,
        gasto_energetico_total_kcal: Number
    }
});

const Biometria = mongoose.model('Biometria', biometriaSchema);

export default Biometria;
