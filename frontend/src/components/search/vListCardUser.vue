<template>
  <div class="pb-10 flex-wrap flex justify-around mx-auto w-[400px] xl:w-[1280px]">
    <div :key="user" v-for="user in data">
      <div
        class="cursor-pointer w-[400px] h-[400px] rounded-2xl px-5 backdrop-blur-sm bg-gradient-to-r from-green-400/30 to-blue-500/30 hover:from-pink-500/30 hover:to-yellow-500/30"
      >
        <router-link :to="/user/ + user.id">
          <div class="pt-10 m-5 w-64 mx-auto flex justify-center">
            <img
              class="bg-black/50 h-64 w-64 rounded-full"
              :src="user.avatar_Url"
              alt=""
            />
          </div>
          <div class="text-center pt-3 text-4xl">{{ user.name }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const pops = defineProps({
  data: Array,
});
</script>

<style></style>
