import React from "react";
import styles from './treino-livre.module.css';
import { Link } from "react-router-dom";

export default function TreinoLivre(){
    return(
        <>
          <div>
            <div>←</div>
            <div>
              <h1>Criar Treino Personalizado</h1>
              <p>Monte sua sessão</p>
            </div>
          </div>
            <div>
              <label>
                Nome do Treino
              </label>
              <input
                type="text"
                value="Meu Treino Upper Body"
                readOnly
              />
            </div>
            <main>
                <div className={styles.buscar}>
                    <a className={styles.lupa}>🔍</a>
                    <input type="text" placeholder="Buscar exercícios..."/>
                </div>
                <div className={styles.filtro}>
                    <h3>FILTRAR POR GRUPO MUSCULAR</h3>
                    <div className={styles.filtros}>
                        <div className={`${styles.selecionado} ${styles.tipo}`}>
                            <a>Todos</a>
                        </div>
                        <div className={styles.tipo}><a>Peito</a></div>
                        <div className={styles.tipo}><a>Costas</a></div>
                        <div className={styles.tipo}><a>Pernas</a></div>
                        <div className={styles.tipo}><a>Ombros</a></div>
                        <div className={styles.tipo}><a>Bíceps</a></div>
                        <div className={styles.tipo}><a>Tríceps</a></div>
                    </div>
                </div>
                <div className={styles.selecionados}>
                    <a className={styles.title}>🗓️ Exercícios Selecionados</a>
                    <a className={styles.quantidade}>3 exercícios</a>
                    <div className={styles['exercicios-selecionados']}>
                        <div className={styles.exercicio}>
                            <p className={styles.titulo}>Supino Reto</p>
                            <a>Peito . 4x 8-10</a>
                            <a className={styles.x}>❌</a>
                        </div>
                        <div className={styles.exercicio}>
                            <p className={styles.titulo}>Remada Curvada</p>
                            <a>Costas . 4x 8-10</a>
                            <a className={styles.x}>❌</a>
                        </div>
                        <div className={styles.exercicio}>
                            <p className={styles.titulo}>Agachamento Livre</p>
                            <a>Pernas . 4x 8-10</a>
                            <a className={styles.x}>❌</a>
                        </div>
                    </div>
                </div>
                <div className={styles.exercicios}>
                    <h3>BIBLIOTECA DE EXERCÍCIOS</h3>
                    <div className={styles['card-exercicio']}>
                        <a className={styles.adicionar}>➕</a>
                        <div className={styles.descricao}>
                            <a>Crucifixo com Halteres</a>
                            <p>Peito . Halteres</p>
                        </div>
                        <a className={styles.arrow}>&gt;</a>
                    </div>
                    <div className={styles['card-exercicio']}>
                        <a className={styles.adicionar}>➕</a>
                        <div className={styles.descricao}>
                            <a>Crucifixo com Halteres</a>
                            <p>Peito . Halteres</p>
                        </div>
                        <a className={styles.arrow}>&gt;</a>
                    </div>
                    <div className={styles['card-exercicio']}>
                        <a className={styles.adicionar}>➕</a>
                        <div className={styles.descricao}>
                            <a>Crucifixo com Halteres</a>
                            <p>Peito . Halteres</p>
                        </div>
                        <a className={styles.arrow}>&gt;</a>
                    </div>
                    <div className={styles['card-exercicio']}>
                        <a className={styles.adicionar}>➕</a>
                        <div className={styles.descricao}>
                            <a>Crucifixo com Halteres</a>
                            <p>Peito . Halteres</p>
                        </div>
                        <a className={styles.arrow}>&gt;</a>
                    </div>
                    <div className={styles['card-exercicio']}>
                        <a className={styles.adicionar}>➕</a>
                        <div className={styles.descricao}>
                            <a>Crucifixo com Halteres</a>
                            <p>Peito . Halteres</p>
                        </div>
                        <a className={styles.arrow}>&gt;</a>
                    </div>
                </div>
                <div className={styles.iniciar}>
                    <Link to="/treino"><span>💾</span>  Salvar Treino Personalizado (3 exercícios)</Link>
                </div>
            </main>
        </>
    )
}