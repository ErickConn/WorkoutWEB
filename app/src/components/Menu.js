import React from "react"
import { 
  NavLink,
 } from 'react-router-dom';
 import styles from './menu.module.css';

export default function Menu(){
    return(
        <footer>
            <div className={styles['menu-navegacao']}>
                <div className={styles['botao-navegacao']}>
                    <NavLink to="/" className={({isActive})=> isActive? styles.atual :styles.link}>
                        🧎‍♀️
                        <p>Perfil</p>
                    </NavLink>
                </div>
                <div className={styles['botao-navegacao']}>
                    <NavLink to="/treino" className={({isActive})=> isActive? styles.atual :styles.link}>
                        💪
                        <p>Treino</p>
                    </NavLink>
                </div>
                <div className={styles['botao-navegacao']}>
                    <NavLink to="/progresso"className={({isActive})=> isActive? styles.atual :styles.link}>
                        📈
                        <p>Progresso</p>
                    </NavLink>
                </div>
            </div>
        </footer>
    )  
}