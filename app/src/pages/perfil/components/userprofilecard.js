import React from 'react';
import styles from '/workspaces/WorkoutWEB/app/src/pages/perfil/perfil.module.css';

const UserProfileCard = ({ fotoUsuario, handleUploadFoto, nome, email, iniciais }) => {
    return (
        <section className={`${styles.cartao} ${styles.cartaoUsuario}`}>
            <div className={styles.avatar}>
                <label htmlFor="uploadFoto" style={{ cursor: 'pointer' }}>
                    {fotoUsuario ? (
                        <img 
                            src={fotoUsuario} 
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
                <div className={styles.badgeAluno}>
                    <span className={styles.icone}>👤</span> Aluno
                </div>
            </div>
        </section>
    );
};

export default UserProfileCard;