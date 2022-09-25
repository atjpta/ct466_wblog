<template>
  <div>
    <div
      class="bg-gradient-to-l from-sky-100 to-sky-500/50 mx-20 min-h-max flex flex-row"
    >
      <div class="basis-1/4">
        <vAvatarVue></vAvatarVue>

        <div
          class="flex justify-center text-xl my-10 p-3 mx-16 text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-purple-700 hover:scale-125 duration-300"
        >
          <i class="fa-regular fa-image mt-2 mr-3"></i>
          <div>
            <div></div>
            <input
              class="file:text-black file:bg-white/0 file:border-0 w-24 hover:file:text-purple-700"
              accept="image/*"
              type="file"
              @change="previewFiles($event)"
            />
          </div>
        </div>
      </div>
      <div class="basis-3/4">
        <VEditInfo></VEditInfo>
      </div>
    </div>
  </div>
</template>

<script setup>
import vAvatarVue from "@/components/vAvatar.vue";
import VEditInfo from "../components/vEditInfo.vue";
import emptyImage from "@/assets/upload-image.png";
import { ref, onMounted } from "vue";
import { infoStore } from "../stores/info.store";

const useInfo = infoStore();

function previewFiles(event) {
  const file = event.target.files[0];
  useInfo.info.file = new FormData();
  useInfo.info.file.append("image", file);
  useInfo.info.avatar_Url = "http://localhost:8088/api/image/" + file.name;
  const theReader = new FileReader();
  theReader.onloadend = async () => {
    useInfo.info.avatar = await theReader.result;
  };
  theReader.readAsDataURL(file);
}
onMounted(() => {
  useInfo.getApiInfo();
});
</script>

<style></style>
