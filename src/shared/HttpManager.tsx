
import axios from "axios";

export const urlBase = "/API/V1/";
export const urlImages = "/";

export const api = axios.create({
  baseURL: urlBase,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});
