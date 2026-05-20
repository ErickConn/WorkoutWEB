import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');

export async function getHistoricoByUserId(userId) {
  try {
    const { data } = await axios.get(`${API_URL}/historico/usuario/${userId}/progresso`);
    return data || null;
  } catch (err) {
    console.error("Erro ao buscar histórico do usuário:", err);
    return null;
  }
}