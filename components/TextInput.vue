<template>
  <div class="mb-6">
    <input
      :class="['inp', error ? 'border border-sky-500' : '']"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      autocomplete="off"
      v-model="inputComputedValue"
    />
    <p class="mt-3 text-sm" v-if="error">
      <span class="font-medium text-['#f76707']">{{ error }}</span>
    </p>
  </div>
</template>
<script setup>
const props = defineProps({
  id: String,
  type: String,
  placeholder: String,
  required: Boolean,
  value: String,
  error: String,
});

const emit = defineEmits();

const inputComputedValue = computed({
  get: () => props.value,
  set: (value) => emit("update:value", value),
});
</script>
<style scoped></style>
