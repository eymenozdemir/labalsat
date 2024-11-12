import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);

  return response.data;
};

const updateProduct = async (product) => {
  //console.log("serviced", config);
  const response = await axios.put(
    `${base_url}product/${product.id}`,
    { title: product.prodData.title, category: product.prodData.category, brand: product.prodData.brand
      , description: product.prodData.description, model: product.prodData.model, submodel: product.prodData.submodel
      , condition: product.prodData.condition, age: product.prodData.age, quantity: product.prodData.quantity
      , currency: product.prodData.currency, price: product.prodData.price, setupPrice: product.prodData.setupPrice, servicePrice: product.prodData.servicePrice
      , tags: product.prodData.tags,images: product.prodImg,status: product.prodData.status, location: product.prodData.location},
    config
  );
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
};

export default productService;
