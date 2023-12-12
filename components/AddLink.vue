<template>
  <div class="relative bg-white w-full rounded-2xl add__link">
    <Icon
      class="cross-icon cursor-pointer hover:bg-slate-100 rounded-full p-1"
      name="line-md:close"
      size="32"
      @click="emit('changeLinkVisibility')"
    />
    <h1 class="text-lg font-semibold">Enter URL</h1>
    <form @submit.prevent="createLink">
      <div class="flex flex-col gap-3">
        <div>
          <TextInput
            id="link"
            type="text"
            placeholder="enter title"
            class="link-inp"
            v-model:value="linkForm.title"
            :required="true"
          />
          <TextInput
            id="link"
            type="text"
            placeholder="enter link"
            class="link-inp"
            v-model:value="linkForm.link"
            :required="true"
          />
        </div>
        <button type="submit" class="bg-gray-100 px-6 py-2 rounded-full">
          Add
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import TextInput from "./TextInput.vue";
const emit = defineEmits(["changeLinkVisibility", "createLinkUrl"]);

const linkForm = ref({
  link: "",
  title: "",
});

const createLink = () => {
  emit("createLinkUrl", linkForm.value.link, linkForm.value.title);
  emit("changeLinkVisibility");
  linkForm.value.link = "";
};
</script>
<style scoped>
.relative {
  position: relative;
}
.cross-icon {
  position: absolute;
  top: 18px;
  right: 24px;
}
.link-inp {
  width: 100%;
  margin-top: 1rem;
}

form {
  margin-top: 12px;
}

.add__link {
  padding: 2rem 3rem;
}
</style>
