import React from 'react';
import styles from '/workspaces/WorkoutWEB/app/src/pages/perfil/perfil.module.css';

const ExperienceCard = ({ nivel, descricao }) => {
    return (
        <section className={`${styles.cartao} ${styles.cartaoExperiencia}`}>
            <div className={styles.iconeExperiencia}>
                <span>⭐</span>
            </div>
            <div className={styles.textoExperiencia}>
                <span className={styles.label}>Nível de Experiência</span>
                <p className={styles.valor}>{nivel}</p>
                <p className={styles.descricao}>{descricao}</p>
            </div>
        </section>
    );
};

export default ExperienceCard;