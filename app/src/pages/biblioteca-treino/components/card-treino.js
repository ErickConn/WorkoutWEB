import React, { useState } from 'react';
import styles from '../index.module.css';
import { Link } from 'react-router-dom';
import { removerPlano, removerTreinoDaRotina } from '../../../redux/treino/actions'; 
import { useDispatch } from 'react-redux';

export default function CardTreino({ 
  id,
  titulo, 
  subtitulo, 
  badge, 
  isPreview = false,
  badgeColor,
  nivel, 
  recomendado = false, 
  tags = [], 
  isCustom,
  rotina = []
}) {
  const dispatch = useDispatch();
  const [aberto, setAberto] = useState(false);
  const [diasExpandidos, setDiasExpandidos] = useState({});

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

  const handleRemoverTreinoUnico = (e, dia) => {
    e.stopPropagation();
    dispatch(removerTreinoDaRotina(dia));
  };

  return (
    <div 
      className={`${styles.cardTreino} ${isCustom ? styles.cardCustom : ''} ${aberto ? styles.cardAberto : ''}`}
      onClick={() => setAberto(!aberto)}
    >
      <div className={styles.cardMainInfo}>
        <div className={`${styles.badgeIcon} ${styles[badgeColor] || styles.bgGreen}`}>{badge}</div>
        
        <div className={styles.cardTextContent}>
          <div className={styles.cardTitleRow}>
            <h3 className={styles.cardName}>{titulo || "Novo Plano"}</h3>
          </div>
          <p className={styles.cardDetails}>{subtitulo}</p>
          
          {!isPreview && (
            <button onClick={handleRemoverPlanoCompleto} className={styles.btnEliminarPlanoCompleto}>
              🗑️ Remover Plano
            </button>
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
                  <div className={`${styles.miniBadge} ${styles[badgeColor] || styles.bgGreen}`}>{item.dia}</div>
                  <div className={styles.infoRotina}>
                    <p className={styles.focoRotina}>Treino {item.dia} - {item.foco}</p>
                  </div>

                  {isPreview && (
                    <button 
                      className={styles.btnX} 
                      onClick={(e) => handleRemoverTreinoUnico(e, item.dia)}
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