import mongoose from "mongoose";
import Usuario from "../models/usuario.js";

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

export const validarProgresso = async (req, res, next) => {
  const { nivel_experiencia, historico_peso, historico_carga } = req.body;
  const { userId } = req.params;

  try {
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ ok: false, message: "Usuário não encontrado" });
    }

    if (nivel_experiencia && !["iniciante", "intermediário", "avançado"].includes(nivel_experiencia)) {
      return res.status(400).json({ ok: false, message: "Nível de experiência inválido" });
    }

    if (historico_peso !== undefined) {
      if (!Array.isArray(historico_peso)) {
        return res.status(400).json({ ok: false, message: "historico_peso deve ser um array" });
      }
      for (const item of historico_peso) {
        if (!isNonEmptyString(item.data) || typeof item.peso_kg !== "number" || item.peso_kg <= 0) {
          return res.status(400).json({ ok: false, message: "historico_peso inválido" });
        }
      }
    }

    if (historico_carga !== undefined) {
      if (!Array.isArray(historico_carga)) {
        return res.status(400).json({ ok: false, message: "historico_carga deve ser um array" });
      }
      for (const semana of historico_carga) {
        if (typeof semana.semana !== "number") {
          return res.status(400).json({ ok: false, message: "semana inválida em historico_carga" });
        }
        if (!Array.isArray(semana.treinos)) {
          return res.status(400).json({ ok: false, message: "treinos inválidos em historico_carga" });
        }
        for (const treino of semana.treinos) {
          if (!isNonEmptyString(treino.data) || !isNonEmptyString(treino.dia)) {
            return res.status(400).json({ ok: false, message: "treino inválido em historico_carga" });
          }
          if (!Array.isArray(treino.exercicios)) {
            return res.status(400).json({ ok: false, message: "exercicios inválidos em treino" });
          }
          /*
          for (const ex of treino.exercicios) {
            if (!isNonEmptyString(ex.id) || typeof ex.concluido !== "boolean") {
              return res.status(400).json({ ok: false, message: "exercicio inválido em treino" });
            }
            if (ex.carga_kg !== undefined && (typeof ex.carga_kg !== "number" || ex.carga_kg < 0)) {
              return res.status(400).json({ ok: false, message: "carga_kg inválida em exercicio" });
            }
            if (ex.seriesRealizadas !== undefined) {
              if (!Array.isArray(ex.seriesRealizadas)) {
                return res.status(400).json({ ok: false, message: "seriesRealizadas inválido" });
              }
              for (const serie of ex.seriesRealizadas) {
                if (typeof serie.carga !== "number" || serie.carga < 0) {
                  return res.status(400).json({ ok: false, message: "serie inválida em seriesRealizadas" });
                }
              }
            }
          }*/
         for (const treinoId of semana.treinos) {
            if (!mongoose.Types.ObjectId.isValid(treinoId)) {
              return res.status(400).json({ ok: false, message: "ID de treino inválido em historico_carga" });
            }
          }
        }
      }
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Erro ao validar progresso" });
  }
};