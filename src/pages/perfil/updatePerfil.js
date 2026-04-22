import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateBiometria } from '../../redux/Biometria/slice';
import styles from '../login/login.module.css'; // Reaproveitando o CSS do Login/Registro

export default function UpdateUsuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('aluno'); // aluno, treinador ou admin

    const [usuarioAtual, setUsuarioAtual] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Puxando os dados do Redux
    const biometria = useSelector(state => state.biometriaReducer.biometria);

    // 1. Carrega os dados do usuário logado assim que a tela abre
    useEffect(() => {
        const emailLogado = localStorage.getItem('usuarioLogadoEmail');
        
        if (emailLogado && biometria?.length > 0) {
            const encontrado = biometria.find(item => item.usuario.email === emailLogado);
            
            if (encontrado) {
                setUsuarioAtual(encontrado);
                setNome(encontrado.usuario.nome || '');
                setEmail(encontrado.usuario.email || '');
                setPassword(encontrado.usuario.password || '');
                setRole(encontrado.usuario.role || 'aluno');
            }
        }
    }, [biometria]);

    // 2. Função para salvar as alterações
    const handleSubmit = (e) => {
        e.preventDefault();

        if (usuarioAtual) {
            const emailFormatado = email.toLowerCase();

            // Monta o objeto mantendo a biometria, treinos e etc intactos
            const biometriaAtualizada = {
                ...usuarioAtual,
                usuario: {
                    ...usuarioAtual.usuario,
                    nome: nome,
                    email: emailFormatado,
                    password: password,
                    role: role // Salvando o novo nível de acesso
                }
            };

            // Dispara a atualização no Redux
            dispatch(updateBiometria({ id: usuarioAtual.id, updatedData: biometriaAtualizada }));

            // CRÍTICO: Se o email mudou, precisamos atualizar a "Sessão" no navegador
            localStorage.setItem('usuarioLogadoEmail', emailFormatado);
            
            alert('Dados da conta atualizados com sucesso!');
            navigate('/perfil'); // Volta para o painel
        }
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.mainContainer}>
                <div className={styles.formWrapper} style={{ maxWidth: '450px' }}>
                    
                    {/* Cabeçalho */}
                    <header className={styles.header}>
                        <div className={styles.logo}>
                            Configurações de <span className={styles.logoAccent}>CONTA</span>
                        </div>
                        <p style={{ textAlign: 'center', color: 'var(--on-surface-variant)', fontSize: '0.9rem', marginTop: '8px' }}>
                            Atualize suas credenciais de acesso e permissões.
                        </p>
                    </header>
                    
                    {/* Formulário */}
                    <main>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            
                            <div className={styles.formGroup}>
                                <div className={styles.labelRow}>
                                    <label htmlFor="nome" className={styles.label}>Nome Completo</label>
                                </div>
                                <input
                                    id="nome"
                                    className={styles.input}
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <div className={styles.labelRow}>
                                    <label htmlFor="email" className={styles.label}>E-mail de Acesso</label>
                                </div>
                                <input
                                    id="email"
                                    className={styles.input}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.labelRow}>
                                    <label htmlFor="password" className={styles.label}>Senha</label>
                                </div>
                                <input
                                    id="password"
                                    className={styles.input}
                                    type="text" // Você pode usar "password", mas deixei "text" para facilitar seus testes no mock
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.labelRow}>
                                    <label htmlFor="role" className={styles.label}>Nível de Permissão (Role)</label>
                                </div>
                                <select
                                    id="role"
                                    className={styles.input}
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    style={{ backgroundColor: 'white' }}
                                >
                                    <option value="aluno">Aluno (Padrão)</option>
                                    <option value="treinador">Treinador / Personal</option>
                                    <option value="admin">Administrador do Sistema</option>
                                </select>
                            </div>

                            <button type="submit" className={styles.submitBtn} style={{ marginTop: '1.5rem' }}>
                                Salvar Alterações
                            </button>
                            
                            <button 
                                type="button" 
                                onClick={() => navigate('/perfil')} 
                                className={styles.submitBtn} 
                                style={{ background: 'transparent', color: 'var(--on-surface)', border: '1px solid var(--outline)', marginTop: '0.5rem', boxShadow: 'none' }}
                            >
                                Cancelar
                            </button>
                        </form>
                    </main>

                </div>
            </div>
        </div>
    );
}