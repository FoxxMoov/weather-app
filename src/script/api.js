import axios from "axios";

// export const API_URL = "http://api.weatherstack.com";
export const API_URL = "https://api.weatherbit.io/v2.0";

export const API = new axios.create({
  baseURL: API_URL,
});
