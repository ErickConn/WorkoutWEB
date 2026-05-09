import { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { loginAuth } from '../../redux/user/slice';
import { AlertContext } from '../../context/AlertContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);
  
  const loading = useSelector(state => state.userReducer.loading);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const emailFormatado = email.toLowerCase();
      await dispatch(loginAuth({ email: emailFormatado, senha: password })).unwrap();
      navigate('/perfil');
    } catch (err) {
      showAlert(typeof err === 'string' ? err : 'Email ou senha incorretos. Por favor, tente novamente.', 'error');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      {/* Main Layout Container */}
      <div className={styles.mainContainer}>
        <div className={styles.formWrapper}>

          {/* Logo Section */}
          <header className={styles.header}>
            <div className={styles.logo}>
              <span className={styles.logoAccent}>CHAMPION'S</span> BODY
            </div>
          </header>

          {/* Login Form */}
          <main>
            {/* O evento agora fica no form */}
            <form className={styles.form} onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <div className={styles.labelRow}>
                  <label htmlFor="email" className={styles.label}>
                    Endereço de E-mail
                  </label>
                </div>
                <input
                  id="email"
                  className={styles.input}
                  placeholder="athlete@championsbody.com"
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
                  <a className={styles.forgotLink} href="#forgot">
                    Esqueceu a senha?
                  </a>
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

              {/* Botão desativado caso os dados do Redux ainda estejam carregando */}
              <button 
                className={styles.submitBtn} 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Carregando Dados...' : 'Entrar'}
              </button>
            </form>
            
            <p className={styles.registerPrompt}>
              Não tem uma conta?{' '}
              <a className={styles.registerLink} href="/registro">
                Cadastre-se
              </a>
            </p>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.disclaimer}>
          Ao autenticar, você concorda com nossos{' '}
          <span className={styles.disclaimerLink}>Termos</span> e{' '}
          <span className={styles.disclaimerLink}>Política de Privacidade</span>.
        </p>
        <div className={styles.statusIndicator}>
          <div className={styles.statusDot}></div>
          <span className={styles.statusText}>Sistema Operacional</span>
        </div>
      </footer>
    </div>
  );
}