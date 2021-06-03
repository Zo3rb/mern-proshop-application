import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_BY_ADMIN_REQUEST,
    USER_UPDATE_BY_ADMIN_SUCCESS,
    USER_UPDATE_BY_ADMIN_FAIL
} from '../constants/userConstants';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';

// Adding The API URL into a Variable
const API_URL = 'http://localhost:5000/api';

export const loginUser = (email, password) => async dispatch => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const { data } = await axios.post(`${API_URL}/users/login`, { email, password });
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
    dispatch({ type: USER_LIST_RESET });
};

export const registerUser = (name, email, password) => async dispatch => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const { data } = await axios.post(`${API_URL}/users`, { name, email, password });
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const getUserDetails = id => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.get(`${API_URL}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const updateUserProfile = user => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.put(`${API_URL}/users/profile`, user, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    };
};

export const deleteUser = id => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });
        const { userLogin: { userInfo } } = getState();
        await axios.delete(`${API_URL}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: USER_DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    };
};

export const updateUser = user => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_BY_ADMIN_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.put(`${API_URL}/users/${user._id}`, user, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: USER_UPDATE_BY_ADMIN_SUCCESS });
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
        dispatch({ type: USER_DETAILS_RESET });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_BY_ADMIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    };
};
