export function calcularRelatorio(dadosUsuario) {
  const { semanas, cargas, pesos } = dadosUsuario;

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
  const consistencia = Math.round((semanas - 1) / semanas * 100);

  return {
    suficiente: true,
    variacaoForca,
    variacaoPercForca,
    variacaoPeso,
    mediaProgresso,
    consistencia,
    semanas
  };
}
