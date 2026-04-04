import React, { useState } from 'react';
import styles from '../index.module.css';
import { Link } from 'react-router-dom';
import { removerPlano, removerTreinoDaRotinaEdicao, removerTreinoDaAPI } from '../../../redux/treino/actions'; 
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import EditModal from '../../../components/EditModal';

export default function CardTreino({ 
  id,
  titulo, 
  isPreview = false,
  nivel = "Iniciante", 
  recomendado = false, 
  isCustom,
  rotina = []
}) {
  const dispatch = useDispatch();
  const [aberto, setAberto] = useState(false);
  const [diasExpandidos, setDiasExpandidos] = useState({});
  const [show, setShow] = useState(false);
  const [length, setLength] = useState(0);

  const handleShow = (e) =>{
    e.stopPropagation();
    setShow(true);
  }

  const handleClose = (e) =>{
    e.stopPropagation();
    setShow(false);
  }

  const toggleVerMais = (e, dia) => {
    e.stopPropagation();
    setDiasExpandidos(prev => ({ ...prev, [dia]: !prev[dia] }));
  };

  const handleRemoverPlanoCompleto = (e) => {
    e.stopPropagation();
    if (window.confirm(`Deseja remover permanentemente o plano "${titulo}"?`)) {
      dispatch(removerPlano(id));
    }
  };

 const handleRemoverTreinoUnico = (e, id, dia) => {
  e.stopPropagation();

  if (window.confirm(`Remover treino de ${dia}?`)) {
    if (isPreview) {
      dispatch(removerTreinoDaRotinaEdicao(dia));
    } else {
      dispatch(removerTreinoDaAPI(id, dia, rotina));
    }
  }
};

  return (
    <div 
      className={`${styles.cardTreino} ${isCustom ? styles.cardCustom : ''} ${aberto ? styles.cardAberto : ''}`}
      onClick={() => setAberto(!aberto)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <EditModal show={show} handleClose={handleClose} />
      </div>
      <div className={styles.cardMainInfo}>
        <div className={`${styles.badgeIcon} ${styles["green"] || styles.bgGreen}`}>💪</div>
        
        <div className={styles.cardTextContent}>
          <div className={styles.cardTitleRow}>
            <h3 className={styles.cardName}>{titulo || "Novo Plano"}</h3>
          </div>
          <p className={styles.cardDetails}>{rotina.length} treinos * {nivel}</p>

          {!isPreview && (
            <div>
            <Button 
            variant="primary" 
            onClick={(e) => {
              e.stopPropagation();
              setShow(true);
            }}
          >
          Editar
          </Button>
            <Button onClick={handleRemoverPlanoCompleto} className={styles.btnEliminarPlanoCompleto}>
              🗑️ Remover
            </Button>
            </div>
          )}
        </div>
        <div className={`${styles.seta} ${aberto ? styles.setaAtiva : ''}`}>›</div>
      </div>
      
      {aberto && rotina.length > 0 && (
        <div className={styles.containerExpansivel} onClick={(e) => e.stopPropagation()}>
          {rotina.map((item, idx) => {
            const isExpandido = diasExpandidos[item.dia];
            const exerciciosVisiveis = isExpandido ? item.exercicios : item.exercicios.slice(0, 3);

            return (
              <div key={idx} className={styles.itemRotina}>
                <div className={styles.headerRotina}>
                  <div className={`${styles.miniBadge} ${styles.bgGreen}`}>{item.dia}</div>
                  <div className={styles.infoRotina}>
                    <p className={styles.focoRotina}>Treino {item.dia} - {item.foco}</p>
                  </div>

                  {(
                    <button 
                      className={styles.btnX} 
                      onClick={(e) => handleRemoverTreinoUnico(e, id, item.dia)}
                      title="Remover este dia"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className={styles.listaExerciciosPreview}>
                  {exerciciosVisiveis.map((ex) => (
                    <div key={ex.id} className={styles.linhaExercicio}>
                      <span className={styles.bullet}>•</span>
                      <span className={styles.nomeEx}>{ex.nome}</span>
                      <span className={styles.metaEx}>{ex.seriesPadrao}x{ex.repsPadrao}</span>
                    </div>
                  ))}
                  
                  {item.exercicios.length > 3 && (
                    <button className={styles.verMaisBtn} onClick={(e) => toggleVerMais(e, item.dia)}>
                      {isExpandido ? "Ver menos" : `+ ${item.exercicios.length - 3} movimentos`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          
          {!isPreview && (
            <Link to='/treino' className={styles.btnIniciar}>Começar Treino</Link>
          )}
        </div>
      )}
    </div>
  );
}