import axios from "axios";

export const useApi = () => {
  const baseURL = "/api/v1";
  const userStore = useUserStore();

  return axios.create({
    baseURL,
  });
};
