<template>
  <div>
    <div
      class="bg-gradient-to-l from-sky-100 to-sky-500/50 mx-20 min-h-max flex flex-row"
    >
      <div class="basis-1/4">
        <vAvatarVue></vAvatarVue>
        <vOptionProFileVue />
      </div>
      <div class="basis-3/4"><VEditInfo></VEditInfo>yhjytp</div>
    </div>
  </div>
</template>

<script setup>
import vAvatarVue from "@/components/vAvatar.vue";
import VEditInfo from "../components/vEditInfo.vue";
import vOptionProFileVue from "../components/vOptionProFile.vue";
import { onMounted, onBeforeMount } from "vue";
import { infoStore } from "../stores/info.store";

const useInfo = infoStore();
onBeforeMount(() => {
  useInfo.getApiInfo();
});
</script>

<style></style>
