import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../redux/user/slice';
import styles from '../login/login.module.css'; // Reaproveitando os estilos do login
import { AlertContext } from '../../context/AlertContext';

export default function Registro() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showAlert } = useContext(AlertContext);

    const handleRegistro = (e) => {
        e.preventDefault();

        const emailFormatado = email.toLowerCase();
        if (!emailFormatado.endsWith('.com')) {
            showAlert('O e-mail deve terminar obrigatoriamente com .com', 'error');
            return;
        }
        
        const novoUsuario = {
            nome: name,
            email: emailFormatado,
            senha: password, 
            role: 'aluno'
        };

        dispatch(createUser(novoUsuario))
            .unwrap()
            .then(() => {
                localStorage.setItem('usuarioLogadoEmail', emailFormatado);
                showAlert('Cadastro realizado com sucesso!', 'success');
                navigate('/perfil');
            })
            .catch((err) => {
                showAlert(err || 'Este e-mail já está sendo utilizado ou ocorreu um erro.', 'error');
            });
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.mainContainer}>
                <div className={styles.formWrapper}>

                    {/* Logo Section */}
                    <header className={styles.header}>
                        <div className={styles.logo}>
                            <span className={styles.logoAccent}>CHAMPION'S</span> BODY
                        </div>
                    </header>

                    {/* Registration Form */}
                    <main>
                        <form className={styles.form} onSubmit={handleRegistro}>
                            <div className={styles.formGroup}>
                                <div className={styles.labelRow}>
                                    <label htmlFor="name" className={styles.label}>
                                        Nome Completo
                                    </label>
                                </div>
                                <input
                                    id="name"
                                    className={styles.input}
                                    placeholder="John Doe"
                                    type="text"
                                    value={name} // Conectado ao state
                                    onChange={(e) => setName(e.target.value)} // Atualiza o state
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.labelRow}>
                                    <label htmlFor="email" className={styles.label}>
                                        Endereço de E-mail
                                    </label>
                                </div>
                                <input
                                    id="email"
                                    className={styles.input}
                                    placeholder="john.doe@example.com"
                                    type="email"
                                    value={email} // Conectado ao state
                                    onChange={(e) => setEmail(e.target.value)} // Atualiza o state
                                    required
                                />
                                <span style={{ fontSize: '11px', color: 'var(--outline)', marginTop: '4px', marginLeft: '4px' }}>
                                    * O e-mail deve obrigatoriamente terminar com <strong>.com</strong>
                                </span>
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.labelRow}>
                                    <label htmlFor="password" className={styles.label}>
                                        Senha
                                    </label>
                                </div>
                                <input
                                    id="password"
                                    className={styles.input}
                                    placeholder="••••••••"
                                    type="password"
                                    value={password} // Conectado ao state
                                    onChange={(e) => setPassword(e.target.value)} // Atualiza o state
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                Cadastrar
                            </button>
                        </form>

                        {/* Opcional: Link para voltar ao login se o usuário já tiver conta */}
                        <p className={styles.registerPrompt} style={{ textAlign: 'center', marginTop: '1rem', fontSize: '14px' }}>
                            Já tem uma conta?{' '}
                            <a className={styles.registerLink} href="/" style={{ color: 'var(--tertiary)', fontWeight: 'bold', textDecoration: 'none' }}>
                                Entrar
                            </a>
                        </p>
                    </main>
                </div>
            </div>
        </div>
    );
}