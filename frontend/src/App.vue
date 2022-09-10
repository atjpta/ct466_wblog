<script setup>
import { RouterLink, RouterView } from "vue-router";
import Vheader from "@/components/vheader.vue";
import vAlertVue from "@/components/vAlert.vue";
</script>

<template>
  <div
    class="min-h-screen"
    style="background-repeat: unset; background-image: url(../public/imgs/bg.jpg)"
  >
    <Vheader />
    <vAlertVue />
    <router-view />
  </div>
</template>
