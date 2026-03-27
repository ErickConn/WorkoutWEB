import React from "react";
import styles from './filtro.module.css';
import { useState } from "react";

export default function Filtro(properties){
    const [isSelected, setIsSelected] = useState(null);
    return(
        <div className={styles.filtro}>
            <h3>FILTRAR POR {properties.tipo}</h3>
            <div className={styles.filtros}>
            {properties.filtros.map((filtro, index)=>{
                return(
                    <div key={index} className={isSelected === index? `${styles.selecionado} ${styles.tipo}`: `${styles.tipo}`} onClick={(e)=>{
                        setIsSelected(index);
                    }}>
                        <a>{filtro}</a>
                    </div>
                )
            })}
            </div>
        </div>
    )
}