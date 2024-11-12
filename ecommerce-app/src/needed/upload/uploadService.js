import axios from "axios";
import { config, base_url } from "../../utils/axiosConfig";

const uploadImg = async (data,  configNew) => {
  //console.log("tfisgoinon service response", data);
  const response = await axios.post(`${base_url}upload/`, data, configNew);
  return response.data;
};
const deleteImg = async (id, configNew) => {
  //console.log("tfisgoinon service", id);
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`, configNew);
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
