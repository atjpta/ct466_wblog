<template>
  <div>
    <div
      class="bg-gradient-to-l from-sky-100 to-sky-500/50 w-5/6 min-w-max mx-auto min-h-max flex flex-row"
    >
      <div class="basis-1/4">
        <vAvatarVue></vAvatarVue>
        <vOptionProFileVue />
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
import vOptionProFileVue from "../components/vOptionProFile.vue";
import { onMounted, onBeforeMount } from "vue";
import { infoStore } from "../stores/info.store";

const useInfo = infoStore();
onMounted(() => {});
onBeforeMount(() => {
  useInfo.getApiInfo();
});
</script>
<style></style>
