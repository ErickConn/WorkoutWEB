import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListaTreinos from "../biblioteca-treino/components/lista-treinos";
import TreinoLivreModal from "../treino-livre";
import styles from "./index.module.css";
import FooterButton from "../../components/FooterButton";
import HeaderBack from "../../components/HeaderBack";
import { salvarPlanoCompleto } from "../../redux/planos/slices";
import { useNavigate } from "react-router-dom";

export default function PaginaPlano() {
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);
  const [nomePlano, setNomePlano] = useState("");
  const [nivelPlano, setNivelPlano] = useState("");
  const [categoriaPlano, setCategoriaPlano] = useState("");
  
  const dispatch = useDispatch();
  const { planoEmEdicao } = useSelector(state => state.treinosReducer);

  const cardTemporario = planoEmEdicao.rotina.length > 0 ? [{
    id: 'temp-preview',
    titulo: nomePlano,
    rotina: planoEmEdicao.rotina,
    isPreview: true,
    ativo: false,
    isCustom: true
}] : [];

  const salvarPlanoFinal = () => {
  if (!nomePlano.trim()) {
    alert("Por favor, dê um nome ao plano!");
    return;
  }
  if (!nivelPlano) {
    alert("Por favor, selecione o nível do plano!");
    return;
  }
  if (!categoriaPlano) {
    alert("Por favor, selecione a categoria do plano!");
    return;
  }

  const planoCompleto = {
    ...cardTemporario[0],
    isPreview: false,
    nivel: nivelPlano,
    categoria: categoriaPlano,
    rotina: cardTemporario[0].rotina.map((treino) => ({
      ...treino,
      exercicios: treino.exercicios.map(({ series, repeticoes, ...exRest }) => ({
        ...exRest,
        seriesPadrao: series ?? exRest.seriesPadrao ?? 3,
        repsPadrao: repeticoes ?? exRest.repsPadrao ?? 12
      }))
    }))
  };

  dispatch(salvarPlanoCompleto(planoCompleto))
  .then(()=>{
    setNomePlano("");
    setNivelPlano("");
    setCategoriaPlano("");
    navigate("/biblioteca-treino");
  })
  .catch((err) => {
    console.error("Erro ao salvar plano:", err);
    alert("Erro ao salvar o plano. Tente novamente.");
  });

};

  return (
    <>
    <HeaderBack title="Crie seu Plano Personalizado" subtitle="Com seus próprios treinos!"></HeaderBack>
    <div className={styles.container}>
      <section className={styles.configInicial}>
        <div className={styles.inputGroup}>
    <label>Nome do Plano</label>
    <input 
      type="text"
      placeholder="Ex: Minha Rotina Hipertrofia"
      value={nomePlano}
      onChange={(e) => setNomePlano(e.target.value)}
      className={styles.inputNome}
    />
  </div>
        <div className={styles.inputGroup}>
          <label>Nível do Plano</label>
          <select 
            value={nivelPlano}
            onChange={(e) => setNivelPlano(e.target.value)}
            className={styles.inputNome}
          >
            <option value="">Selecione o nível</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label>Categoria do Plano</label>
          <select 
            value={categoriaPlano}
            onChange={(e) => setCategoriaPlano(e.target.value)}
            className={styles.inputNome}
          >
            <option value="">Selecione a categoria</option>
            <option value="modelo">modelo (visível para todos)</option>
            <option value="personalizado">personalizado (só para você)</option>
          </select>
        </div>
        <button onClick={() => setModalAberto(true)}>
          + Adicionar Treino à Rotina (Treino {String.fromCharCode(65 + planoEmEdicao.rotina.length)})
        </button>
      </section>

      {planoEmEdicao.rotina.length > 0 && (
        <div className={styles.previewSection}>
          <ListaTreinos dados={cardTemporario} />
          
         <FooterButton title="Salvar Plano Personalizado" onClick={salvarPlanoFinal}></FooterButton>
        </div>
      )}

      <TreinoLivreModal 
        show={modalAberto} 
        handleClose={() => setModalAberto(false)} 
      />
    </div>
    </>
  );
}