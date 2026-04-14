import { calcularConsistencia } from "./consistenciaSemanal";

export function calcularRelatorio(dadosUsuario) {
  const { historico_carga = [], historico_peso = [], nivel_atividade } = dadosUsuario;
  console.log("dadosUsuario:", dadosUsuario);

  const semanas = historico_carga.length;
  
  // Se não há dados suficientes para gerar comparação
  if (semanas < 2) {
    return {
      suficiente: false
    };
  }

  // Processar dados para cálculo (Ignorando séries soltas/sujas da API)
  const cargas = historico_carga.map(semana => {
    if (!semana.treinos || !Array.isArray(semana.treinos)) return 0;
    
    return semana.treinos.reduce((total, treino) => {
      if (!treino.exercicios || !Array.isArray(treino.exercicios)) return total;
      
      return total + treino.exercicios.reduce((soma, ex) => {
        let cargaDoExercicio = 0;

        // Cenario 1: Formato antigo (Semanas 1 a 14) -> ex: { carga_kg: 40 }
        if (ex.carga_kg !== undefined) {
          cargaDoExercicio = Number(ex.carga_kg) || 0;
        } 
        // Cenario 2: Novo formato oficial agrupado (Semana 15+) -> ex: { seriesRealizadas: [{ carga: "13" }] }
        else if (ex.seriesRealizadas && Array.isArray(ex.seriesRealizadas)) {
          let maiorCarga = 0;
          ex.seriesRealizadas.forEach(serie => {
            const cargaDaSerie = Number(serie.carga) || 0;
            // Pega apenas a maior carga levantada na série para contabilizar como a carga do exercício
            if (cargaDaSerie > maiorCarga) maiorCarga = cargaDaSerie;
          });
          cargaDoExercicio = maiorCarga; 
        }
        
        // Tudo que não cair nos dois cenários acima (como as séries soltas: { carga: "123123" }) 
        // será automaticamente ignorado, mantendo a cargaDoExercicio em 0.

        return soma + cargaDoExercicio;
      }, 0);
    }, 0);
  });

  // Extração segura dos Pesos
  const pesos = historico_peso.map(p => Number(p.peso_kg) || 0);

  // Dados específicos para cálculo de variação com fallbacks para 0
  const cargaInicial = cargas[0] || 0;
  const cargaAtual = cargas[cargas.length - 1] || 0;
  const pesoInicial = pesos.length > 0 ? pesos[0] : 0;
  const pesoAtual = pesos.length > 0 ? pesos[pesos.length - 1] : 0;

  // Cálculos base de variação
  const variacaoForcaRaw = cargaAtual - cargaInicial;
  const variacaoForca = variacaoForcaRaw.toFixed(1);
  
  // Prevenção de divisão por zero na Porcentagem
  let variacaoPercForcaRaw = 0;
  if (cargaInicial > 0) {
    variacaoPercForcaRaw = (variacaoForcaRaw / cargaInicial) * 100;
  } else if (cargaInicial === 0 && cargaAtual > 0) {
    variacaoPercForcaRaw = 100; // Se começou no 0 e foi para > 0, consideramos 100% de aumento
  }
  const variacaoPercForca = variacaoPercForcaRaw.toFixed(1);

  // Variação de Peso
  const variacaoPeso = (pesoAtual - pesoInicial).toFixed(1);
  
  // Média de progresso: garante que não dividirá por zero
  const mediaProgresso = semanas > 0 ? (variacaoForcaRaw / semanas).toFixed(1) : "0.0";

  // Calcular consistência semanal com segurança de propriedades
  const consistenciaSemanal = historico_carga.map(semana => {
    const treinosRealizados = (semana.treinos && Array.isArray(semana.treinos)) ? semana.treinos.length : 0;
    return {
      semana: semana.semana || 0,
      percentual: calcularConsistencia(treinosRealizados, nivel_atividade)
    };
  });

  // Consistência média geral
  const consistenciaMedia = consistenciaSemanal.length > 0 
    ? Math.round(consistenciaSemanal.reduce((soma, s) => soma + (Number(s.percentual) || 0), 0) / consistenciaSemanal.length)
    : 0;

  // Retorno blindado contra NaN
  return {
    suficiente: true,
    variacaoForca: isNaN(variacaoForca) ? "0.0" : variacaoForca,
    variacaoPercForca: isNaN(variacaoPercForca) ? "0.0" : variacaoPercForca,
    variacaoPeso: isNaN(variacaoPeso) ? "0.0" : variacaoPeso,
    mediaProgresso: isNaN(mediaProgresso) ? "0.0" : mediaProgresso,
    consistenciaSemanal,
    consistenciaMedia: isNaN(consistenciaMedia) ? 0 : consistenciaMedia,
    semanas
  };
}