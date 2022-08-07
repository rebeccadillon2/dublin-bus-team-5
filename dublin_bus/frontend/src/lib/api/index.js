const devUrl = `http://127.0.0.1:8000`;
const prodUrl = `http://127.0.0.1:8000`;
// const devUrl = `http://34.245.27.75`;
// const prodUrl = `http://34.245.27.75`;
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
export * from "./ticketmaster";
