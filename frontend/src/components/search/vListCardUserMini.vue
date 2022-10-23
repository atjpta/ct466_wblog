<template>
  <div class="md:w-4/6 mx-auto">
    <div class="pb-10 flex space-x-5 m-5 overflow-auto">
      <div :key="i.id" v-for="i in data">
        <div
          class="cursor-pointer w-[250px] h-[250px] rounded-2xl px-5 bg-gradient-to-r from-green-400/30 to-blue-500/30 hover:from-pink-500/30 hover:to-yellow-500/30"
        >
          <router-link :to="/user/ + i.id">
            <div class="pt-5 w-40 mx-auto flex justify-center">
              <img
                class="bg-black/50 h-40 w-40 rounded-full"
                :src="i.avatar_Url"
                alt=""
              />
            </div>
            <div class="text-center pt-3 text-4xl">{{ i.name }}</div>
          </router-link>
        </div>
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
