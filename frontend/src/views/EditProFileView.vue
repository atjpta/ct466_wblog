<template>
  <div>
    <div
      class="pb-10 bg-gradient-to-r from-sky-500/50 via-sky-100/50 to-sky-500/50 rounded-2xl w-3/4 mx-auto lg:flex"
    >
      <div class="basis-1/2 flex justify-center">
        <vAvatarVue></vAvatarVue>
      </div>
      <div class="basis-1/2 flex justify-center">
        <VEditInfo />
      </div>
    </div>
  </div>
</template>
<script setup>
import vAvatarVue from "@/components/vAvatar.vue";
import VEditInfo from "../components/vEditInfo.vue";
</script>

<style></style>
