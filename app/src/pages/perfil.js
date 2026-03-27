import React, { useState } from 'react';
import styles from './perfil.module.css';

export default function perfil() {

    return (
        <>
            <header className={styles['cabecalho-topo']}>
                <h1>Champion's Body</h1>
                <p>Meu Perfil</p>
            </header>

            <main className={styles['container-perfil']}>

                <section className={`${styles.cartao} ${styles['cartao-usuario']}`}>
                    <div className={styles.avatar}>
                        <label htmlFor="uploadFoto" style={{ cursor: 'pointer' }}>

                            {fotoPerfil ? (
                                <img
                                    src={fotoPerfil}
                                    alt="Perfil"
                                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                            ) : (
                                <div className={styles['avatar-placeholder']}>RC</div>
                            )}
                        </label>
                        <input
                            type="file"
                            id="uploadFoto"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={lidarComUpload}
                        />
                    </div>

                    <div className={styles['informacoes-usuario']}>
                        <h2 className={styles.nome}>{usuario.nome}</h2>
                        <p className={styles.email}>{usuario.email}</p>
                        <div className={styles['badge-aluno']}>
                            <span className={styles.icone}>👤</span> Aluno
                        </div>
                    </div>
                </section>


                <button className={styles['btn-editar']}>Editar Perfil</button>
            </main>
        </>
    );
}