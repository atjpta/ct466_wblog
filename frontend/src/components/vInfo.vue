<template>
  <div>
    <div class="mt-20 text-center px-5">
      <p class="text-blue-600 text-3xl font-bold">
        {{ useInfo.info.name }}
      </p>
      <i class="text-gray-600">{{ useInfo.info.date || "chưa thêm ngày sinh" }}</i>
    </div>

    <div class="flex justify-center mt-5">
      <div>
        <img class="w-10 h-10 animate-pulse" src="../../public/imgs/gem.png" alt="" />
      </div>
      <div class="m-1 text-2xl">X{{ useInfo.wallet.gem }}</div>
    </div>

    <div class="flex justify-center mt-5">
      <div>
        <i class="fa-solid fa-crown text-4xl animate-pulse text-yellow-400"></i>
      </div>
      <div class="m-1 text-2xl">X {{ useInfo.wallet.premium }} ngày</div>
    </div>

    <div class="mt-10 bg-cover">
      <div class="p-10 bg-white/30 lg:max-w-lg max-w-xs rounded-2xl">
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
