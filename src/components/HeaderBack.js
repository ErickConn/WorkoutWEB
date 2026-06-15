import React from "react";
import styles from './headerBack.module.css';
import { Link } from "react-router-dom";

export default function HeaderBack({ title, subtitle, to = -1 }) {
    return(
        <header className={styles.header}>
            <Link to={to} className={styles.backButton}>←</Link>
            <div className={styles.headerText}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
        </header>
    )
}