import React from "react"
import './home.css'
import Header from "../components/Header"

export default function Home(){
    return(
    <>
    <div className="page-wrapper">
        <h1>Dados Biometricos</h1>
        
        <div className="layout-grid">
            
            <div className="form-section">
                <form>
                    <div className="input-group">
                        <label>Peso atual(kg)</label>
                        <input type="number" step="0.1" min="0" value="78.5"/>
                    </div>
                    
                    <div className="input-group">
                        <label>Altura (cm)</label>
                        <input type="number" step="0.1" min="0" value="175"/>
                    </div>
                    
                    <div className="input-group">
                        <label>Idade</label>
                        <input type="number" min="0" value="28"/>
                    </div>
                    
                    <div className="input-group">
                        <label>Nivel de Atividade</label>
                        <select>
                            <option selected>Moderado (3-5x/semana)</option>
                            <option>Sedentario (0x/semana)</option>
                            <option>Ativo (6-7x/semana)</option>
                        </select>
                    </div>
                    
                    <div className="input-group">
                        <label>Objetivo</label>
                        <select>
                            <option selected>Hipertrofia</option>
                            <option>Emagrecimento</option>
                            <option>Manutencao</option>
                        </select>
                    </div>
                </form>
            </div>

            <div className="result-section">
                <div className="meta-card">
                    <h2>Meta calculada</h2>
                    
                    <div className="meta-row">
                        <span>TMB (Taxa metabolica basal)</span>
                        <span>1,845 kcal</span>
                    </div>
                    <div className="meta-row">
                        <span>Meta Diária</span>
                        <span>2,300 kcal</span>
                    </div>

                    <div className="divider"></div>
                    
                    <span className="macros-header">Distribuição de Macros</span>
                    
                    <div className="macros-grid">
                        <div className="macro-col">
                            <span className="macro-val">175g</span>
                            <span className="macro-lbl">Proteínas</span>
                        </div>
                        <div className="macro-col">
                            <span className="macro-val">233g</span>
                            <span className="macro-lbl">Carboidratos</span>
                        </div>
                        <div className="macro-col">
                            <span className="macro-val">66g</span>
                            <span className="macro-lbl">Gorduras</span>
                        </div>
                    </div>
                </div>
                
                <button type="submit">Gerar meu plano</button>
            </div>
            
        </div>
    </div>
</>
)
}