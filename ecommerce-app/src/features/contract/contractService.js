import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const postQuery = async (contractData) => {
    const response = await axios.post(`${base_url}contract`, contractData);
    if (response.data) {
        return response.data;
    }
};


export const contractService = {
    postQuery,
};