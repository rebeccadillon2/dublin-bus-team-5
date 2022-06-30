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

// Users

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

// Google

// export function getRestaurants() {
//   return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&key=${process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY}
// `);
// }
