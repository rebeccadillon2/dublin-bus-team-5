import axios from "axios";

export function getLiveWeather() {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=53.336066&lon=-6.280944&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
  );
}

export function getForecastWeather() {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=53.336066&lon=-6.280944&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
  );
}

export function getSixteenDay() {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/forecast/daily?lat=53.336066&lon=-6.280944&cnt=16&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
  );
}
