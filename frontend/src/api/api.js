import axios from "axios";

const api = axios.create({
  baseURL:"https://ajaia-docs-backend-zbin.onrender.com"
});

export default api;