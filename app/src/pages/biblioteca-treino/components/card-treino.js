import React, { useState } from 'react';
import styles from '../index.module.css';
import { Link } from 'react-router-dom';

export default function CardTreino({ 
  titulo, 
  subtitulo, 
  badge, 
  badgeColor,
  nivel, 
  recomendado = false, 
  tags = [], 
  footerText,
  isCustom = false,
  rotina = []
}) {
  const [aberto, setAberto] = useState(false);
  const [diasExpandidos, setDiasExpandidos] = useState({});
  const toggleVerMais = (e, dia) => {
    e.stopPropagation();
    setDiasExpandidos(prev => ({
      ...prev,
      [dia]: !prev[dia]
    }));
  };

  return (
    <div 
      className={`
        ${styles.cardTreino} 
        ${isCustom ? styles.cardCustom : ''} 
        ${recomendado ? styles.cardRecomendado : ''}
        ${aberto ? styles.cardAberto : ''}
      `}
      onClick={() => setAberto(!aberto)}
    >
      <div className={styles.cardMainInfo}>
        <div className={`${styles.badgeIcon} ${styles[badgeColor] || styles.bgGreen}`}>
          {badge}
        </div>
        
        <div className={styles.cardTextContent}>
          <div className={styles.cardTitleRow}>
            <h3 className={styles.cardName}>{titulo}</h3>
            {nivel && (
              <span className={`${styles.tagNivel} ${nivel === 'Intermediário' ? styles.textGreen : ''}`}>
                {nivel}
              </span>
            )}
          </div>
          
          <p className={styles.cardDetails}>{subtitulo}</p>
          
          <div className={styles.tagContainer}>
            {recomendado && <span className={styles.tagRecomendado}>Recomendado</span>}
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
        
        <div className={`${styles.seta} ${aberto ? styles.setaAtiva : ''}`}>›</div>
      </div>
      
      {aberto && rotina.length > 0 && (
        <div className={styles.containerExpansivel} onClick={(e) => e.stopPropagation()}>
          {rotina.map((item, idx) => {
            const isExpandido = diasExpandidos[item.dia];
            const exerciciosVisiveis = isExpandido 
              ? item.exercicios 
              : item.exercicios.slice(0, 3);

            return (
              <div key={idx} className={styles.itemRotina}>
                <div className={styles.headerRotina}>
                  <div className={`${styles.miniBadge} ${styles[badgeColor] || styles.bgGreen}`}>
                    {item.dia}
                  </div>
                  <div className={styles.infoRotina}>
                    <p className={styles.focoRotina}>Treino {item.dia} - {item.foco}</p>
                    <p className={styles.qtdEx}>{item.exercicios.length} exercícios</p>
                  </div>
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
                    <button 
                      className={styles.verMaisBtn} 
                      onClick={(e) => toggleVerMais(e, item.dia)}
                    >
                      {isExpandido ? "Ver menos" : `+ ${item.exercicios.length - 3} movimentos`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          
          <Link to='/treino' className={styles.btnIniciar}>Começar Treino</Link>
        </div>
      )}

      {footerText && !aberto && (
        <p className={styles.cardFooterText}>{footerText}</p>
      )}
    </div>
  );
}