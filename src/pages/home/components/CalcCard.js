import React from 'react';
import styles from './home.module.css'; 

const CalcCard = ({ 
    peso, setPeso, 
    altura, setAltura, 
    idade, setIdade, 
    sexo, setSexo, 
    nivelAtividade, setNivelAtividade,
    nivelExperiencia, setNivelExperiencia // Novas propriedades do nível de experiência!
}) => {
    
    return (
        <div className={styles.calcCard}>
            <h2 className={styles.cardTitle}>🔥 Taxa Metabólica Basal</h2>
            <div className={styles.inputGroup}>
                
                <div className={styles.inputWrapper}>
                    <label>Sexo</label>
                    {/* Alterado de defaultValue para value */}
                    <select value={sexo || 'masculino'} onChange={(e) => setSexo(e.target.value)}>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                    </select>
                </div>

                <div className={styles.inputWrapper}>
                    <label>Idade</label>
                    {/* Alterado de placeholder para value */}
                    <input 
                        type="number" 
                        min="0" 
                        value={idade || ''} 
                        onChange={(e) => setIdade(parseInt(e.target.value) || 0)} 
                    />
                </div>

                <div className={styles.inputWrapper}>
                    <label>Altura (cm)</label>
                    <input 
                        type="number" 
                        step="0.1" 
                        min="0" 
                        value={altura || ''} 
                        onChange={(e) => setAltura(parseFloat(e.target.value) || 0)} 
                    />
                </div>
                
                <div className={styles.inputWrapper}>
                    <label>Peso Atual (kg)</label>
                    <input 
                        type="number" 
                        step="0.1" 
                        min="0" 
                        value={peso || ''} 
                        onChange={(e) => setPeso(parseFloat(e.target.value) || 0)} 
                    />
                </div>

                <div className={styles.inputWrapper}>
                    <label>Nível de Atividade</label>
                    <select value={nivelAtividade || 'sedentario'} onChange={(e) => setNivelAtividade(e.target.value)}>
                        <option value="sedentario">Sedentário</option>
                        <option value="leve">Leve (1-3x/semana)</option>
                        <option value="moderado">Moderado (3-5x/semana)</option>
                        <option value="intenso">Intenso (6-7x/semana)</option>
                    </select>
                </div>

                {/* --- NOVO CAMPO: Nível de Experiência --- */}
                <div className={styles.inputWrapper}>
                    <label>Nível na Musculação</label>
                    <select value={nivelExperiencia || 'iniciante'} onChange={(e) => setNivelExperiencia(e.target.value)}>
                        <option value="iniciante">Iniciante (0 a 6 meses)</option>
                        <option value="intermediario">Intermediário (6 meses a 2 anos)</option>
                        <option value="avancado">Avançado (+2 anos)</option>
                    </select>
                </div>
                
            </div>
        </div>
    );
};

export default CalcCard;