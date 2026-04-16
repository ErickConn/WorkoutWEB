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
    return (dispatch) => {
        dispatch(makeRequest());
        axios.post(`${API_URL}/biometria`, biometriaData)
            .then((res) => {
                const newBiometria = res.data;
                console.log('Novo dado biométrico criado:', newBiometria);
                dispatch(fetchBiometriaList());
            }).catch(err => {
                dispatch(failRequest(err.message));
            })
    }
}

export const updateBiometria = (id, updatedData) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.patch(`${API_URL}/biometria/${id}`, updatedData)
            .then((res) => {
                const updatedBiometria = res.data;
                console.log('Dados biométricos atualizados:', updatedBiometria);
                dispatch({
                    type: UPDATE_BIOMETRIA,
                    payload: updatedBiometria
                });
            }).catch(err => {
                dispatch(failRequest(err.message));
            })
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