import axios from 'axios';

const REAL_API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');

export const getLoggedUserEmail = () => {
    return localStorage.getItem('usuarioLogadoEmail');
};

export const getUserByEmail = async (email) => {
    if (!email) return null;
    try {
        const { data: users } = await axios.get(`${REAL_API_URL}/users`);
        const user = users.find((u) => u.email === email);
        if (user) {
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
        const { data: users } = await axios.get(`${REAL_API_URL}/users`);
        const user = users.find(u => u.email === email);
        return user?._id || user?.id || null;
    } catch (err) {
        console.error('Erro ao buscar ID do usuário por email:', err);
        return null;
    }
};

export const getLoggedUser = async () => {
    const email = getLoggedUserEmail();
    return await getUserByEmail(email);
};

export const getLoggedUserRole = async () => {
    const user = await getLoggedUser();
    return user?.usuario?.role || null;
};
