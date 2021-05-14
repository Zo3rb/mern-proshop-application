import axios from 'axios';
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
} from '../constants/cartConstants';


const API_URL = 'http://localhost:5000/api';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`${API_URL}/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.product._id,
            name: data.product.name,
            image: data.product.image,
            price: data.product.price,
            countInStock: data.product.countInStock,
            qty,
        },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCart = id => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
