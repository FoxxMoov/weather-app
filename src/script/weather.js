import { API } from "../script/api";
import { API_KEY } from "../key/index";

export async function weatherData(cityName) {
  try {
    const { data } = await API.get(
      `/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=fr`
    );
    if (data.cod === "200") {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
}
