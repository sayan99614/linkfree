<template>
  <div class="flex justify-center items-center">
    <div class="mt-12 flex flex-col justify-center items-center">
      <button
        class="rounded-full border-2 border-spacing-12 p-0.5 border-white hover:border-sky-400"
      >
        <img
          :src="user.photo ? user.photo : 'https://picsum.photos/300/300'"
          class="rounded-full min-w-[140px] w-[140px] h-[140px]"
          alt="profileImg"
        />
      </button>
      <h1
        class="text-center text-xl italic font-medium border-b border-b-black"
      >
        @{{ username }}
      </h1>

      <div class="px-5 w-full text-center" v-for="item in items">
        <PreviewHeader
          v-if="item.itemType === 'Header' && item.shouldShow"
          :title="item.header.title"
          :key="item._id"
        />
        <PreviewLink
          v-if="item.itemType === 'Link' && item.shouldShow"
          :link="item.link.url"
          :title="item.link.title"
          :key="item._id"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import PreviewHeader from "~/components/PreviewHeader.vue";
import PreviewLink from "~/components/PreviewLink.vue";

const {
  params: { username },
} = useRoute();

const { getItemByUsername } = useItemsStore();

const { items } = storeToRefs(useItemsStore());
const userStore=useUserStore()
const {user}=storeToRefs(userStore)

onMounted(async () => {
  await userStore.getuserByUsername(username)
  await getItemByUsername(username);
});
</script>
<style scoped></style>
