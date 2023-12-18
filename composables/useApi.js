import axios from "axios";

export const useApi = () => {
  const baseURL = "http://localhost:5000/api/v1";
  const userStore = useUserStore();

  return axios.create({
    baseURL,
  });
};
