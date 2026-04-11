import React from 'react';
import styles from './perfil.module.css';

const UserProfileCard = ({ fotoUsuario, handleUploadFoto, nome, email, iniciais, sexo }) => {
    
    // Função simples para deixar a primeira letra maiúscula
    const formatarTexto = (texto) => {
        if (!texto) return "";
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    };

    return (
        <section className={`${styles.cartao} ${styles.cartaoUsuario}`}>
            <div className={styles.avatar}>
                <label htmlFor="uploadFoto" style={{ cursor: 'pointer' }}>
                    {fotoUsuario ? (
                        <img 
                            src={fotoUsuario} s
                            alt="Avatar do Usuário" 
                            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} 
                        />
                    ) : (
                        <div className={styles.avatarPlaceholder} id="fotoUsuario">
                            {iniciais}
                        </div>
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
                <h2 id="nomeUsuario" className={styles.nome}>{nome}</h2>
                <p id="emailUsuario" className={styles.email}>{email}</p>
                
                {sexo && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)', margin: '4px 0 8px 0' }}>
                        {sexo === 'masculino' ? '♂️' : '♀️'} {formatarTexto(sexo)}
                    </p>
                )}

                <div className={styles.badgeAluno}>
                    <span className={styles.icone}>👤</span> Aluno
                </div>
            </div>
        </section>
    );
};

export default UserProfileCard;