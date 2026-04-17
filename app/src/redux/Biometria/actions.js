import { MAKE_REQUEST } from "./actionType";
import { FAIL_REQUEST } from "./actionType";
import { GET_BIOMETRIA_LIST } from "./actionType";
import { UPDATE_BIOMETRIA } from "./actionType";
import { GET_BIOMETRIA_ITEM } from "./actionType";
import { CREATE_BIOMETRIA } from "./actionType";
import { DELETE_BIOMETRIA } from "./actionType";
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || "https://json-server-wweb.onrender.com";

export const makeRequest = () => {
    return {
        type: MAKE_REQUEST
    }
}

export const failRequest = (error) => {
    return {
        type: FAIL_REQUEST,
        payload: error
    }
}

export const getBiometriaList = (data) => {
    return {
        type: GET_BIOMETRIA_LIST,
        payload: data
    }
}
export const fetchBiometriaList = () => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.get(API_URL + '/biometria')
            .then((res) => {
                const biometriaList = res.data;
                console.log('Dados biométricos recebidos:', biometriaList);
                dispatch(getBiometriaList(biometriaList));
            }).catch(err => {
                dispatch(failRequest(err.message));
            })
    }
}

export const createBiometria = (biometriaData) => {
    return async (dispatch) => {
        dispatch(makeRequest());
        try {
            const res = await axios.post(`${API_URL}/biometria`, biometriaData);
            const newBiometria = res.data;
            console.log('Novo dado biométrico criado:', newBiometria);
            
            if (biometriaData.usuario && biometriaData.usuario.id) {
                await axios.post(`${API_URL}/historico_usuario`, {
                    id: String(biometriaData.usuario.id),
                    userId: String(biometriaData.usuario.id),
                    nivel_atividade: "moderado",
                    historico_peso: [],
                    historico_carga: []
                });
            }

            dispatch(fetchBiometriaList());
        } catch (err) {
            dispatch(failRequest(err.message));
        }
    }
}

export const updateBiometria = (id, updatedData) => {
    return async (dispatch) => {
        dispatch(makeRequest());
        try {
            const res = await axios.patch(`${API_URL}/biometria/${id}`, updatedData);
            const updatedBiometria = res.data;
            console.log('Dados biométricos atualizados:', updatedBiometria);
            
            if (updatedBiometria.usuario?.perfil_biometrico?.peso_kg) {
                const userId = updatedBiometria.usuario.id;
                const newWeight = updatedBiometria.usuario.perfil_biometrico.peso_kg;
                
                const { data: historicos } = await axios.get(`${API_URL}/historico_usuario`);
                const userHistory = historicos.find(h => String(h.userId) === String(userId));
                
                if (userHistory) {
                    const dataAtual = new Date().toISOString().split('T')[0];
                    let historicoPeso = userHistory.historico_peso || [];

                    const semanaAtualNum = Math.ceil((new Date() - new Date('2026-01-01')) / (7 * 24 * 60 * 60 * 1000));
                    const novoRegistro = {
                        semana: semanaAtualNum,
                        data: dataAtual,
                        peso_kg: newWeight
                    };

                    historicoPeso.push(novoRegistro);

                    await axios.patch(`${API_URL}/historico_usuario/${userHistory.id}`, {
                        historico_peso: historicoPeso
                    });
                }
            }

            dispatch({
                type: UPDATE_BIOMETRIA,
                payload: updatedBiometria
            });
        } catch (err) {
            dispatch(failRequest(err.message));
        }
    }
}

export const getBiometriaItem = (id) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.get(`${API_URL}/biometria/${id}`)
            .then((res) => {
                const biometriaItem = res.data;
                dispatch({
                    type: GET_BIOMETRIA_ITEM,
                    payload: biometriaItem
                });
            }).catch(err => {
                dispatch(failRequest(err.message));
            })
    }
}

export const deleteBiometria = (id) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.delete(`${API_URL}/biometria/${id}`)
            .then(() => {
                console.log('Dado biométrico deletado, ID:', id);
                dispatch({
                    type: DELETE_BIOMETRIA,
                    payload: id
                });
            }).catch(err => {
                dispatch(failRequest(err.message));
            })
    }
}