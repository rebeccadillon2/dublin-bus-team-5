export function setToken(token) {
  window.localStorage.setItem("token", token);
}

export function removeToken() {
  window.localStorage.removeItem("token");
}

export function getToken() {
  return window.localStorage.getItem("token");
}

export function getPayload() {
  if (!window) {
    return false;
  }
  const userToken = getToken();
  if (!userToken) return false;
  const segments = userToken.split(".");
  if (segments.length < 3) return false;
  return JSON.parse(atob(segments[1]));
}

export function isUserAuthenticated() {
  const payload = getPayload();
  if (!payload) return false;
  const now = Math.round(Date.now() / 1000);
  return now < payload.exp;
}
