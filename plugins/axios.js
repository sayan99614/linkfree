import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.baseURL = "http://localhost:800/api";
  axios.defaults.withCredentials = true;

  return {
    provide: {
      axios: axios,
    },
  };
});
