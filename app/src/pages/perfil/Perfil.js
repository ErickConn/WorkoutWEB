import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './perfil.module.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';


export default function Perfil() {
   
    const [fotoUsuario, setFotoUsuario] = useState(null);

    const handleUploadFoto = (event) => {
        const arquivo = event.target.files[0];
        if (arquivo) {
            setFotoUsuario(URL.createObjectURL(arquivo));
        }
    };

    return (
        <>
            <Header titulo="Champion's Body" subtitulo="Meu Perfil" /> 
            <main className={styles.containerPerfil}>

               
                <section className={`${styles.cartao} ${styles.cartaoUsuario}`}>
                    <div className={styles.avatar}>
                        <label htmlFor="uploadFoto" style={{ cursor: 'pointer' }}>
                            {fotoUsuario ? (
                                <img 
                                    src={fotoUsuario} 
                                    alt="Avatar do Usuário" 
                                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} 
                                />
                            ) : (
                                <div className={styles.avatarPlaceholder} id="fotoUsuario">RC</div>
                            )}
                        </label>
                        <input 
                            type="file" 
                            id="uploadFoto" 
                            accept="image/*" 
                            style={{ display: 'none' }} 
                            onChange={handleUploadFoto}
                        />
                    </div>

                    <div className={styles.informacoesUsuario}>
                        <h2 id="nomeUsuario" className={styles.nome}>Roberto Carlos</h2>
                        <p id="emailUsuario" className={styles.email}>roberto.carlos@email.com</p>
                        <div className={styles.badgeAluno}>
                            <span className={styles.icone}>👤</span> Aluno
                        </div>
                    </div>
                </section>

                
                <section className={`${styles.cartao} ${styles.cartaoBiometria}`}>
                    <h3 className={styles.tituloSessao}>📊 Dados Biométricos</h3>
                    
                    <div className={styles.gridDados}>
                        <div className={styles.dadoItem}>
                            <span className={styles.dadoLabel}>Peso Atual</span>
                            <p className={styles.dadoValor}>78.5 <span className={styles.dadoUnidade}>kg</span></p>
                        </div>
                        
                        <div className={styles.dadoItem}>
                            <span className={styles.dadoLabel}>Altura</span>
                            <p className={styles.dadoValor}>175 <span className={styles.dadoUnidade}>cm</span></p>
                        </div>
                        
                        <div className={styles.dadoItem}>
                            <span className={styles.dadoLabel}>Idade</span>
                            <p className={styles.dadoValor}>28 <span className={styles.dadoUnidade}>anos</span></p>
                        </div>
                        
                        <div className={styles.dadoItem}>
                            <span className={styles.dadoLabel}>TMB</span>
                            <p className={styles.dadoValor}>1845 <span className={styles.dadoUnidade}>kcal</span></p>
                        </div>
                    </div>
                </section>

                
                <section className={`${styles.cartao} ${styles.cartaoExperiencia}`}>
                    <div className={styles.iconeExperiencia}>
                        <span>⭐</span>
                    </div>
                    <div className={styles.textoExperiencia}>
                        <span className={styles.label}>Nível de Experiência</span>
                        <p className={styles.valor}>Intermediário</p>
                        <p className={styles.descricao}>Baseado em seu perfil biométrico e histórico de treinos</p>
                    </div>
                </section>

                
                <section className={`${styles.cartao} ${styles.cartaoPlano}`}>
                    <div className={styles.planoItem}>
                        <span className={styles.label}>OBJETIVO</span>
                        <p className={styles.valor}>Hipertrofia Muscular</p>
                    </div>
                    
                    <div className={styles.planoItem}>
                        <span className={styles.label}>NÍVEL DE ATIVIDADE</span>
                        <p className={styles.valor}>Moderado (3-5x/semana)</p>
                    </div>
                    
                    <div className={styles.planoItem}>
                        <span className={styles.label}>PLANO ATUAL</span>
                        <p className={styles.valorDestaque}>ABC - Intermediário</p>
                    </div>
                </section>

                <Link to= '/Home' className={styles.btnEditar}> Editar Perfil</Link>
                <Menu paginaAtual="perfil" />
            </main>
        </>
    );
}