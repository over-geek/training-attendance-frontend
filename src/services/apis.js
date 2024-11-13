import axios from "axios";

export const evalApi = axios.create({
  baseURL: "http://localhost:8080/api/evaluation",
})
