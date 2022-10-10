<template>
  <div>
    <div
      class="pb-10 bg-gradient-to-l rounded-2xl from-sky-100 to-sky-500/50 w-3/4 min-w-max mx-auto lg:flex"
    >
      <div class="w-2/4 mx-10">
        <vAvatarVue></vAvatarVue>
      </div>
      <div class="w-2/4 mx-10">
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
