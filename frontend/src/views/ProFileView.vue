<template>
  <div>
    <div
      class="pb-10 rounded-2xl bg-gradient-to-r from-sky-500/50 via-sky-100/50 to-sky-500/50 w-3/4 mx-auto lg:flex"
    >
      <div class="basis-1/2 flex justify-center">
        <div>
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
      </div>
      <div class="basis-1/2 flex justify-center">
        <VInfo class=""></VInfo>
      </div>
    </div>
  </div>
</template>

<script setup>
import vAvatarVue from "@/components/vAvatar.vue";
import VInfo from "@/components/vInfo.vue";
import { onMounted, onBeforeMount } from "vue";
import { infoStore } from "../stores/info.store";
import VEditInfo from "../components/vEditInfo.vue";

const useInfo = infoStore();
onMounted(() => {});
onBeforeMount(() => {
  useInfo.getApiInfo();
});
</script>
<style></style>
