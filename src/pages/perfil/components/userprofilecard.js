import React from 'react';
import styles from './perfil.module.css';

const UserProfileCard = ({ fotoUsuario, handleUploadFoto, nome, email, iniciais, sexo, role }) => {
    
    // Função simples para deixar a primeira letra maiúscula
    const formatarTexto = (texto) => {
        if (!texto) return "";
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    };

    return (
        <section className={`${styles.cartao} ${styles.cartaoUsuario}`}>
            <div className={styles.avatarContainer}>
                <label htmlFor="uploadFoto" className={styles.avatarLabel}>
                    {fotoUsuario ? (
                        <img 
                            src={fotoUsuario} 
                            alt="Avatar do Usuário" 
                            className={styles.avatarImage} 
                        />
                    ) : (
                        <div className={styles.avatarPlaceholder} id="fotoUsuario">
                            {iniciais}
                        </div>
                    )}
                    <div className={styles.avatarOverlay}>
                        <span>📷</span>
                        Alterar
                    </div>
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
                    <span className={styles.icone}>👤 </span> 
                    {role}
                </div>
            </div>
        </section>
    );
};

export default UserProfileCard;