<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import Vheader from "@/components/layout/vheader.vue";
import vAlertVue from "@/components/vAlert.vue";

const route = useRoute();
</script>

<template>
  <div
    class="min-h-screen text-black bg-cover bg-fixed"
    style="background-image: url(../public/imgs/bg.jpg)"
  >
    <Vheader class="" />
    <vAlertVue />

    <router-view :key="route.path" v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
