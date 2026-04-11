import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { fetchBiometriaList } from '../../redux/Biometria/actions';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const biometria = useSelector(state => state.biometriaReducer.biometria);
  const loading = useSelector(state => state.biometriaReducer.loading);
  
  useEffect(() => {
    dispatch(fetchBiometriaList());
  }, [dispatch]);

  // Função de login corrigida
  // Dentro do Login.jsx, na função handleLogin:
const handleLogin = (e) => {
  e.preventDefault();

  const usuarioValido = biometria.find(
    (item) => item.usuario.email === email && item.usuario.password === password
  );

  if (usuarioValido) {
    // SALVANDO O USUÁRIO LOGADO NO NAVEGADOR
    localStorage.setItem('usuarioLogadoEmail', usuarioValido.usuario.email); 
    navigate('/'); // Redirecione para a rota do perfil
  } else {
    alert('Email ou senha incorretos. Por favor, tente novamente.');
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
                    Email Address
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
                    Password
                  </label>
                  <a className={styles.forgotLink} href="#forgot">
                    Forgot?
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
                {loading ? 'Carregando Dados...' : 'Log In'}
              </button>
            </form>
            
            <p className={styles.registerPrompt}>
              Don't have an account?{' '}
              <a className={styles.registerLink} href="/registro">
                Sign Up
              </a>
            </p>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.disclaimer}>
          By authenticating, you agree to our{' '}
          <span className={styles.disclaimerLink}>Terms</span> and{' '}
          <span className={styles.disclaimerLink}>Privacy Protocol</span>.
        </p>
        <div className={styles.statusIndicator}>
          <div className={styles.statusDot}></div>
          <span className={styles.statusText}>System Operational</span>
        </div>
      </footer>
    </div>
  );
}