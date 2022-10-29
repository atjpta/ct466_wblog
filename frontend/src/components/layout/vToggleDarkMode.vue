<template>
  <div>
    <i
      v-if="setDarkMode == 'dark'"
      @click="isDarkMode = 'light'"
      class="text-yellow-500 text-3xl hover:scale-125 duration-300 fa-solid fa-sun"
    ></i>
    <i
      v-if="setDarkMode == 'light'"
      @click="isDarkMode = 'dark'"
      class="text-gray-500 text-3xl hover:scale-125 duration-300 fa-solid fa-moon"
    ></i>

    <div class="w-40 h-50 bg-blue-400 dark:bg-blue-800"></div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const isDarkMode = ref();

const setDarkMode = computed(() => {
  if (!isDarkMode.value) {
    isDarkMode.value = localStorage.getItem("themeDark");
  }
  const html = window.document.documentElement;
  if (isDarkMode.value == "light") {
    html.classList.remove("dark");
  } else html.classList.add("dark");
  localStorage.setItem("themeDark", isDarkMode.value);
  return isDarkMode.value;
});
</script>

<style></style>
