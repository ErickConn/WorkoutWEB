import React, { useEffect } from 'react';
import styles from './ConfirmModal.module.css';

/**
 * Modal de confirmação reutilizável.
 *
 * Props:
 *  - show       {boolean}   controla visibilidade
 *  - onConfirm  {function}  chamado ao confirmar
 *  - onCancel   {function}  chamado ao cancelar ou clicar fora
 *  - title      {string}    título do modal
 *  - message    {string}    mensagem descritiva
 *  - confirmLabel {string}  texto do botão de confirmação (padrão: "Confirmar")
 *  - cancelLabel  {string}  texto do botão de cancelamento (padrão: "Cancelar")
 *  - variant    {'danger'|'warning'}  cor do botão de confirmação (padrão: 'danger')
 *  - icon       {string}    emoji/ícone exibido acima do título
 */
export default function ConfirmModal({
    show,
    onConfirm,
    onCancel,
    title = 'Tem certeza?',
    message = '',
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    variant = 'danger',
    icon = '⚠️',
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

    if (!show) return null;

    return (
        <div
            className={styles.overlay}
            onClick={onCancel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-modal-title"
        >
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.icon}>{icon}</div>
                <h2 className={styles.title} id="confirm-modal-title">{title}</h2>
                {message && <p className={styles.message}>{message}</p>}

                <div className={styles.actions}>
                    <button
                        id="confirm-modal-cancel"
                        className={styles.btnCancel}
                        onClick={onCancel}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        id="confirm-modal-confirm"
                        className={`${styles.btnConfirm} ${styles[variant]}`}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
