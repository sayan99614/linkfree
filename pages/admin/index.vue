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

            <template v-for="link in links" :key="link.id">
              <LinkCard
                :id="link.id"
                :link="link.url"
                :should-show="link.shouldShow"
                @change-link-visibility="
                  () => (link.shouldShow = !link.shouldShow)
                "
                @delete-link="() => links.splice(links.indexOf(link), 1)"
              />
            </template>
            <div class="self-start">
              <button
                class="flex gap-3 bg-gray-200 w-full py-3 rounded-full px-8"
                @click="createHeader"
              >
                <Icon name="fe:laptop" class="rotate-180" size="24" />
                Add header
              </button>
            </div>

            <div
              class="w-full bg-gray-100 shadow-md p-8 pb-4 rounded-2xl grid grid-cols-[10%_60%_30%] items-center lg:gap-12 mt-5"
              v-for="header in headers"
              :key="header.id"
            >
              <Icon name="mdi:dots-grid" size="24" />
              <input
                type="text"
                class="bg-gray-100 border-none outline-none text-center"
                placeholder="Title"
                v-model="header.title"
              />

              <div class="flex flex-col gap-8 mt-10">
                <Icon
                  :name="!header.shouldShow ? 'bi:toggle-off' : 'bi:toggle-on'"
                  size="36"
                  class="cursor-pointer transition-all duration-500 ease-in"
                  @click="header.shouldShow = !header.shouldShow"
                />
                <Icon
                  name="solar:trash-bin-trash-outline"
                  size="24"
                  class="cursor-pointer"
                  @click="headers.splice(headers.indexOf(header), 1)"
                />
              </div>
            </div>
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
        <div class="px-5" v-for="link in links">
          <PreviewLink
            :link="link.url"
            :title="link.title"
            :key="link.id"
            v-if="link.shouldShow"
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

const showAddLink = ref(false);
const headers = ref([]);
const links = ref([]);
const changeLinkVisibility = () => {
  showAddLink.value = !showAddLink.value;
};
const createHeader = () => {
  headers.value.push({
    id: new Date().getTime(),
    title: "",
    shouldShow: false,
  });
};
const createLink = (url, title) => {
  links.value.push({
    id: new Date().getTime(),
    url: url,
    title: title,
    shouldShow: false,
  });
};
</script>
<style scoped></style>
