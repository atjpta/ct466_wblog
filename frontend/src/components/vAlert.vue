<template>
  <div class="flex fixed top-20 right-5">
    <div v-if="useAlert.info.set" class="h-12 w-auto py-2 px-10 text-xl bg-sky-200">
      <i class="fa-solid fa-circle-info mr-10 text-blue-600"></i>
      {{ useAlert.info.message || "đây là cảnh báo bình thường" }}
    </div>

    <div v-if="useAlert.success.set" class="h-12 w-auto py-2 px-10 text-xl bg-teal-200">
      <i class="fa-solid fa-circle-check mr-10 text-teal-600"></i>
      {{ useAlert.success.message || "đây là cảnh báo xử lý thành công" }}
    </div>

    <div v-if="useAlert.warning.set" class="h-12 w-auto py-2 px-10 text-xl bg-yellow-100">
      <i class="fa-solid fa-circle-exclamation mr-10 text-yellow-600"></i>
      {{ useAlert.warning.message || "đây là cảnh báo có gì đó không ổn" }}
    </div>

    <div v-if="useAlert.error.set" class="h-12 w-auto py-2 px-10 text-xl bg-red-200">
      <i class="fa-solid fa-circle-info mr-10 text-red-600"></i>
      {{ useAlert.error.message || "đây là cảnh báo xử lý sai" }}
    </div>
  </div>
</template>

<script setup>
import { alertStore } from "../stores/alert.store";

const useAlert = alertStore();
</script>

<style></style>
