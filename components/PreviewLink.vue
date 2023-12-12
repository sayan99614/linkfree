<template>
  <div
    class="bg-gray-200 rounded-3xl w-full flex px-5 py-2.5 mt-2 cursor-pointer hover:bg-gray-300 transition-all duration-200 ease-in-out hover:transform hover:scale-105"
    @click="openLink"
  >
    <p>{{ title }}</p>
  </div>
</template>
<script setup>
const props = defineProps(["link", "title"]);
const openLink = () => {
  return window.open(props.link, "_blank");
};
</script>
<style scoped></style>
