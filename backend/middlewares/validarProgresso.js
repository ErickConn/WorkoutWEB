import Usuario from "../models/usuario.js";
import Progresso from "../models/progresso.js";

export const validarProgresso = async (req, res, next) => {
  const { idade, altura, pesoInicial, pesoAtual, frequenciaSemanalTreinos, cargaTotalSemana, nivelExperiencia } = req.body;
  const { userId } = req.params;

  try {
    // Verifica se o usuário existe
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ ok: false, message: "Usuário não encontrado" });
    }

    // Validações baseadas no schema de Progresso
    if (idade !== undefined && (typeof idade !== "number" || idade <= 0)) {
      return res.status(400).json({ ok: false, message: "Idade inválida" });
    }

    if (altura !== undefined && (typeof altura !== "number" || altura <= 0)) {
      return res.status(400).json({ ok: false, message: "Altura inválida" });
    }

    if (pesoInicial !== undefined && (typeof pesoInicial !== "number" || pesoInicial <= 0)) {
      return res.status(400).json({ ok: false, message: "Peso inicial inválido" });
    }

    if (pesoAtual !== undefined && (typeof pesoAtual !== "number" || pesoAtual <= 0)) {
      return res.status(400).json({ ok: false, message: "Peso atual inválido" });
    }

    if (frequenciaSemanalTreinos !== undefined && (typeof frequenciaSemanalTreinos !== "number" || frequenciaSemanalTreinos < 0)) {
      return res.status(400).json({ ok: false, message: "Frequência semanal inválida" });
    }

    if (cargaTotalSemana !== undefined && (typeof cargaTotalSemana !== "number" || cargaTotalSemana < 0)) {
      return res.status(400).json({ ok: false, message: "Carga total inválida" });
    }

    if (nivelExperiencia && !["iniciante", "intermediário", "avançado"].includes(nivelExperiencia)) {
      return res.status(400).json({ ok: false, message: "Nível de experiência inválido" });
    }

    // Se tudo estiver ok, segue para o controller
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Erro ao validar progresso" });
  }
};