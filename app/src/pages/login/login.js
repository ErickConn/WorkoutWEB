import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';

export default function Login() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        
        navigate('/');
        
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

          {/* Simplified Login Form */}
          <main>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
                  required
                />
              </div>

              <button className={styles.submitBtn} type="submit" onClick={handleLogin}>
                Log In
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