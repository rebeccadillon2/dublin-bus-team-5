import axios from "axios";

const devUrl = `http://127.0.0.1:8000`;
const prodUrl = ``;
const baseUrl = process.env.NODE_ENV === "production" ? prodUrl : devUrl;

function headers() {
  return {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
}

// OPEN WEATHER
export function getLiveWeather() {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=53.336066&lon=-6.280944&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
  );
}

// USERS
export function registerUser(formData) {
  return axios.post(`${baseUrl}/api/auth/register/`, formData);
}

export function loginUser(formData) {
  return axios.post(`${baseUrl}/api/auth/login/`, formData);
}

export function getUser(userId) {
  return axios.get(`${baseUrl}/api/auth/profile/${userId}/`, headers());
}

export function editUser(userId, formData) {
  return axios.put(
    `${baseUrl}/api/auth/profile/${userId}/edit/`,
    formData,
    headers()
  );
}

// SPOTIFY
export function isSpotifyAuthenticated() {
  return axios.get(`${baseUrl}/api/spotify/is-authenticated/`, headers());
}

export function getSpotifyAuthUrl() {
  return axios.get(`${baseUrl}/api/spotify/get-auth-url/`, headers());
}
