import React from "react";
import { Link } from "react-router-dom";
import styles from '../pages/biblioteca-treino/index.module.css';

export default function FooterButton(properties){
    return(
        <>
            <div className={styles.footerAction} onClick={properties.onClick}>
                <Link to={properties.link} className={styles.btnCreate}>
                    {properties.title}
                </Link>
            </div>
        </>
    )
}