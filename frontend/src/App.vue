<script setup>
import { RouterLink, RouterView } from "vue-router";
import Vheader from "@/components/vheader.vue";
import vAlertVue from "@/components/vAlert.vue";
</script>

<template>
  <div
    class="min-h-screen text-black bg-cover bg-fixed"
    style="background-image: url(../public/imgs/bg.jpg)"
  >
    <Vheader class="" />
    <vAlertVue />
    <router-view />
  </div>
</template>
