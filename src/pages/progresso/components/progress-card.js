import React from "react";
import styles from "../progresso.module.css";

export default function ProgressCard({ 
    emoji, 
    valor,
    titulo, 
    variacao, 
    descricao, 
}) {
    // Função de formatação
    const formatVariação = (v) => {
        if (v === undefined) return "";
        return v> 0? `+${v}` : v;
    };
    return (
        <div className={styles.card}>
            {emoji && <div className={styles.emoji}>{emoji}</div>}
            {valor !== undefined && (
                <h2><strong>{valor}</strong></h2>
            )}
            {titulo && <p>{titulo}</p>}
            {variacao !== undefined && (
                <div className={variacao < 0 ? styles['status-perda'] : styles['status-ganho']}>
                {formatVariação(variacao)} {descricao || ""}
                </div>
            )}
        </div>
    );
}
