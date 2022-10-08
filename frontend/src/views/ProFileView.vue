<template>
  <div>
    <div
      class="bg-gradient-to-l rounded-2xl from-sky-100 to-sky-500/50 w-3/4 min-w-max mx-auto flex"
    >
      <div class="w-1/4 m-10">
        <vAvatarVue></vAvatarVue>

        <div
          class="flex justify-center text-xl my-5 p-4 mx-auto text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-purple-700 hover:scale-125 duration-300"
        >
          <router-link to="/editprofile">
            <button>
              <i class="fa-solid fa-user-pen"></i>
              Chỉnh sửa thông tin
            </button>
          </router-link>
        </div>
      </div>
      <div class="w-3/4">
        <VInfo></VInfo>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vAvatarVue from "@/components/vAvatar.vue";
import VInfo from "@/components/vInfo.vue";
import { onMounted, onBeforeMount } from "vue";
import { infoStore } from "../stores/info.store";

const useInfo = infoStore();
onMounted(() => {});
onBeforeMount(() => {
  useInfo.getApiInfo();
});
</script>
<style></style>
