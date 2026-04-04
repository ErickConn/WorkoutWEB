import React from 'react';
import styles from './perfil.module.css';
import MetricItem from './metricitem.js';

const BiometricsCard = ({ peso, altura, idade, tmb }) => {
    return (
        <section className={`${styles.cartao} ${styles.cartaoBiometria}`}>
            <h3 className={styles.tituloSessao}>📊 Dados Biométricos</h3>
            <div className={styles.gridDados}>
                <MetricItem label="Peso Atual" valor={peso} unidade="kg" />
                <MetricItem label="Altura" valor={altura} unidade="cm" />
                <MetricItem label="Idade" valor={idade} unidade="anos" />
                <MetricItem label="TMB" valor={tmb} unidade="kcal" />
            </div>
        </section>
    );
};

export default BiometricsCard;