import axios from "axios";
import { baseUrl, headers } from ".";

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
