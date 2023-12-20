<template>
  <div
    class="w-full bg-gray-100 shadow-md p-8 pb-4 rounded-2xl grid grid-cols-[10%_60%_30%] items-center lg:gap-12 mt-5 relative"
  >
    <Icon name="mdi:dots-grid" size="24" />
    <input
      type="text"
      class="bg-gray-100 border-none outline-none text-center"
      placeholder="Title"
      :disabled="!isNew"
      v-model="inputComputedValue"
    />

    <div v-if="isNew">
      <button
        @click="emit('saveHeader')"
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5"
      >
        save
      </button>
    </div>

    <div class="flex flex-col gap-8 mt-10" v-if="!isNew">
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
      v-if="!isNew"
      :show-up="showUp"
      :show-down="showDown"
      @move-up="emit('moveHeaderUp')"
      @move-down="emit('moveHeaderDown')"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  id: String,
  isNew: Boolean,
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
  "saveHeader",
]);

const inputComputedValue = computed({
  get: () => props.value,
  set: (value) => emit("update:value", value),
});
</script>
<style scoped></style>
