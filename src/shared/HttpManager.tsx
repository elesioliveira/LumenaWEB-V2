
import axios from "axios";

//DEV
export const urlBase = "http://localhost:5037/API/V1/";
export const urlImages = "http://localhost:5037/";

//PROD
// const urlBase = "https://hmlv2api.avaliadordigital.com.br/API/V1";

export const api = axios.create({
  baseURL: urlBase,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});
