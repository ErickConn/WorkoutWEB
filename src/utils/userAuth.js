import axios from 'axios';

const REAL_API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');

export const getLoggedUserEmail = () => {
    return localStorage.getItem('usuarioLogadoEmail');
};

export const getUserByEmail = async (email) => {
    if (!email) return null;
    try {
        // Rota autenticada que retorna o usuário logado via cookie/token
        const { data: user } = await axios.get(`${REAL_API_URL}/user/me`, { withCredentials: true });
        if (user && user.email === email) {
            return { usuario: user };
        }
        return null;
    } catch (err) {
        console.error('Erro ao buscar usuário por email na nova API:', err);
        return null;
    }
};

export const getUserIdFromEmail = async () => {
    const email = getLoggedUserEmail();
    if (!email) return null;
    try {
        const { data: user } = await axios.get(`${REAL_API_URL}/user/me`, { withCredentials: true });
        if (!user) return null;
        return user._id || user.id || null;
    } catch (err) {
        console.error('Erro ao buscar ID do usuário por email:', err);
        return null;
    }
};

export const getLoggedUser = async () => {
    const email = getLoggedUserEmail();
    // Se tiver email salvo, tenta obter o usuário autenticado via cookie
    try {
        const { data: user } = await axios.get(`${REAL_API_URL}/user/me`, { withCredentials: true });
        return user ? { usuario: user } : await getUserByEmail(email);
    } catch (err) {
        return await getUserByEmail(email);
    }
};

export const getLoggedUserRole = async () => {
    const user = await getLoggedUser();
    return user?.usuario?.role || null;
};
