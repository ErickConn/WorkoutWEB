import React from "react";
import { Link } from "react-router-dom";
import styles from './button.module.css';

export default function Button({title, link, variant= "primary"}) {
    return(
        <div className={styles.button}>
            <Link 
                to={link} 
                className={`${styles.button} ${styles[variant]}`}
                aria-label= {title}
            >
                {title}
            </Link>
        </div>
    )
}