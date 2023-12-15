<template>
  <div class="absolute flex flex-col items-center gap-8 right-1">
    <Icon
      name="ep:caret-top"
      size="22"
      class="cursor-pointer hover:transition-all hover:scale-125 duration-150"
      v-if="showUp"
      @click="emit('moveUp')"
    />
    <Icon
      name="ep:caret-bottom"
      size="22"
      class="cursor-pointer hover:transition-all hover:scale-125 duration-150"
      v-if="showDown"
      @click="emit('moveDown')"
    />
  </div>
</template>
<script setup>
defineProps({
  showUp: Boolean,
  showDown: Boolean,
});

const emit = defineEmits(["moveUp", "moveDown"]);
</script>
<style scoped></style>
