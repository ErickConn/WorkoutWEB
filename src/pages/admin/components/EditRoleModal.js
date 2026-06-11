import React, { useEffect } from 'react';
import styles from '../admin.module.css';

/**
 * Modal para editar o role de um usuário.
 * A alteração é salva automaticamente ao clicar em uma opção.
 *
 * Props:
 *  - show       {boolean}
 *  - user       {object}     usuário sendo editado
 *  - role       {string}     role selecionado atualmente no modal
 *  - onRoleChange {function} callback quando o role muda (dispara o save)
 *  - onCancel   {function}
 *  - loading    {boolean}
 */
export default function EditRoleModal({
    show,
    user,
    role,
    onRoleChange,
    onCancel,
    loading = false,
}) {
    // Fecha com tecla Escape
    useEffect(() => {
        if (!show) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onCancel?.();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [show, onCancel]);

    if (!show || !user) return null;

    const roles = [
        { value: 'admin', label: 'Administrador', icon: '🛡️', desc: 'Acesso total ao sistema' },
        { value: 'aluno', label: 'Aluno', icon: '🏋️', desc: 'Acesso padrão de aluno' },
    ];

    return (
        <div
            className={styles.modalOverlay}
            onClick={onCancel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-role-modal-title"
        >
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.modalTitle} id="edit-role-modal-title">
                    Alterar Cargo
                </h2>
                <p className={styles.modalSubtitle}>
                    {user.nome} — {user.email}
                </p>

                <div className={styles.roleOptions}>
                    {roles.map((r) => (
                        <div
                            key={r.value}
                            className={`${styles.roleOption} ${role === r.value ? styles.roleOptionSelected : ''} ${loading ? styles.roleOptionDisabled : ''}`}
                            onClick={() => !loading && onRoleChange(r.value)}
                            id={`role-option-${r.value}`}
                        >
                            <div className={styles.roleOptionRadio}>
                                <div className={styles.roleOptionRadioDot} />
                            </div>
                            <span className={styles.roleOptionIcon}>{r.icon}</span>
                            <div>
                                <div className={styles.roleOptionLabel}>{r.label}</div>
                                <div className={styles.roleOptionDesc}>{r.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.modalActions}>
                    <button
                        id="edit-role-close"
                        className={styles.btnModalCancel}
                        onClick={onCancel}
                        style={{ flex: 'unset', width: '100%' }}
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}
