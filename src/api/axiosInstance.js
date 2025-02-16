import axios from "axios";

const api = axios.create({
  baseURL: "https://zackinthebox.shop",
  withCredentials: true,
});

export default api;
