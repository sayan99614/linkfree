import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";
import { useUserStore } from "~/stores/user";

export const useItemsStore = defineStore("linksnheaders", {
  state: () => ({
    items: [],
  }),
  actions: {
    async getAllItems() {
      try {
        const api = useApi();
        const { token } = useUserStore();
        const response = await api.get("/items?sort=position", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.items = response.data.data.data;
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    async changeItemVisibility(id, visibility) {
      try {
        const api = useApi();
        const { token } = useUserStore();
        const response = await api.patch(
          `/items/${id}`,
          { shouldShow: visibility },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await this.getAllItems();
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    async deleteItem(id) {
      try {
        const api = useApi();
        const { token } = useUserStore();
        const response = await api.delete(`/items/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await this.getAllItems();
        alert("deleted successfully!");
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    async createItem(data) {
      try {
        const api = useApi();
        const { token } = useUserStore();
        const response = await api.post(`/items`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await this.getAllItems();
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    async moveItem(item, move) {
      try {
        const api = useApi();
        const { token, user } = useUserStore();
        const response = await api.patch(
          `/items/moveitem/${item.id}?move=${move}`,
          {
            position: item.position,
            user: user._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await this.getAllItems();
        console.log(item, move);
      } catch (error) {
        alert(error);
      }
    },
  },
});
