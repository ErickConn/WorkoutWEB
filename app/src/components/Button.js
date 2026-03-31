import React from "react";
import { Link } from "react-router-dom";
import styles from './button.module.css';

export default function Button(properties){
    return(
        <div className={styles.button}>
            <Link to={properties.link} className={styles.link}>
                {properties.title}
            </Link>
        </div>
    )
}