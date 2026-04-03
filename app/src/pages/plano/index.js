import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListaTreinos from "../biblioteca-treino/components/lista-treinos";
import TreinoLivreModal from "../treino-livre";
import styles from "./index.module.css";
import FooterButton from "../../components/FooterButton";
import HeaderBack from "../../components/HeaderBack";
import { salvarPlanoCompleto } from "../../redux/treino/actions";
import { useNavigate } from "react-router-dom";

export default function PaginaPlano() {
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);
  const [nomePlano, setNomePlano] = useState("");
  
  const dispatch = useDispatch();
  const { planoEmEdicao } = useSelector(state => state.treinoReducer);

  const cardTemporario = planoEmEdicao.rotina.length > 0 ? [{
    id: 'temp-preview',
    titulo: nomePlano,
    rotina: planoEmEdicao.rotina,
    isPreview: true,
    isCustom: true
}] : [];

  const salvarPlanoFinal = () => {
  if (!nomePlano.trim()) {
    alert("Por favor, dê um nome ao plano!");
    return;
  }

  const planoCompleto = {
    ...cardTemporario[0],
    isPreview: false, 
    categoria: 'personalizado'
  };

  dispatch(salvarPlanoCompleto(planoCompleto))
  .then(()=>{
    navigate("/biblioteca-treino");
  });

  setNomePlano("");

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
        <button onClick={() => setModalAberto(true)}>
          + Adicionar Treino à Rotina (Treino {String.fromCharCode(65 + planoEmEdicao.rotina.length)})
        </button>
      </section>

      {planoEmEdicao.rotina.length > 0 && (
        <div className={styles.previewSection}>
          <ListaTreinos titulo="Novo Plano" dados={cardTemporario} />
          
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