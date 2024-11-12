import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProducts = async (userData) => {
    const response = await axios.get(`${base_url}product`);
    if (response.data) {
        return response.data;
    }
};

const getSingleProduct = async (id) => {
    const response = await axios.get(`${base_url}product/${id}`);
    if (response.data) {
        return response.data;
    }
};

const getListedProducts = async (data) => {
    //console.log("getlisteda girdi", data);
    const response = await axios.get(`${base_url}product/listed?${data?.brand?`brand=${data?.brand}&&`:""}${data?.tag?`tags=${data?.tag}&&`:""}${data?.category?`category=${data?.category}&&`:""}${data?.minPrice?`price[gte]=${data?.minPrice}&&`:""}${data?.maxPrice?`price[lte]=${data?.maxPrice}&&`:""}${data?.sort?`sort=${data?.sort}&&`:""}`);
    if (response.data) {
        return response.data;
    }
};

const addToWishlist = async (prodID) => {
    //console.log("girdi", prodID.id, prodID.config2);
    const response = await axios.put(`${base_url}product/wishlist`, {id: prodID.id}, prodID.config2);
    //console.log("cikti", response);
    if (response.data) {
        return response.data;
    }
};

const deleteFromWishlist = async (prodID) => {
    //console.log("girdideleteeee", prodID.id, prodID.config2);
    const response = await axios.put(`${base_url}product/delete-wishlist`, {id: prodID.id}, prodID.config2);
    if (response.data) {
        return response.data;
    }
};

const offerProduct = async (product) => {
    //console.log("giriyo", product, config);
    const response = await axios.post(`${base_url}product/offer`, product.data, product.config2);
    //const response = await axios.post(`${base_url}product/`, product);
    return response.data;
  };

export const productService = {
    getProducts,
    getSingleProduct,
    getListedProducts,
    addToWishlist,
    deleteFromWishlist,
    offerProduct,
};