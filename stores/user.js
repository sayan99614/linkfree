import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    updatedLinkId: 0,
    isMobile: false,
    isPreviewOverlay: false,
    addLinkOverlay: false,
    id: null,
    colors: [],
  }),
  actions: {},
});
