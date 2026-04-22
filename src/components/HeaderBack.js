import React from "react";
import styles from './headerBack.module.css';
import { Link } from "react-router-dom";

export default function HeaderBack(properties){
    return(
        <header className={styles.header}>
            <Link to={-1} className={styles.backButton}>←</Link>
            <div className={styles.headerText}>
                <h1 className={styles.title}>{properties.title}</h1>
                <p className={styles.subtitle}>{properties.subtitle}</p>
            </div>
        </header>
    )
}