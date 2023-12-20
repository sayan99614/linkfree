<template>
  <div
    class="flex flex-col md:flex-row md:items-center items-start gap-2 md:justify-between md:rounded-2xl md:shadow-sm md:pl-6 pl-4 py-2 md:mx-10 bg-[#dfe8f9] md:mt-3"
  >
    <div class="flex items-center justify-between gap-3">
      <Icon name="mdi:information-slab-circle-outline" size="22" />
      <p class="font-medium">
        Your linkfree url is live under:
        <NuxtLink
          class="border-b border-b-black font-light"
          target="_blank"
          :to="`/linkspreview/${user.username}`"
          >linkfree/{{ user.username }}</NuxtLink
        >
      </p>
    </div>
    <div
      class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 ml-8 md:ml-0 md:mr-3"
    >
      <p>Share your Linktree to your socials</p>
      <button
        class="px-4 py-2 lg:px-6 lg:py-3 rounded-full border-2 bg-white border-gray-200 hover:bg-gray-200 text-center font-semibold"
        @click="copyLink"
      >
        Copy URL
      </button>
    </div>
  </div>
</template>
<script setup>
const { user } = useUserStore();
const copyLink = () => {
  navigator.clipboard.writeText(
    `http://localhost:3000/linkspreview/${user.username}`
  );
  alert("copied link to clipboard");
};
</script>
<style scoped></style>
