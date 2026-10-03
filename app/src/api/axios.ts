import axios from "axios";

const api = axios.create({
  baseURL: `https://aceso-v56m.onrender.com/api`,
});

export default api;
