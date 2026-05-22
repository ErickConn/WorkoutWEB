import mongoose from "mongoose";
import { ExercicioTreino } from "./exercicios";
const { Schema } = mongoose;

const historicoPesoSchema = new Schema({
  semana: { type: Number, required: true },
  data: { type: String, required: true },
  peso_kg: { type: Number, required: true, min: 1 },
}, { _id: false });

const historicoCargaSchema = new Schema({
  semana: { type: Number, required: true },
  treinos: [{ type: Schema.Types.ObjectId, ref: "Treino", default: [] }], // referência ao modelo Treino
  cargaTotalSemana: { type: Number, min: 0 }, // soma das cargas
  frequenciaSemanal: { type: Number, min: 0 }, // número de treinos concluídos

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