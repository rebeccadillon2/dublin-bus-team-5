export function getPayload() {
  if (!window) {
    return false;
  }
  const userToken = window.localStorage.getItem("token");
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
