<template>
  <div>
    <img :src="test" alt="" />
    <input
      class="file:text-black file:bg-white/0 file:border-0 w-24 hover:file:text-purple-700"
      accept="image/*"
      type="file"
      @change="previewFiles($event)"
    />
    <button @click="testAPI()" class="w-40 h-40 bg-red-500">gui len server</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import imgageService from "../services/image.service";

const test = ref();

async function testAPI() {
  const file = new FormData();
  file.append("image", test.value);
  await imgageService.uploadImage(file);
}
function previewFiles(event) {
  test.value = event.target.files[0];
}
</script>

<style></style>
