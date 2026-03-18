import React from "react"
import { 
  Link,
 } from 'react-router-dom';
 import './menu.css';

export default function Menu(){
    return(
        <footer>
            <div class="menu-navegacao">
                <div class="botao-navegacao">
                    <Link to="/" class="link">
                        🧎‍♀️
                        <p>Perfil</p>
                    </Link>
                </div>
                <div class="botao-navegacao">
                    <Link to="/treino" class="link">
                        💪
                        <p class="atual">Treino</p>
                    </Link>
                </div>
                <div class="botao-navegacao">
                    <Link to="/progresso" class="link">
                        📈
                        <p>Progresso</p>
                    </Link>
                </div>
            </div>
        </footer>
    )  
}