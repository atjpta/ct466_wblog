<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import vHeaderVue from "@/components/layout/vHeader.vue";
import vAlertVue from "@/components/vAlert.vue";

const route = useRoute();
</script>

<template>
  <div class="min-h-screen">
    <vHeaderVue />
    <vAlertVue />

    <router-view :key="route.path" v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
