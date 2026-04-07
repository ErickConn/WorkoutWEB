import { calcularConsistencia } from "./consistenciaSemanal";

export function calcularRelatorio(dadosUsuario) {
  const { historico_carga = [], nivel_atividade} = dadosUsuario;
  console.log("dadosUsuario:", dadosUsuario);

  const semanas = historico_carga ? historico_carga.length : 0;
  // Se não há dados suficientes
  if (!semanas || semanas < 2) {
    return {
      suficiente: false
    };
  }
  // Processar dados para cálculo
  const cargas = historico_carga.map(semana =>
    semana.treinos.reduce((total, treino) =>
      total + treino.exercicios.reduce((soma, ex) => soma + ex.carga_kg, 0), 0)
  );
  const pesos = dadosUsuario.historico_peso.map(p => p.peso_kg);

  //Dados especifico para calculo de variação
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
      percentual: calcularConsistencia(treinosRealizados, nivel_atividade)
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
