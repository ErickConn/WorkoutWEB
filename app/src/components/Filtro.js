import React from "react";
import styles from './filtro.module.css';
import { useState } from "react";

export default function Filtro(properties){
    const [isSelected, setIsSelected] = useState(false);
    return(
        <div className={styles.filtro}>
            <h3>FILTRAR POR GRUPO MUSCULAR</h3>
            <div className={styles.filtros}>
            {properties.filtros.map((filtro, index)=>{
                return(
                    <div key={index} className={isSelected? `${styles.selecionado} ${styles.tipo}`: `${styles.tipo}`} onClick={()=>{
                        setIsSelected((prev)=> !prev);
                    }}>
                        <a>{filtro}</a>
                    </div>
                )
            })}
            </div>
        </div>
    )
}