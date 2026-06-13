export const validarExercicioBio = (req, res, next) => {
  const { id, nome, grupo, nivel_experiencia, equipamento } = req.body;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ ok: false, message: "ID do exercício inválido" });
  }

  if (!nome || typeof nome !== "string" || nome.trim().length === 0) {
    return res.status(400).json({ ok: false, message: "Nome do exercício é obrigatório" });
  }

  if (grupo && typeof grupo !== "string") {
    return res.status(400).json({ ok: false, message: "Grupo inválido" });
  }

  // Validação do nível de experiência
  const niveisValidos = ["iniciante", "intermediário", "avançado"];
  if (nivel_experiencia && !niveisValidos.includes(nivel_experiencia)) {
    return res.status(400).json({ ok: false, message: "Nível de experiência inválido" });
  }

  // Validação do equipamento
  const equipamentosValidos = ["Barra", "Halteres", "Máquina", "Peso Corporal", "Polia"];
  if (equipamento && !equipamentosValidos.includes(equipamento)) {
    return res.status(400).json({ ok: false, message: "Equipamento inválido" });
  }
  next();
};

export const validarExercicioTreino = (req, res, next) => {
  const { id, dia, seriesRealizadas, concluido } = req.body;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ ok: false, message: "ID do exercício inválido" });
  }
  if (!dia || typeof dia !== "string") {
    return res.status(400).json({ ok: false, message: "Dia do exercício inválido" });
  }
  if (!seriesRealizadas || !Array.isArray(seriesRealizadas)) {
    for (const serie of seriesRealizadas) {
      if (typeof serie.reps !== "number" || serie.reps < 1) {
        return res.status(400).json({ ok: false, message: "Número de repetições inválido" });
      }
      if (serie.carga !== undefined && (typeof serie.carga !== "number" || serie.carga < 0)) {
        return res.status(400).json({ ok: false, message: "Carga inválida" });
      }
      if (serie.concluida !== undefined && typeof serie.concluida !== "boolean") {
        return res.status(400).json({ ok: false, message: "Flag concluída inválida" });
      }
    }
  }
  if (typeof concluido !== "boolean") {
    return res.status(400).json({ ok: false, message: "Conclusão do exercício inválida" });
  }
  next();
};