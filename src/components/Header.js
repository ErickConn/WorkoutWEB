import React from "react";
import styles from './header.module.css';

function Header(){
    return(
        <header className={styles['app-header']}>
            <h2>🏆 Champions's Body</h2>
        </header>
    )
}

export default Header;