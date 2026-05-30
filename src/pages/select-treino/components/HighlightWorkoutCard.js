import React from "react";
import styles from "./select-treino.module.css";

const HighlightWorkoutCard = ({ variant,badgeText,title,subtitle,footerText,linkTo, onClick}) => {
    const colorClass = variant === 'green' ? styles['card-green'] : styles['card-purple'];
    return (
        <div className={`${styles.card} ${colorClass}`} onClick={onClick}>
            <div className={styles['card-header-flex']}>
                <span className={styles['badge-title']}>{badgeText}</span>
                <span className={styles.arrow}>➔</span>
            </div>
            <h2>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
            <div className={styles['card-stats']}>
                <span>{footerText}</span>
            </div>
        </div>
    );
};

export default HighlightWorkoutCard;
