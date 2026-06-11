import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');

/**
 * Extrai uma mensagem de erro legível de qualquer formato de erro:
 * - string (rejectWithValue do Redux Toolkit via .unwrap())
 * - SerializedError do Redux Toolkit (objeto com campo `message`)
 * - objeto axios (err.response.data.message)
 * - Error nativo
 *
 * @param {*} err - O erro capturado no catch
 * @param {string} [fallback] - Mensagem padrão caso nenhuma seja extraída
 * @returns {string}
 */
export function getErrorMessage(err, fallback = 'Ocorreu um erro. Tente novamente.') {
    if (!err) return fallback;
    if (typeof err === 'string') return err || fallback;
    // SerializedError do Redux Toolkit ou Error nativo
    if (typeof err?.message === 'string') return err.message || fallback;
    // Resposta axios aninhada (quando não se usa .unwrap())
    if (typeof err?.response?.data?.message === 'string') return err.response.data.message || fallback;
    return fallback;
}

export async function getHistoricoByUserId(userId) {
  try {
    const { data } = await axios.get(`${API_URL}/historico/usuario/${userId}/progresso`);
    return data || null;
  } catch (err) {
    console.error("Erro ao buscar histórico do usuário:", err);
    return null;
  }
}