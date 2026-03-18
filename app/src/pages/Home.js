import React from "react"
import './home.css'

export default function Home(){
    return(
    <>
    <div class="page-wrapper">
        <h1>Dados Biometricos</h1>
        
        <div class="layout-grid">
            
            <div class="form-section">
                <form>
                    <div class="input-group">
                        <label>Peso atual(kg)</label>
                        <input type="number" step="0.1" min="0" value="78.5"/>
                    </div>
                    
                    <div class="input-group">
                        <label>Altura (cm)</label>
                        <input type="number" step="0.1" min="0" value="175"/>
                    </div>
                    
                    <div class="input-group">
                        <label>Idade</label>
                        <input type="number" min="0" value="28"/>
                    </div>
                    
                    <div class="input-group">
                        <label>Nivel de Atividade</label>
                        <select>
                            <option selected>Moderado (3-5x/semana)</option>
                            <option>Sedentario (0x/semana)</option>
                            <option>Ativo (6-7x/semana)</option>
                        </select>
                    </div>
                    
                    <div class="input-group">
                        <label>Objetivo</label>
                        <select>
                            <option selected>Hipertrofia</option>
                            <option>Emagrecimento</option>
                            <option>Manutencao</option>
                        </select>
                    </div>
                </form>
            </div>

            <div class="result-section">
                <div class="meta-card">
                    <h2>Meta calculada</h2>
                    
                    <div class="meta-row">
                        <span>TMB (Taxa metabolica basal)</span>
                        <span>1,845 kcal</span>
                    </div>
                    <div class="meta-row">
                        <span>Meta Diária</span>
                        <span>2,300 kcal</span>
                    </div>

                    <div class="divider"></div>
                    
                    <span class="macros-header">Distribuição de Macros</span>
                    
                    <div class="macros-grid">
                        <div class="macro-col">
                            <span class="macro-val">175g</span>
                            <span class="macro-lbl">Proteínas</span>
                        </div>
                        <div class="macro-col">
                            <span class="macro-val">233g</span>
                            <span class="macro-lbl">Carboidratos</span>
                        </div>
                        <div class="macro-col">
                            <span class="macro-val">66g</span>
                            <span class="macro-lbl">Gorduras</span>
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