const devUrl = `http://127.0.0.1:8000`;
const prodUrl = ``;
export const baseUrl = process.env.NODE_ENV === "production" ? prodUrl : devUrl;

export const headers = () => {
  return {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
};

export * from "./bus";
export * from "./users";
export * from "./spotify";
export * from "./weather";
