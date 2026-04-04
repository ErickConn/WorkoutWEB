import React from 'react';
import styles from './home.module.css'; 

const CalcCard = ({ peso, altura, idade }) => {
    return (
        <div className={styles.calcCard}>
            <h2 className={styles.cardTitle}>🔥 Taxa Metabólica Basal</h2>
            <div className={styles.inputGroup}>
                
                <div className={styles.inputWrapper}>
                    <label>Peso Atual (kg)</label>
                    <input type="number" step="0.1" min="0" placeholder={peso} />
                </div>
                
                <div className={styles.inputWrapper}>
                    <label>Altura (cm)</label>
                    <input type="number" step="0.1" min="0" placeholder={altura} />
                </div>
                
                <div className={styles.inputWrapper}>
                    <label>Idade</label>
                    <input type="number" min="0" placeholder={idade} />
                </div>
                
                <div className={styles.inputWrapper}>
                    <label>Nível de Atividade</label>
                    <select defaultValue="moderado">
                        <option value="sedentario">Sedentário</option>
                        <option value="leve">Leve (1-3x/semana)</option>
                        <option value="moderado">Moderado (3-5x/semana)</option>
                        <option value="intenso">Intenso (6-7x/semana)</option>
                    </select>
                </div>
                
            </div>
        </div>
    );
};

export default CalcCard;