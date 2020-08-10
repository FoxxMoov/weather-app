import axios from "axios";

export const API_URL = "http://api.openweathermap.org";

export const API = new axios.create({
  baseURL: API_URL,
});
