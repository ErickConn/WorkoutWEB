import axios from 'axios';

const API_URL = "https://json-server-wweb.onrender.com";

export const getLoggedUserEmail = () => {
    return localStorage.getItem('usuarioLogadoEmail');
};

export const getUserByEmail = async (email) => {
    if (!email) return null;
    try {
        const { data: biometria } = await axios.get(`${API_URL}/biometria`);
        return biometria.find((item) => item.usuario.email === email) || null;
    } catch (err) {
        console.error('Erro ao buscar usuário por email:', err);
        return null;
    }
};

export const getUserIdFromEmail = async () => {
    const email = getLoggedUserEmail();
    const user = await getUserByEmail(email);
    return user?.usuario?.id || null;
};
