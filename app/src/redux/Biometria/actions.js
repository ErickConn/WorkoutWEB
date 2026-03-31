import { MAKE_REQUEST } from "./actionType";
import { FAIL_REQUEST } from "./actionType";
import { GET_BIOMETRIA_LIST } from "./actionType";
import axios from 'axios';
const API_URL = "https://json-server-wweb.onrender.com";

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