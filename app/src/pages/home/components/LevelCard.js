import React from 'react';
import styles from './home.module.css'; // ou o CSS correto do componente

const LevelCard = ({ nivelAtual }) => {
    
    // 1. O Dicionário de Níveis com todas as informações dinâmicas
    const infoNiveis = {
        'iniciante': {
            titulo: 'Iniciante',
            icone: '🌱',
            descricao: 'Foco em adaptação anatômica, aprendizado motor e condicionamento base.'
        },
        'intermediario': {
            titulo: 'Intermediário',
            icone: '⚡',
            descricao: 'Aumento de volume e intensidade. Introdução a métodos de hipertrofia específicos.'
        },
        'avancado': {
            titulo: 'Avançado',
            icone: '🔥',
            descricao: 'Técnicas avançadas, periodização complexa e treinos de alta performance.'
        }
    };

    // 2. Transforma o que vier do banco ("Intermediário", "intermediario", etc) em uma chave limpa
    const nivelNormalizado = nivelAtual 
        ? nivelAtual.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
        : 'iniciante';

    // 3. Pega os dados exatos daquele nível
    const dados = infoNiveis[nivelNormalizado] || infoNiveis['iniciante'];

    return (
        <div className={styles.levelCard}>
            <div className={styles.levelHeader}>
                
                {/* ÍCONE DINÂMICO */}
                <div className={styles.levelIcon}>{dados.icone}</div>
                
                <div className={styles.levelTextContainer}>
                    <h3 className={styles.levelSubtitle}>Nível de Experiência</h3>
                    {/* TÍTULO E DESCRIÇÃO DINÂMICOS */}
                    <h2 className={styles.levelTitle}>{dados.titulo}</h2>
                    <p className={styles.levelDesc}>{dados.descricao}</p>
                </div>
                
                {/* TABS COM LÓGICA DE ATIVAÇÃO CORRIGIDA */}
                <div className={styles.levelTabs}>
                    <div className={nivelNormalizado === 'iniciante' ? styles.tabActive : styles.tabInactive}>
                        Iniciante
                    </div>
                    <div className={nivelNormalizado === 'intermediario' ? styles.tabActive : styles.tabInactive}>
                        Intermediário
                    </div>
                    <div className={nivelNormalizado === 'avancado' ? styles.tabActive : styles.tabInactive}>
                        Avançado
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default LevelCard;