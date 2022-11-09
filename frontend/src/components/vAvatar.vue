<template>
  <div>
    <div class="my-5">
      <div class="py-10 w-64 mx-auto flex justify-center">
        <img
          class="bg-black/50 h-64 w-64 rounded-full"
          :src="useInfo.avatar || useInfo.info.avatar_Url"
          alt=""
        />
      </div>
      <div
        class="flex justify-center text-xl my-5 p-4 mx-auto text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-purple-700 hover:scale-125 duration-300"
      >
        <i class="fa-regular fa-image mt-2 mr-3"></i>
        <div>
          <input
            class="file:text-black file:bg-white/0 file:border-0 w-24 hover:file:text-purple-700"
            accept="image/*"
            type="file"
            @change="previewFiles($event)"
          />
        </div>
      </div>

      <div v-if="useInfo.avatar" class="flex justify-around px-10">
        <div
          class="active:bg-blue-600/30 flex justify-center text-xl p-4 w-5/12 text-center shadow-blue-600 shadow-md h-16 rounded-3xl hover:text-blue-700 hover:scale-125 duration-300"
        >
          <div v-if="!loading">
            <button @click="updateAvatar()">Lưu</button>
          </div>
          <div v-else>
            <div>
              <i class="fa-solid fa-spinner animate-spin"></i>
              Lưu
            </div>
          </div>
        </div>
        <div
          class="active:bg-red-400/30 flex justify-center text-xl p-4 w-5/12 text-center shadow-red-400 shadow-md h-16 rounded-3xl hover:text-red-400 hover:scale-125 duration-300"
        >
          <div>
            <button @click="cancel()">Hủy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { infoStore } from "../stores/info.store";
import { alertStore } from "../stores/alert.store";
import { ref } from "vue";
import imgageService from "../services/image.service";

const useInfo = infoStore();
const userAlert = alertStore();
const image = ref();
const loading = ref(false);

async function updateAvatar() {
  const file = new FormData();
  const url = "http://localhost:8088/api/image/" + image.value.name;
  file.append("image", image.value);
  loading.value = true;
  try {
    useInfo.info.avatar_Url = url;
    await useInfo.updateInfo();
    await imgageService.uploadImage(file);
    useInfo.avatar = "";
  } catch (error) {
    userAlert.setError("Không thể cập nhật ảnh");
  } finally {
    loading.value = false;
  }
}
function previewFiles(event) {
  image.value = event.target.files[0];
  const theReader = new FileReader();
  theReader.onloadend = async () => {
    useInfo.avatar = await theReader.result;
  };
  theReader.readAsDataURL(image.value);
}

function cancel() {
  useInfo.avatar = "";
}
</script>

<style></style>
