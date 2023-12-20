<template>
  <div class="w-full z-30">
    <div
      v-if="!userStore.isMobile"
      class="w-full flex items-center justify-between md:pt-2.5 md:px-2"
    >
      <div
        class="flex items-center justify-between md:rounded-full md:shadow-sm md:pl-6 pl-4 py-3 bg-white w-full border-b"
      >
        <div class="flex items-center justify-start w-full max-w-[500px]">
          <NuxtLink to="/admin">
            <img
              src="~assets/images/linktree-logo-icon.png"
              class="w-6 min-w-[23px] select-none"
              alt="linkfree-icon"
            />
          </NuxtLink>
          <div v-for="link in links" class="lg:px-2.5 px-0.5 md:block hidden">
            <NuxtLink
              :to="link.url"
              class="flex items-center text-sm font-semibold px-2 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out"
            >
              <Icon
                :name="link.icon"
                size="22"
                class="mr-0.5"
                :color="route.fullPath === link.url ? '#000' : '#676B5F'"
              />
              <p>{{ link.name }}</p>
            </NuxtLink>
          </div>
        </div>
        <div class="flex gap-3 items-center justify-end px-5 text-sm">
          <button class="p-2 hidden md:block rounded-lg hover:bg-gray-100">
            <Icon
              name="healthicons:megaphone-outline"
              class="font-semibold"
              size="22"
            />
          </button>
          <button
            class="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 flex justify-center items-center font-semibold"
          >
            <Icon name="mdi:lightning-bolt" size="22" />
            <p>Upgrade</p>
          </button>
          <button
            class="px-4 py-2 rounded-full border-2 border-gray-200 hover:bg-gray-200 flex justify-center items-center font-semibold gap-2"
          >
            <Icon name="material-symbols:share-outline" size="22" />
            <p>Share</p>
          </button>

          <button
            class="md:block rounded-full hidden border-2 border-spacing-12 p-0.5 border-white hover:border-sky-400"
            @click="() => (!isTopNav ? openMenu('TopNav') : (isTopNav = false))"
          >
            <img
              src="https://picsum.photos/300/300"
              class="rounded-full min-w-[40px] w-[40px]"
              alt="profileImg"
            />
          </button>
        </div>
      </div>
      <div
        v-if="isTopNav"
        class="absolute hidden right-8 top-[4.8rem] bg-white shadow-md rounded-lg w-full max-w-[300px] md:flex flex-col gap-4 justify-center"
      >
        <button
          class="flex gap-6 items-center hover:bg-gray-200 mx-2 p-2 mb-2 rounded-lg font-semibold"
          @click="logoutUser"
        >
          <Icon name="ic:baseline-log-out" size="22" />
          <p>Logout</p>
        </button>
      </div>
    </div>
    <div class="flex justify-between items-center bg-white px-16 md:hidden">
      <div v-for="link in linksMobile" class="py-3 text-xs">
        <NuxtLink
          :to="link.url"
          class="flex flex-col gap-1 items-center justify-center text-sm"
        >
          <Icon
            :name="link.icon"
            size="22"
            :color="route.fullPath === link.url ? '#000' : '#676B5F'"
            v-if="link.icon"
          />
          <button
            class="flex flex-col gap-1 items-center justify-center text-xs rounded-full"
            v-if="link.img"
          >
            <img
              :src="link.img"
              class="rounded-full min-w-[22px] w-[22px]"
              alt="profileImg"
            />
          </button>
          <p>{{ link.name }}</p>
        </NuxtLink>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const links = ref([
  { name: "Links", url: "/admin", icon: "icon-park-outline:hamburger-button" },
  {
    name: "Apperance",
    url: "/admin/apperance",
    icon: "fluent:shapes-48-regular",
  },
  { name: "Analytics", url: "/", icon: "tabler:brand-google-analytics" },
  { name: "Settings", url: "/", icon: "material-symbols:settings" },
]);

const linksSecondaryNav = ref([
  { name: "Links", url: "/admin", icon: "icon-park-outline:hamburger-button" },
  {
    name: "Apperance",
    url: "/admin/apperance",
    icon: "fluent:shapes-48-regular",
  },
  { name: "Analytics", url: "/", icon: "tabler:brand-google-analytics" },
  { name: "More", url: "/admin/more", icon: "", img: userStore.image },
]);

const linksMobile = ref([
  {
    name: "Links",
    url: "/admin",
    icon: "icon-park-outline:hamburger-button",
    img: "",
  },
  {
    name: "Apperance",
    url: "/admin/apperance",
    icon: "fluent:shapes-48-regular",
    img: "",
  },
  {
    name: "Preview",
    url: "/admin/preview",
    icon: "icon-park-outline:preview-open",
    img: "",
  },
  {
    name: "Analytics",
    url: "/",
    icon: "tabler:brand-google-analytics",
    img: "",
  },
  {
    name: "More",
    url: "/admin/more",
    icon: "",
    img: "https://picsum.photos/300/300",
  },
]);

const isTopNav = ref(false);
const isSecondaryTopNav = ref(false);
const windowWidth = ref(process.client ? window.innerWidth : 0);

const openMenu = (menu) => {
  if (menu === "TopNav") {
    isTopNav.value = true;
  } else if (menu === "SecondaryTopNav") {
    isSecondaryTopNav.value = true;
  } else {
    router.push("/admin/settings");
  }
};

onMounted(() => {
  window.addEventListener("resize", () => {
    windowWidth.value = window.innerWidth;
  });
});

watch(
  () => windowWidth.value,
  () => {
    if (windowWidth.value <= 767) {
      isTopNav.value = false;
    }
  }
);

const logoutUser = () => {
  userStore.logoutUser();
  router.replace("/");
};
</script>
<style scoped></style>
