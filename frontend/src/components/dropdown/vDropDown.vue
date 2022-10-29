<template>
  <div
    class="w-[200px] mx-auto text-center m-2 relative text-lg font-semibold rounded-2xl uppercase px-10 pt-3 hover:text-violet-700 hover:bg-violet-500/30 active:bg-violet-500/50 duration-300"
  >
    <div>
      <div class="" @mouseenter="open = true" @mouseleave="open = false">
        <!-- tiêu đề  -->
        <div class="w-[150px] mx-auto flex justify-center">
          <div class="mr-3">{{ title }}</div>
          <div>
            <i
              :class="[
                type == 'header'
                  ? 'fa-solid fa-caret-down'
                  : '-rotate-90 fa-solid fa-caret-down',
              ]"
              class=""
            ></i>
          </div>
        </div>
        <!-- noi dung  -->
        <div
          v-show="open"
          class="bg-white text-sm border-2 w-[200px] z-50 absolute mx-auto rounded-2xl py-5 space-y-3"
          :class="[type == 'header' ? ' ' : ' left-44 top-3']"
        >
          <div v-for="i in data" :key="i.name">
            <router-link :to="i.url">
              <div
                class="cursor-pointer w-[150px] mx-auto active:bg-teal-500/50 hover:bg-teal-500/20 truncate p-3 rounded-2xl hover:text-teal-800 hover:scale-125 duration-300"
              >
                {{ i.name }}
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
  data: Array,
  type: String,
});

const open = ref(false);
</script>

<style></style>
