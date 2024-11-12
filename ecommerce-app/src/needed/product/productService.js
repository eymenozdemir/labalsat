import axios from "axios";
import { config, base_url } from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};
const offerProduct = async (product) => {
  //const response = await axios.post(`${base_url}product/`, product, config);
  const response = await axios.post(`${base_url}product/`, product);
  return response.data;
};

const productService = {
  getProducts,
  offerProduct,
};

export default productService;
