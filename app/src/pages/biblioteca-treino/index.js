import React from "react";
import styles from './index.module.css';
import Filtro from "../../components/Filtro";
import { Link } from 'react-router-dom';
import HeaderBack from "../../components/HeaderBack";

export default function BibliotecaTreino() {
  const filtros = ["Todos", "Iniciante", "Intermediário", "Avançado"];

  return (
    <div className={styles.container}>
      <HeaderBack title="Biblioteca de Treinos" subtitle="Planos modelo disponíveis"></HeaderBack>

      <div className={styles.content}>
        <div className={styles.buscar}>
          <span className={styles.lupa}>🔍</span>
          <input type="text" placeholder="Buscar treinos..." className={styles.inputBusca} />
        </div>

        <Filtro tipo="NÍVEL" filtros={filtros} />

        <div className={styles.secaoRecomendados}>
          <h3 className={styles.sessaoTitle}>✨ RECOMENDADOS PARA VOCÊ</h3>
          <div className={styles.cardRecomendado}>
            <div className={styles.cardMainInfo}>
              <div className={`${styles.badgeIcon} ${styles.bgGreen}`}>ABC</div>
              <div className={styles.cardTextContent}>
                <div className={styles.cardTitleRow}>
                  <h3 className={styles.cardName}>ABC Intermediário</h3>
                  <span className={styles.tagRecomendado}>Recomendado</span>
                </div>
                <p className={styles.cardDetails}>3 treinos • 5-6 exercícios cada</p>
                <div className={styles.tagContainer}>
                  <span className={styles.tag}>Hipertrofia</span>
                  <span className={styles.tag}>4x/semana</span>
                </div>
              </div>
              <div className={styles.seta}>›</div>
            </div>
            <p className={styles.cardFooterText}>
              Treino A (Peito/Tríceps), B (Costas/Bíceps), C (Pernas/Ombros)
            </p>
          </div>
        </div>

        <div className={styles.listaTreinos}>
          <h3 className={styles.sessaoTitle}>Todos os Planos Modelo</h3>

          <div className={styles.cardTreino}>
            <div className={styles.cardMainInfo}>
              <div className={`${styles.badgeIcon} ${styles.bgOrange}`}>FB</div>
              <div className={styles.cardTextContent}>
                <div className={styles.cardTitleRow}>
                  <h3 className={styles.cardName}>Full Body Iniciante</h3>
                  <span className={styles.tagNivel}>Iniciante</span>
                </div>
                <p className={styles.cardDetails}>1 treino • 8-10 exercícios</p>
                <div className={styles.tagContainer}>
                  <span className={styles.tag}>Corpo Inteiro</span>
                  <span className={styles.tag}>3x/semana</span>
                </div>
              </div>
              <div className={styles.seta}>›</div>
            </div>
          </div>

          <div className={styles.cardTreino}>
            <div className={styles.cardMainInfo}>
              <div className={`${styles.badgeIcon} ${styles.bgBlue}`}>AB</div>
              <div className={styles.cardTextContent}>
                <div className={styles.cardTitleRow}>
                  <h3 className={styles.cardName}>AB Intermediário</h3>
                  <span className={`${styles.tagNivel} ${styles.textGreen}`}>Intermediário</span>
                </div>
                <p className={styles.cardDetails}>2 treinos • 6-7 exercícios cada</p>
                <div className={styles.tagContainer}>
                  <span className={styles.tag}>Push/Pull</span>
                  <span className={styles.tag}>4x/semana</span>
                </div>
              </div>
              <div className={styles.seta}>›</div>
            </div>
          </div>
        </div>

        <div className={styles.listaTreinos}>
          <h3 className={styles.sessaoTitle}>💜 Meus Treinos Personalizados</h3>
          <div className={`${styles.cardTreino} ${styles.cardCustom}`}>
            <div className={styles.cardMainInfo}>
              <div className={`${styles.badgeIcon} ${styles.bgPurple}`}>⚡</div>
              <div className={styles.cardTextContent}>
                <h3 className={styles.cardName}>Treino Upper Body Custom</h3>
                <p className={styles.cardDetails}>Criado por você • 8 exercícios</p>
                <div className={styles.tagContainer}>
                  <span className={styles.tag}>Personalizado</span>
                </div>
              </div>
              <div className={styles.seta}>›</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerAction}>
        <Link to='/treino-livre' className={styles.btnCreate}>
          <span>+</span> Criar Novo Treino Personalizado
        </Link>
      </div>
    </div>
  );
}