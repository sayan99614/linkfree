<template>
  <ClientOnly>
    <AdminLayout>
      <div class="col-span-2 lg:col-span-1 border-r-[1px] border-r-gray-300">
        <LinkBanner />
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

            <template v-for="(item, index) in items">
              <LinkCard
                v-if="item.itemType === 'Link'"
                :id="item._id"
                :link="item.link.url"
                :should-show="item.shouldShow"
                :key="item._id"
                @change-link-visibility="
                  () =>
                    itemsStore.changeItemVisibility(item._id, !item.shouldShow)
                "
                @delete-link="() => itemsStore.deleteItem(item._id)"
                :show-up="index > 0"
                :show-down="index !== items.length - 1"
                @move-link-up="
                  () =>
                    itemsStore.moveItem(
                      {
                        id: item._id,
                        position: item.position,
                      },
                      'up'
                    )
                "
                @move-link-down="
                  () =>
                    itemsStore.moveItem(
                      {
                        id: item._id,
                        position: item.position,
                      },
                      'down'
                    )
                "
              />

              <AddHeader
                v-if="item.itemType === 'Header'"
                :id="item._id ? item._id : null"
                :is-new="!item._id"
                v-model:value="item.header.title"
                :key="item._id"
                :should-show="item.shouldShow"
                :show-up="index > 0"
                :show-down="index !== items.length - 1"
                @save-header="itemsStore.createItem(item)"
                @change-header-visibility="
                  () =>
                    itemsStore.changeItemVisibility(item._id, !item.shouldShow)
                "
                @delete-header="() => itemsStore.deleteItem(item._id)"
                @move-header-up="
                  () =>
                    itemsStore.moveItem(
                      {
                        id: item._id,
                        position: item.position,
                      },
                      'up'
                    )
                "
                @move-header-down="
                  () =>
                    itemsStore.moveItem(
                      {
                        id: item._id,
                        position: item.position,
                      },
                      'down'
                    )
                "
              />
            </template>
          </div>
        </div>
      </div>
    </AdminLayout>
  </ClientOnly>
</template>
<script setup>
import AdminLayout from "~/layouts/AdminLayout.vue";
import AddLink from "~/components/AddLink.vue";
import LinkCard from "~/components/LinkCard.vue";

import AddHeader from "~/components/AddHeader.vue";
import LinkBanner from "~/components/LinkBanner.vue";

definePageMeta({
  middleware: "auth",
});

const emit = defineEmits();

const { user } = storeToRefs(useUserStore());
const itemsStore = useItemsStore();

const showAddLink = ref(false);

const { items } = storeToRefs(itemsStore);

const changeLinkVisibility = () => {
  showAddLink.value = !showAddLink.value;
};
const createHeader = () => {
  items.value.push({
    header: {
      title: "",
    },
    shouldShow: false,
    itemType: "Header",
    position: items.value.length,
  });
};
const createLink = async (url, title) => {
  await itemsStore.createItem({
    link: {
      url: url,
      title: title,
    },
    shouldShow: false,
    itemType: "Link",
    user: user.value._id,
    position: items.value.length,
  });
  showAddLink.value = false;
};

onMounted(async () => {
  await itemsStore.getAllItems();
});
</script>
<style scoped></style>
