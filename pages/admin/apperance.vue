<template>
  <AdminLayout>
    <div class="h-screen border border-r-gray-300">
      <div class="flex flex-col mt-2 md:mt-12 p-8 mx-8 lg:mx-[10rem] gap-5">
        <div class="flex flex-row items-start justify-start">
          <h2 class="text-xl">Profile</h2>
        </div>
        <div class="bg-white shadow-sm rounded-xl p-8">
          <div class="grid grid-cols-[30%_70%] items-center">
            <div>
              <button
                class="rounded-full border-2 border-spacing-12 p-0.5 border-white hover:border-sky-400"
              >
                <img
                  :src="
                    user.photo ? user.photo : 'https://picsum.photos/300/300'
                  "
                  class="rounded-full min-w-[120px] w-[120px]"
                  alt="profileImg"
                />
              </button>
            </div>
            <div class="flex flex-col gap-4">
              <div>
                <button
                  class="rounded-full relative w-full mt-3 py-2 bg-[#8129d9] text-white"
                >
                  <input
                    id="file_input"
                    class="absolute opacity-0"
                    type="file"
                    @change="handleFileUpload"
                  />
                  choose an image
                </button>
              </div>
              <button class="rounded-full w-full py-2 bg-slate-200 text-black">
                Remove
              </button>
            </div>
          </div>
          <button
            @click="uploadFile"
            class="rounded-full w-full mt-3 py-2 bg-[#8129d9] text-white"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
import AdminLayout from "~/layouts/AdminLayout.vue";
import { saveFile } from "~/composables/firebaseInit";
import { useUserStore } from "~/stores/user";
const file = ref(null);
const { updateUser } = useUserStore();

const { user } = storeToRefs(useUserStore());

const handleFileUpload = async (e) => {
  try {
    file.value = e.target.files[0];
  } catch (error) {
    alert(error.message);
  }
};

const uploadFile = async () => {
  try {
    const url = await saveFile(file.value, "profile");
    await updateUser({ photo: url });
  } catch (error) {
    alert(error.message);
  }
};
</script>
<style scoped></style>
