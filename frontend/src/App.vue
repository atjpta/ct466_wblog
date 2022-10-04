<script setup>
import { RouterLink, RouterView } from "vue-router";
import Vheader from "@/components/vheader.vue";
import vAlertVue from "@/components/vAlert.vue";
</script>

<template>
  <div
    class="min-h-screen"
    style="
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-image: url(../public/imgs/bg.jpg);
    "
  >
    <Vheader />
    <vAlertVue />
    <router-view />
  </div>
</template>
