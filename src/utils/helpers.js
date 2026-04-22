import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://json-server-wweb.onrender.com";

export async function getHistoricoByUserId(userId) {
  try {
    const { data: historicos } = await axios.get(`${API_URL}/historico_usuario`);
    return historicos.find(h => String(h.userId) === String(userId));
  } catch (err) {
    console.error("Erro ao buscar histórico do usuário:", err);
    return null;
  }
}