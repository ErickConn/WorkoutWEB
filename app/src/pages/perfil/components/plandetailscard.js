import React from 'react';
import styles from './perfil.module.css';
import PlanItem from './planitem.js';

const PlanDetailsCard = ({ nivelAtividade, planoAtual }) => {
    return (
        <section className={`${styles.cartao} ${styles.cartaoPlano}`}>
            <PlanItem label="NÍVEL DE ATIVIDADE" valor={nivelAtividade} />
            <PlanItem label="PLANO ATUAL" valor={planoAtual} destaque={true} />
        </section>
    );
};

export default PlanDetailsCard;