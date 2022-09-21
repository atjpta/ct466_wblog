<template>
  <div>
    <div
      class="bg-gradient-to-l from-sky-100 to-sky-500/50 mx-20 min-h-max flex flex-row"
    >
      <div class="basis-1/4">
        <vAvatarVue></vAvatarVue>
        <div
          class="flex justify-center text-xl mx-20 p-3 my-5 bg-teal-500/50 hover:text-violet-700 hover:scale-125 duration-300"
        >
          <router-link to="/editprofile">
            <button>
              <i class="fa-solid fa-user-pen"></i>
              Chỉnh sửa
            </button>
          </router-link>
        </div>
      </div>
      <div class="basis-3/4">
        <VInfo></VInfo>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vAvatarVue from "@/components/vAvatar.vue";
import VInfo from "@/components/vInfo.vue";
import { onMounted } from "vue";
import { infoStore } from "../stores/info.store";

const useInfo = infoStore();

onMounted(() => {
  useInfo.getInfo;
});
</script>

<style></style>
