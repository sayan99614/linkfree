<template>
  <div
    class="w-full bg-gray-100 shadow-md p-8 pb-4 rounded-2xl grid grid-cols-[10%_60%_30%] items-center lg:gap-12 mt-5"
  >
    <Icon name="mdi:dots-grid" size="24" />
    <p class="overflow-ellipsis">
      {{ link.length > 50 ? `${link.slice(0, 50)}...` : link }}
    </p>

    <div class="flex flex-col gap-8 mt-10">
      <Icon
        :name="!shouldShow ? 'bi:toggle-off' : 'bi:toggle-on'"
        size="36"
        class="cursor-pointer transition-all duration-500 ease-in"
        @click="emit('changeLinkVisibility', id)"
      />
      <Icon
        name="solar:trash-bin-trash-outline"
        size="24"
        class="cursor-pointer"
        @click="emit('deleteLink', id)"
      />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  id: Number,
  link: String,
  shouldShow: Boolean,
});

const emit = defineEmits(["deleteLink", "changeLinkVisibility"]);
</script>
<style scoped></style>
