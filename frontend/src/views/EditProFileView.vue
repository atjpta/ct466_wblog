<template>
  <div>
    <div
      class="bg-gradient-to-l rounded-2xl from-sky-100 to-sky-500/50 max-h-min flex w-3/4 mx-auto"
    >
      <div class="w-1/4 m-10">
        <vAvatarVue></vAvatarVue>
      </div>
      <div class="w-3/4">
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
