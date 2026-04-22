import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { fetchBiometriaList } from '../../redux/Biometria/slice';

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
    navigate('/perfil'); // Redirecione para a rota do perfil
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