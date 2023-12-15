<template>
  <div
    class="w-full bg-gray-100 shadow-md p-8 pb-4 rounded-2xl grid grid-cols-[10%_60%_30%] items-center lg:gap-12 mt-5 relative"
  >
    <Icon name="mdi:dots-grid" size="24" />
    <input
      type="text"
      class="bg-gray-100 border-none outline-none text-center"
      placeholder="Title"
      v-model="inputComputedValue"
    />

    <div class="flex flex-col gap-8 mt-10">
      <Icon
        :name="!shouldShow ? 'bi:toggle-off' : 'bi:toggle-on'"
        size="36"
        class="cursor-pointer transition-all duration-500 ease-in"
        @click="emit('changeHeaderVisibility')"
      />
      <Icon
        name="solar:trash-bin-trash-outline"
        size="24"
        class="cursor-pointer"
        @click="emit('deleteHeader', id)"
      />
    </div>

    <UpDown
      :show-up="showUp"
      :show-down="showDown"
      @move-up="emit('moveHeaderUp')"
      @move-down="emit('moveHeaderDown')"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  id: Number,
  value: String,
  shouldShow: Boolean,
  showUp: Boolean,
  showDown: Boolean,
});

const emit = defineEmits([
  "update:value",
  "deleteHeader",
  "changeHeaderVisibility",
  "moveHeaderUp",
  "moveHeaderDown",
]);

const inputComputedValue = computed({
  get: () => props.value,
  set: (value) => emit("update:value", value),
});
</script>
<style scoped></style>
