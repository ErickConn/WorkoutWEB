import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../redux/user/slice';
import styles from '../login/login.module.css'; // Reaproveitando o CSS do Login/Registro
import { AlertContext } from '../../context/AlertContext';

export default function UpdateUsuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('aluno'); // aluno, treinador ou admin

    const [usuarioAtual, setUsuarioAtual] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showAlert } = useContext(AlertContext);

    // Puxando o usuário logado do Redux
    const currentUser = useSelector(state => state.userReducer.currentUser);

    // 1. Carrega os dados do usuário logado assim que a tela abre
    useEffect(() => {
        if (currentUser) {
            setUsuarioAtual(currentUser);
            setNome(currentUser.nome || '');
            setEmail(currentUser.email || '');
            setPassword('');
            setRole(currentUser.role || 'aluno');
        }
    }, [currentUser]);

    // 2. Função para salvar as alterações
    const handleSubmit = (e) => {
        e.preventDefault();

        if (usuarioAtual) {
            const emailFormatado = email.toLowerCase();

            // Extrair a senha antiga para evitar enviar o hash de volta
            const { senha: currentSenha, ...usuarioSemSenha } = usuarioAtual;

            const usuarioAtualizado = {
                ...usuarioSemSenha,
                nome: nome,
                email: emailFormatado,
                role: role
            };

            // Se o usuário digitou uma nova senha, envia a nova senha
            if (password && password.trim() !== '') {
                usuarioAtualizado.senha = password;
            }

            const userId = usuarioAtual._id || usuarioAtual.id;

            // Dispara a atualização no Redux usando userSlice
            dispatch(updateUser({ id: userId, updatedData: usuarioAtualizado }));

            // CRÍTICO: Se o email mudou, precisamos atualizar a "Sessão" no navegador
            localStorage.setItem('usuarioLogadoEmail', emailFormatado);

            showAlert('Dados da conta atualizados com sucesso!', 'success');
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
                                    <label htmlFor="password" className={styles.label}>Nova Senha (opcional)</label>
                                </div>
                                <input
                                    id="password"
                                    className={styles.input}
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Deixe em branco para não alterar"
                                    autoComplete="new-password"
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