import React from 'react';
import styles from '/workspaces/WorkoutWEB/app/src/pages/perfil/perfil.module.css';
import PlanItem from './planitem.js';

const PlanDetailsCard = ({ objetivo, nivelAtividade, planoAtual }) => {
    return (
        <section className={`${styles.cartao} ${styles.cartaoPlano}`}>
            <PlanItem label="OBJETIVO" valor={objetivo} />
            <PlanItem label="NÍVEL DE ATIVIDADE" valor={nivelAtividade} />
            <PlanItem label="PLANO ATUAL" valor={planoAtual} destaque={true} />
        </section>
    );
};

export default PlanDetailsCard;