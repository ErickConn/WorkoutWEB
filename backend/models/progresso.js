import mongoose from "mongoose";
const { Schema } = mongoose;

const progressoSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    data: { type: Date, default: Date.now },

    // Dados básicos
    idade: { type: Number, min: 1 },
    altura: { type: Number, min: 1 }, // em cm
    pesoInicial: { type: Number, min: 1 }, // informado no cadastro
    pesoAtual: { type: Number, min: 1 }, // atualizado ao longo do tempo
    nivelExperiencia: { type: String, enum: ["iniciante", "intermediário", "avançado"] },

    // Métricas de progresso - melhorar depois
    variacaoPeso: { type: Number }, // diferença entre pesoAtual e pesoInicial
    frequenciaSemanalTreinos: { type: Number, min: 0 }, // quantos treinos na semana
    cargaTotalSemana: { type: Number, min: 0 }, // soma dos pesos levantados nos exercícios

    // opcional: vincular ao plano ativo do usuário
    planoId: { type: String },
    diaTreino: { type: String }

});

const Progresso = mongoose.model("Progresso", progressoSchema);
export default Progresso;