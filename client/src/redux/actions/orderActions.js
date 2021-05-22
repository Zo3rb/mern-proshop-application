import axios from 'axios';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL
} from '../constants/orderConstants';

// Adding The API URL into a Variable
const API_URL = 'http://localhost:5000/api';

export const createOrder = order => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.post(`${API_URL}/orders`, order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};
