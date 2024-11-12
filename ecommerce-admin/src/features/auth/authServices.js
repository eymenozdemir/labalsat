import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  //console.log("serviceeddddd 1", user);
  const response = await axios.post(`${base_url}user/admin-login`, user);
  //console.log("serviceeddddd 2", response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async () => {
  //console.log("service girdi", config);
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};

const deleteOrder = async (id) => {
  const response = await axios.delete(`${base_url}user/order/${id}`, config);
  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  deleteOrder,
};

export default authService;
