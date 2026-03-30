import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './perfil.module.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { fetchBiometriaList } from '../../redux/Biometria/actions';
import { useDispatch,useSelector } from 'react-redux';


export default function Perfil() {
    const [fotoUsuario, setFotoUsuario] = useState(null);
    const dispatch = useDispatch();
    const biometria = useSelector(state => state.biometriaReducer.biometria);
  console.log('Dados biométricos:', biometria);
  useEffect(() => {
      dispatch(fetchBiometriaList());
    }, [dispatch]);
    if (!biometria || biometria.length === 0) {
    return (
      <div className={styles.container}>
        <p>Carregando dados biométricos...</p>
      </div>
    );
  }
   
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
                        <h2 id="nomeUsuario" className={styles.nome}>{biometria[0]?.usuario.nome}</h2>
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
                            <p className={styles.dadoValor}>{biometria[0]?.usuario.perfil_biometrico.peso_kg}<span className={styles.dadoUnidade}>kg</span></p>
                        </div>
                        
                        <div className={styles.dadoItem}>
                            <span className={styles.dadoLabel}>Altura</span>
                            <p className={styles.dadoValor}>{biometria[0]?.usuario.perfil_biometrico.altura_cm} <span className={styles.dadoUnidade}>cm</span></p>
                        </div>
                        
                        <div className={styles.dadoItem}>
                            <span className={styles.dadoLabel}>Idade</span>
                            <p className={styles.dadoValor}>{biometria[0]?.usuario.perfil_biometrico.idade} <span className={styles.dadoUnidade}>anos</span></p>
                        </div>
                        
                        <div className={styles.dadoItem}>
                            <span className={styles.dadoLabel}>TMB</span>
                            <p className={styles.dadoValor}>{biometria[0]?.usuario.analise_metabolica.tmb_kcal}<span className={styles.dadoUnidade}>kcal</span></p>
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