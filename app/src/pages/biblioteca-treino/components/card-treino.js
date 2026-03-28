// components/CardTreino/index.js
import styles from '../index.module.css';

export default function CardTreino({ 
  titulo, 
  subtitulo, 
  badge, 
  badgeColor,
  nivel, 
  recomendado = false, 
  tags = [], 
  footerText,
  isCustom = false 
}) {
  return (
    <div className={`${styles.cardTreino} ${isCustom ? styles.cardCustom : ''} ${recomendado ? styles.cardRecomendado : ''}`}>
      <div className={styles.cardMainInfo}>
        <div className={`${styles.badgeIcon} ${styles[badgeColor]}`}>{badge}</div>
        
        <div className={styles.cardTextContent}>
          <div className={styles.cardTitleRow}>
            <h3 className={styles.cardName}>{titulo}</h3>
            {recomendado && <span className={styles.tagRecomendado}>Recomendado</span>}
            {nivel && <span className={`${styles.tagNivel} ${nivel === 'Intermediário' ? styles.textGreen : ''}`}>{nivel}</span>}
          </div>
          
          <p className={styles.cardDetails}>{subtitulo}</p>
          
          <div className={styles.tagContainer}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
        
        <div className={styles.seta}>›</div>
      </div>
      
      {footerText && (
        <p className={styles.cardFooterText}>{footerText}</p>
      )}
    </div>
  );
}