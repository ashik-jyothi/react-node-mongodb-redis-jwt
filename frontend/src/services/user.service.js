import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8001/";

const getDashboard = () => {
  return axios.get(API_URL + "dashboard", { headers: authHeader() });
};

export default {
  getDashboard,
};
