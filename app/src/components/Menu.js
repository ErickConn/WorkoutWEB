import React from "react"
import { 
  Link,
  Routes,
  Route
 } from 'react-router-dom';
 import Home from "../pages/Home";
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
            <Routes>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </footer>
    )  
}