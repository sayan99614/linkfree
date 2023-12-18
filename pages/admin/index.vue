<template>
  <AdminLayout>
    <div class="grid grid-cols-[70%_30%] h-screen scroll-auto">
      <div class="col-span-2 lg:col-span-1 border-r-[1px] border-r-gray-300">
        <div
          class="flex flex-col md:flex-row md:items-center items-start gap-2 md:justify-between md:rounded-2xl md:shadow-sm md:pl-6 pl-4 py-2 md:mx-10 bg-[#dfe8f9] md:mt-3"
        >
          <div class="flex items-center justify-between gap-3">
            <Icon name="mdi:information-slab-circle-outline" size="22" />
            <p class="font-medium">
              Your linkfree url is live under:
              <a class="border-b border-b-black font-light" href="#"
                >linkfree/dheeman</a
              >
            </p>
          </div>
          <div
            class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 ml-8 md:ml-0 md:mr-3"
          >
            <p>Share your Linktree to your socials</p>
            <button
              class="px-4 py-2 lg:px-6 lg:py-3 rounded-full border-2 bg-white border-gray-200 hover:bg-gray-200 text-center font-semibold"
            >
              Copy URL
            </button>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <div
            class="flex flex-col gap-2 items-center mt-12 w-[60%] max-w-[60%]"
          >
            <button
              class="text-center bg-[#8129d9] w-full py-3 rounded-full text-white hover:bg-[#6c1fc5] font-semibold"
              @click="changeLinkVisibility"
              v-if="!showAddLink"
            >
              Add link
            </button>

            <AddLink
              v-show="showAddLink"
              @change-link-visibility="changeLinkVisibility"
              @create-link-url="createLink"
            />

            <div class="self-start">
              <button
                class="flex gap-3 bg-gray-200 w-full py-3 rounded-full px-8"
                @click="createHeader"
              >
                <Icon name="fe:laptop" class="rotate-180" size="24" />
                Add header
              </button>
            </div>
            <template v-for="(item, index) in previewItems">
              <LinkCard
                v-if="item.type === 'LINK'"
                :id="item.id"
                :link="item.url"
                :should-show="item.shouldShow"
                :key="item.id"
                @change-link-visibility="
                  () => (item.shouldShow = !item.shouldShow)
                "
                @delete-link="
                  () => previewItems.splice(previewItems.indexOf(item), 1)
                "
                :show-up="index > 0"
                :show-down="index !== previewItems.length - 1"
                @move-link-up="() => moveUp(index, item.type)"
                @move-link-down="() => moveDown(index, item.type)"
              />

              <AddHeader
                v-if="item.type === 'HEADER'"
                :id="item.id"
                v-model:value="item.title"
                :key="item.id"
                :should-show="item.shouldShow"
                @change-header-visibility="
                  () => (item.shouldShow = !item.shouldShow)
                "
                @delete-header="
                  () => previewItems.splice(previewItems.indexOf(item), 1)
                "
                :show-up="index > 0"
                :show-down="index !== previewItems.length - 1"
                @move-header-up="() => moveUp(index, item.type)"
                @move-header-down="() => moveDown(index, item.type)"
              />
            </template>
          </div>
        </div>
      </div>

      <div class="hidden lg:flex flex-col items-center">
        <div class="mt-12">
          <button
            class="rounded-full border-2 border-spacing-12 p-0.5 border-white hover:border-sky-400"
          >
            <img
              src="https://picsum.photos/300/300"
              class="rounded-full min-w-[90px] w-[80px]"
              alt="profileImg"
            />
          </button>
          <p class="text-center text-lg">@dheeman</p>
        </div>
        <div class="px-5 w-full text-center" v-for="item in previewItems">
          <PreviewHeader
            v-if="item.type === 'HEADER' && item.shouldShow"
            :title="item.title"
            :key="item.id"
          />
          <PreviewLink
            v-if="item.type === 'LINK' && item.shouldShow"
            :link="item.url"
            :title="item.title"
            :key="item.id"
          />
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
import AdminLayout from "~/layouts/AdminLayout.vue";
import AddLink from "~/components/AddLink.vue";
import LinkCard from "~/components/LinkCard.vue";
import PreviewLink from "~/components/PreviewLink.vue";
import PreviewHeader from "~/components/PreviewHeader.vue";
import AddHeader from "~/components/AddHeader.vue";

definePageMeta({
  middleware: "auth",
});

const emit = defineEmits();

const showAddLink = ref(false);
const previewItems = ref([]);
const changeLinkVisibility = () => {
  showAddLink.value = !showAddLink.value;
};
const createHeader = () => {
  previewItems.value.push({
    id: new Date().getTime(),
    title: "",
    shouldShow: false,
    type: "HEADER",
  });
};
const createLink = (url, title) => {
  previewItems.value.push({
    id: new Date().getTime(),
    url: url,
    title: title,
    shouldShow: false,
    type: "LINK",
  });
};

const moveUp = (index, type) => {
  if (index > 0) {
    swapItems(index, index - 1, type);
  }
};

const moveDown = (index, type) => {
  if (index < previewItems.value.length - 1) {
    swapItems(index, index + 1, type);
  }
};

const swapItems = (index1, index2, type) => {
  if (type === "LINK") {
    const temp = previewItems.value[index1];
    previewItems.value[index1] = previewItems.value[index2];
    previewItems.value[index2] = temp;
  }
  if (type === "HEADER") {
    const temp = previewItems.value[index1];
    previewItems.value[index1] = previewItems.value[index2];
    previewItems.value[index2] = temp;
  }
};
</script>
<style scoped></style>
