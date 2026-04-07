export function calcularConsistencia(treinosRealizados, metaTreinosSemana) {
  if (!metaTreinosSemana || metaTreinosSemana === 0) return 0;
  const percentual = (treinosRealizados / metaTreinosSemana) * 100;
  return Math.min(100, Math.round(percentual)); // nunca passa de 100%
}