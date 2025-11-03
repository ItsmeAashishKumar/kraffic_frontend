import axios from "axios";

const API_BASE_URL = "https://ktraffic-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
