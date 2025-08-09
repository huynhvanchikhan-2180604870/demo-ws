import axios from "axios";
import { IP_PUBLIC } from "./baseUrl";

export const API_BASE_URL = `http://${IP_PUBLIC}:5000`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});
