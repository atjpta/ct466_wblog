<template>
  <div>
    <div class="mt-5">
      <p class="text-blue-600 text-3xl font-bold">{{ useInfo.info.name }}</p>
      <i class="text-gray-600 text-xl">{{
        useInfo.info.date || "chưa thêm ngày sinh"
      }}</i>
    </div>

    <div class="mt-10">
      <p class="text-3xl">Giới thiệu</p>
      <p class="mt-3 text-xl">{{ useInfo.info.introduce || "chưa có lời giới thiệu" }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { infoStore } from "../stores/info.store";

const useInfo = infoStore();

onMounted(() => {});
</script>

<style></style>
