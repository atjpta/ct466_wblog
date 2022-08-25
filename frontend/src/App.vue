<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Vheader from '@/components/vheader.vue';

</script>

<template>
  <div class=" min-h-screen" style=" background-repeat: unset; background-image: url(../public/imgs/bg.jpg)">
   <Vheader />
   <router-view />   
  </div>
</template>

