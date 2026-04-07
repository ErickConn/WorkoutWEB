import { calcularConsistencia } from "./consistenciaSemanal";

export function calcularRelatorio(dadosUsuario) {
  const { semanas, cargas, pesos, historico_carga, meta_treinos_semanais } = dadosUsuario;

  // Se não há dados suficientes
  if (!semanas || semanas <= 1) {
    return {
      suficiente: false
    };
  }

  const cargaInicial = cargas[0];
  const cargaAtual = cargas[cargas.length - 1];
  const pesoInicial = pesos[0];
  const pesoAtual = pesos[pesos.length - 1];

  const variacaoForca = (cargaAtual - cargaInicial).toFixed(1);
  const variacaoPercForca = ((cargaAtual - cargaInicial) / cargaInicial * 100).toFixed(1);
  const variacaoPeso = (pesoAtual - pesoInicial).toFixed(1);
  const mediaProgresso = ((cargaAtual - cargaInicial) / semanas).toFixed(1);

  //Calcular consistência semanal
  const consistenciaSemanal = historico_carga.map(semana => {
    const treinosRealizados = semana.treinos.length;
    return {
      semana: semana.semana,
      percentual: calcularConsistencia(treinosRealizados, meta_treinos_semanais)
    };
  });
  // Consistência média geral
  const consistenciaMedia = Math.round(
    consistenciaSemanal.reduce((soma, s) => soma + s.percentual, 0) / consistenciaSemanal.length
  );


  return {
    suficiente: true,
    variacaoForca,
    variacaoPercForca,
    variacaoPeso,
    mediaProgresso,
    consistenciaSemanal,
    consistenciaMedia,
    semanas
  };
}
