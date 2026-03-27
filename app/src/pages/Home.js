import React from "react"
import styles from './home.module.css'
import Header from "../components/Header"
import Menu from '../components/Menu';

export default function Home(){
    return(
    <>
    <div className={styles['page-wrapper']}>
        <h1>Dados Biometricos</h1>
        
        <div className={styles['layout-grid']}>
            
            <div className={styles['form-section']}>
                <form>
                    <div className={styles['input-group']}>
                        <label>Peso atual(kg)</label>
                        <input type="number" step="0.1" min="0" value="78.5"/>
                    </div>
                    
                    <div className={styles['input-group']}>
                        <label>Altura (cm)</label>
                        <input type="number" step="0.1" min="0" value="175"/>
                    </div>
                    
                    <div className={styles['input-group']}>
                        <label>Idade</label>
                        <input type="number" min="0" value="28"/>
                    </div>
                    
                    <div className={styles['input-group']}>
                        <label>Nivel de Atividade</label>
                        <select>
                            <option selected>Moderado (3-5x/semana)</option>
                            <option>Sedentario (0x/semana)</option>
                            <option>Ativo (6-7x/semana)</option>
                        </select>
                    </div>
                    
                    <div className={styles['input-group']}>
                        <label>Objetivo</label>
                        <select>
                            <option selected>Hipertrofia</option>
                            <option>Emagrecimento</option>
                            <option>Manutencao</option>
                        </select>
                    </div>
                </form>
            </div>

            <div className={styles['result-section']}>
                <div className={styles['meta-card']}>
                    <h2>Meta calculada</h2>
                    
                    <div className={styles['meta-row']}>
                        <span>TMB (Taxa metabolica basal)</span>
                        <span>1,845 kcal</span>
                    </div>
                    <div className={styles['meta-row']}>
                        <span>Meta Diária</span>
                        <span>2,300 kcal</span>
                    </div>

                    <div className={styles.divider}></div>
                    
                    <span className={styles['macros-header']}>Distribuição de Macros</span>
                    
                    <div className={styles['macros-grid']}>
                        <div className={styles['macro-col']}>
                            <span className={styles['macro-val']}>175g</span>
                            <span className={styles['macro-lbl']}>Proteínas</span>
                        </div>
                        <div className={styles['macro-col']}>
                            <span className={styles['macro-val']}>233g</span>
                            <span className={styles['macro-lbl']}>Carboidratos</span>
                        </div>
                        <div className={styles['macro-col']}>
                            <span className={styles['macro-val']}>66g</span>
                            <span className={styles['macro-lbl']}>Gorduras</span>
                        </div>
                    </div>
                </div>
                
                <button type="submit">Gerar meu plano</button>
            </div>
            
        </div>
        <Menu></Menu>
    </div>
</>
)
}