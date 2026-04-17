import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBiometria, fetchBiometriaList } from '../../redux/Biometria/actions';
import styles from '../login/login.module.css'; // Reaproveitando os estilos do login

export default function Registro() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const biometria = useSelector((state) => state.biometriaReducer.biometria);

    useEffect(() => {
        dispatch(fetchBiometriaList());
    }, [dispatch]);

    const handleRegistro = (e) => {
        e.preventDefault();

        const emailFormatado = email.toLowerCase();
        
        // Verifica se o e-mail já existe na base de dados (ignorando a caixa)
        const emailJaExiste = biometria.some(
            (item) => item.usuario.email === emailFormatado
        );

        if (emailJaExiste) {
            alert('Este e-mail já está sendo utilizado. Por favor, use outro e-mail ou faça login na sua conta.');
            return;
        }

        // O objeto deve ser criado DENTRO da função disparada ao enviar o formulário
        const novoId = String(Date.now());
        const biometriaItem = {
            id: novoId,
            usuario: {
                id: novoId,
                nome: name,
                email: emailFormatado,
                password: password,
                role: 'aluno',

                // Agora a biometria nasce VAZIA para forçar a criação depois!
                perfil_biometrico: null,
                analise_metabolica: null,
                experiencia_usuario: null
            }
        };

        // 1. Dispara a ação para salvar no Redux
        dispatch(createBiometria(biometriaItem));

        // 2. A MÁGICA AQUI: Faz o login automático salvando a sessão no navegador!
        localStorage.setItem('usuarioLogadoEmail', email.toLowerCase());

        // 3. Redireciona o usuário direto para a página de perfil (e não mais pro login)
        navigate('/perfil');
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