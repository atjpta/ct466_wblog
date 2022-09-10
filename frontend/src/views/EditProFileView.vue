<template>
  <div>
    <div
      class="bg-gradient-to-l from-sky-100 to-sky-500/50 mx-20 min-h-max flex flex-row"
    >
      <div class="basis-1/4">
        <vAvatarVue></vAvatarVue>
        <div
          class="flex justify-center text-xl p-3 my-5 mx-20 bg-teal-500/50 hover:text-violet-700 hover:scale-125 duration-300"
        >
          <i class="fa-regular fa-image mt-2 mr-3"></i>
          <div>
            <input
              class="w-24"
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
  const theReader = new FileReader();
  theReader.onloadend = async () => {
    useInfo.info.avatar = await theReader.result;
  };
  theReader.readAsDataURL(file);
}
onMounted(() => {
  useInfo.getInfo();
});
</script>

<style></style>
