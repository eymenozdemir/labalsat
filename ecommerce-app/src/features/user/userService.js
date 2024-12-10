import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const register = async (userData) => {
    console.log(userData);
    const response = await axios.post(`${base_url}user/register`, userData);
    if (response.data) {
        if (response.data) {
            localStorage.setItem("customer", JSON.stringify(response.data)); //loginde olmicak mı
        }
        return response.data;
    }
};

const login = async (userData) => {
    const response = await axios.post(`${base_url}user/login`, userData);
    if (response.data) {
        //console.log(JSON.stringify(response.data));
        localStorage.setItem("customer", JSON.stringify(response.data));
        return response.data;
    }
};

const getUserWishlist = async (config2) => {
    //console.log(`${base_url}user/wishlist`);
    const response = await axios.get(`${base_url}user/wishlist`, config2);
    if (response.data) {
        return response.data;
    }
};

const addToCart = async (cartData) => {
    //console.log("datalar", cartData);
    const response = await axios.post(`${base_url}user/cart`, cartData, cartData.config);
    //console.log("addToCarta girdi service",cartData, response);
    if (response.data) {
        return response.data;
    }
};

const getCart = async (data) => {
    //console.log("getcarda girdi", data);
    const response = await axios.get(`${base_url}user/cart`, data);
    if (response.data) {
        return response.data;
    }
};

const removeProductFromCart = async (data) => {
    const response = await axios.delete(`${base_url}user/delete-product-cart/${data.id}`, data.config2);
    if (response.data) {
        return response.data;
    }
};

const updateProductFromCart = async (cartDetail) => { //delete?
    const response = await axios.delete(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`, config);
    if (response.data) {
        return response.data;
    }
};

const createOrder = async (orderDetail) => { 
    //console.log("createdddddd Service", orderDetail, orderDetail.config);
    const response = await axios.post(`${base_url}user/cart/create-order`,orderDetail, orderDetail.config);
    if (response.data) {
        return response.data;
    }
};

const getUserOrders = async (config2) => {
    const response = await axios.get(`${base_url}user/getmyorders`, config2);
    if (response.data) {
        return response.data;
    }
};

const updateUser = async (data) => {
    const response = await axios.put(`${base_url}user/edit-user`, data.data, data.config2);
    if (response.data) {
        return response.data;
    }
};

const forgotPassToken = async (data) => {
    const response = await axios.post(`${base_url}user/forgot-password-token`, data);
    if (response.data) {
        return response.data;
    }
};

const resetPass = async (data) => {
    const response = await axios.put(`${base_url}user/reset-password/${data.token}`, {password:data?.password});
    if (response.data) {
        return response.data;
    }
};

const emptyCart = async (data) => {
    const response = await axios.delete(`${base_url}user/empty-cart`, data);
    if (response.data) {
        return response.data;
    }
};

export const authService = {
    register,
    login,
    getUserWishlist,
    addToCart,
    getCart,
    removeProductFromCart,
    updateProductFromCart,
    createOrder,
    getUserOrders,
    updateUser,
    forgotPassToken,
    resetPass,
    emptyCart,
};