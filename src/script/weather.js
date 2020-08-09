import { API } from "../script/api";
import { API_KEY } from "../key/index";

export async function weatherData(cityName) {
  try {
    const { data, statusText } = await API.get(
      `/forecast/daily?city=${cityName}&key=${API_KEY}&lang=fr&days=8`
    );
    if (statusText === "OK") {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
}
