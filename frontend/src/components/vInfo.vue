<template>
  <div>
    <div class="mt-20 text-center px-5">
      <p class="text-blue-600 text-3xl font-bold">{{ useInfo.info.name }}</p>
      <i class="text-gray-600">{{ useInfo.info.date || "chưa thêm ngày sinh" }}</i>
    </div>

    <div class="mt-10 bg-cover">
      <div class="p-10 bg-white/30 rounded-2xl">
        {{ useInfo.info.introduce || "chưa có lời giới thiệu" }}
      </div>
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
