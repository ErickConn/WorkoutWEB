import React from "react"
import { 
  Link,
 } from 'react-router-dom';
 import styles from './menu.module.css';

export default function Menu(){
    return(
        <footer>
            <div className={styles['menu-navegacao']}>
                <div className={styles['botao-navegacao']}>
                    <Link to="/" className={styles.link}>
                        🧎‍♀️
                        <p>Perfil</p>
                    </Link>
                </div>
                <div className={styles['botao-navegacao']}>
                    <Link to="/treino" className={styles.link}>
                        💪
                        <p className={styles.atual}>Treino</p>
                    </Link>
                </div>
                <div className={styles['botao-navegacao']}>
                    <Link to="/progresso" className={styles.link}>
                        📈
                        <p>Progresso</p>
                    </Link>
                </div>
            </div>
        </footer>
    )  
}