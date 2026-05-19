import mongoose from "mongoose";
const { Schema } = mongoose;

const serieSchema = new Schema({
  carga: { type: Number, min: 0 },
  repeticoes: { type: Number, min: 0 },
  concluida: { type: Boolean, default: false },
}, { _id: false });

const exercicioSchema = new Schema({
  id: { type: String, required: true },
  dia: { type: String },
  concluido: { type: Boolean, default: false },
  carga_kg: { type: Number, min: 0 },
  seriesRealizadas: { type: [serieSchema], default: [] },
}, { _id: false });

const treinoSchema = new Schema({
  data: { type: String, required: true },
  dia: { type: String },
  idPlano: { type: String },
  exercicios: { type: [exercicioSchema], default: [] },
}, { _id: false });

const historicoCargaSchema = new Schema({
  semana: { type: Number, required: true },
  treinos: { type: [treinoSchema], default: [] },
}, { _id: false });

const historicoPesoSchema = new Schema({
  data: { type: String, required: true },
  peso_kg: { type: Number, required: true, min: 1 },
}, { _id: false });

const progressoSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  nivel_experiencia: { type: String, enum: ["iniciante", "intermediário", "avançado"] , default: "iniciante" },
  historico_peso: { type: [historicoPesoSchema], default: [] },
  historico_carga: { type: [historicoCargaSchema], default: [] },
}, {
  timestamps: true
});

const Progresso = mongoose.model("Progresso", progressoSchema);
export default Progresso;