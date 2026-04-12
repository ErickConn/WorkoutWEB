import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    // Verifica se o usuário tem uma "sessão" ativa no navegador
    const emailLogado = localStorage.getItem('usuarioLogadoEmail');

    // Se NÃO tiver ninguém logado, redireciona para a tela inicial (Login)
    if (!emailLogado) {
        // O "replace" apaga o histórico, impedindo que a pessoa clique em "Voltar" e burle o sistema
        return <Navigate to="/" replace />;
    }

    // Se estiver tudo certo, renderiza a tela que ele tentou acessar
    return children;
}