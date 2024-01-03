import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";
export const useUserStore = defineStore("user", {
  state: () => ({
    updatedLinkId: 0,
    isMobile: false,
    isPreviewOverlay: false,
    addLinkOverlay: false,
    id: null,
    colors: [],
    user: {},
    token: "",
  }),
  actions: {
    async registerUser(user) {
      const api = useApi();
      try {
        const response = await api.post("/users/signup", user);
        this.user = response.data.data;
        localStorage.setItem("token", JSON.stringify(response.data.token));
        return response.data.data;
      } catch (error) {
        if (error && error.response) {
          alert(error.response.data.message);
        } else {
          alert("Something went wrong please try again");
        }
        return null;
      }
    },
    async loginUser(user) {
      const api = useApi();

      try {
        const response = await api.post("/users/login", user);
        this.user = response.data.data;
        this.token = response.data.token;
        localStorage.setItem("token", JSON.stringify(response.data.token));
        return response.data.data;
      } catch (error) {
        if (error && error.response) {
          alert(error.response.data.message);
        } else {
          alert("Something went wrong please try again");
        }
        return null;
      }
    },

    async getUser() {
      const api = useApi();
      try {
        if (!localStorage.getItem("token")) {
          throw new Error("Invalid session please login again");
        }
        const response = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });

        this.user = response.data.data.data;
        this.token = JSON.parse(localStorage.getItem("token"));
        return response.data.data;
      } catch (error) {
        return null;
      }
    },

    async updateUser(user) {
      const api = useApi();
      const { token } = useUserStore();
      try {
        if (!token) {
          throw new Error("Invalid session please login again");
        }
        const response = await api.patch("/users/updateMe", user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);
        this.user = response.data.data.user;
        return response.data.data.user;
      } catch (error) {
        return null;
      }
    },

    async logoutUser() {
      this.user = {};
      this.token = "";
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
    },
  },
  getters: {
    isAuthenticated() {
      return Object.keys(this.user).length > 0;
    },
  },
});
