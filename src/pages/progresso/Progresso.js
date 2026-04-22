import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgresso } from "../../redux/progresso/slices";
import styles from "./progresso.module.css";
import ProgressChart from "./components/progress-chart";
import ProgressReport from "./components/progress-report";
import ProgressCard from "./components/progress-card";
import OffCanvasNavBar from "../../components/OffCanvasNavBar";

export default function Progresso() {
  const dispatch = useDispatch();
  const { historico, loading, error } = useSelector((state) => state.progressoReducer);

  useEffect(() => {
    dispatch(fetchProgresso());
  }, [dispatch]);

  if (loading) return <p>Carregando dados de progresso...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!historico || !historico.length) return <p>Nenhum dado encontrado.</p>;
  console.log("Estado progresso:", { historico, loading, error });

  // Pegando o usuario exemplo
  const usuario = historico[0];

  // Garante que historico_peso e historico_carga sejam arrays
  const historicoPeso = usuario.historico_peso || [];
  const historicoCarga = usuario.historico_carga || [];

  // Extraindo pesos com segurança
  const pesos = historicoPeso.map((p) => Number(p.peso_kg) || 0);
  
  // Extraindo datas com segurança
  const datas = historicoPeso.map((p) => {
    if (!p.data) return "";
    const [ano, mes, dia] = p.data.split("-");
    return `${dia}/${mes}/${ano}`;
  });

  const cargas = historicoCarga.map((semana) => {
    if (!semana.treinos || !Array.isArray(semana.treinos)) return 0;

    return semana.treinos.reduce((total, treino) => {
      if (!treino.exercicios || !Array.isArray(treino.exercicios)) return total;

      return total + treino.exercicios.reduce((soma, ex) => {
        let cargaDoExercicio = 0;

        // Cenario 1: Formato antigo (ex: carga_kg: 40)
        if (ex.carga_kg !== undefined) {
          cargaDoExercicio = Number(ex.carga_kg) || 0;
        } 
        // Cenario 2: Novo formato (Semana 15+ com seriesRealizadas)
        else if (ex.seriesRealizadas && Array.isArray(ex.seriesRealizadas)) {
          let maiorCarga = 0;
          ex.seriesRealizadas.forEach(serie => {
            const cargaDaSerie = Number(serie.carga) || 0;
            if (cargaDaSerie > maiorCarga) maiorCarga = cargaDaSerie;
          });
          cargaDoExercicio = maiorCarga;
        }

        return soma + cargaDoExercicio;
      }, 0);
    }, 0);
  });
  console.log("Pesos:", pesos, "Cargas:", cargas, "Datas:", datas);
  
  // Peso inicial e atual a partir do array (com fallback para 0 se o array estiver vazio)
  const pesoInicial = pesos.length > 0 ? pesos[0] : 0;
  const pesoAtual = pesos.length > 0 ? pesos[pesos.length - 1] : 0;

  // Carga inicial e atual (com fallback para 0 se o array estiver vazio)
  const cargaInicial = cargas.length > 0 ? cargas[0] : 0;
  const cargaAtual = cargas.length > 0 ? cargas[cargas.length - 1] : 0;

  // Quantidade de treinos realizados na última semana (com segurança)
  const ultimaSemana = historicoCarga.length > 0 ? historicoCarga[historicoCarga.length - 1] : { treinos: [], semana: 0 };
  const numeroTreinos = (ultimaSemana.treinos || []).length;
  const semanaAtual = ultimaSemana.semana || 0;

  // Relatório
  const variacaoForca = (cargaAtual - cargaInicial).toFixed(1);
  const variacaoPeso = (pesoAtual - pesoInicial).toFixed(1);

  return (
    <>
      <OffCanvasNavBar />
      <main>
        <div className={styles.dashboard}>
          {/* Cards */}
          <div className={styles.cards}>
            <ProgressCard
              emoji="🏋️"
              valor={cargaAtual}
              titulo="Carga Total (Kg)"
              variacao={variacaoForca}
              descricao="kg"
            />
            <ProgressCard
              emoji="⚖️"
              valor={pesoAtual}
              titulo="Peso Atual (Kg)"
              variacao={variacaoPeso}
              descricao="kg"
            />
            <ProgressCard
              emoji="🔥"
              valor={`${numeroTreinos} treinos completos`}
              titulo={`na semana ${semanaAtual}`}
            />
          </div>
          {/* Gráfico */}
          <ProgressChart datas={datas} cargas={cargas} pesos={pesos} />
          {/* Relatório */}
          <ProgressReport dadosUsuario={usuario} />
        </div>
      </main>
    </>
  );
}