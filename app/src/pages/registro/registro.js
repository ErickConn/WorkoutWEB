import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../login/login.module.css';

export default function Registro() {
    const[email, setEmail] = useState('');
    const[name, setName] = useState('');
    const[password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegistro = (e) => {
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
            
            {/* Simplified Registration Form */}
            <main>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.formGroup}>
                    <div className={styles.labelRow}>
                    <label htmlFor="name" className={styles.label}>
                        Full Name
                    </label>
                    </div>
                    <input
                    id="name"
                    className={styles.input}
                    placeholder="John Doe"
                    type="text"
                    required
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <div className={styles.labelRow}>
                    <label htmlFor="email" className={styles.label}>
                        Email Address
                    </label>
                    </div>
                    <input
                    id="email"
                    className={styles.input}
                    placeholder="john.doe@example.com"
                    type="email"
                    required
                    />
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.labelRow}>
                    <label htmlFor="password" className={styles.label}>
                        Password
                    </label>
                    </div>
                    <input
                    id="password"
                    className={styles.input}
                    placeholder="••••••••"
                    type="password"
                    required
                    />
                </div>

                <button type="submit" className={styles.submitBtn} onClick={handleRegistro}>
                    Register
                </button>
            </form>
            </main>
        </div>
        </div>
        </div>
    );
}