import axios from 'axios';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL
} from '../constants/orderConstants';

// Adding The API URL into a Variable
const API_URL = 'https://mernproshopapplication.herokuapp.com/api';

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

export const getOrderByID = id => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.get(`${API_URL}/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.put(`${API_URL}/orders/${id}/pay`, paymentResult, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        // if (message === 'Not authorized, token failed') {
        //     dispatch(logout())
        // }
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: message,
        });
    };
};

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.get(`${API_URL}/orders/my-orders`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    };
};

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.get(`${API_URL}/orders`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    };
};

export const deliverOrder = order => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVER_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.put(`${API_URL}/orders/${order._id}/deliver`, {}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: message,
        });
    };
};
