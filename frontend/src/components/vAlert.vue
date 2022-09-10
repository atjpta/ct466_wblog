<template>
  <div class="flex fixed top-20 right-5">
    <div v-if="useAlert.info" class="h-12 w-auto py-2 px-10 text-xl bg-sky-200">
      <i class="fa-solid fa-circle-info mr-10 text-blue-600"></i>
      {{ useAlert.message || "đây là cảnh báo bình thường" }}
      <button @click="useAlert.info = !useAlert.info">
        <i
          class="fa-solid fa-rectangle-xmark pl-10 hover:text-violet-700 hover:scale-125 duration-300"
        ></i>
      </button>
    </div>

    <div v-if="useAlert.success" class="h-12 w-auto py-2 px-10 text-xl bg-teal-200">
      <i class="fa-solid fa-circle-check mr-10 text-teal-600"></i>
      {{ useAlert.message || "đây là cảnh báo xử lý thành công" }}
      <button @click="useAlert.success = !useAlert.success">
        <i
          class="fa-solid fa-rectangle-xmark pl-10 hover:text-violet-700 hover:scale-125 duration-300"
        ></i>
      </button>
    </div>

    <div v-if="useAlert.warning" class="h-12 w-auto py-2 px-10 text-xl bg-yellow-100">
      <i class="fa-solid fa-circle-exclamation mr-10 text-yellow-600"></i>
      {{ useAlert.message || "đây là cảnh báo có gì đó không ổn" }}
      <button @click="useAlert.warning = !useAlert.warning">
        <i
          class="fa-solid fa-rectangle-xmark pl-10 hover:text-violet-700 hover:scale-125 duration-300"
        ></i>
      </button>
    </div>

    <div v-if="useAlert.error" class="h-12 w-auto py-2 px-10 text-xl bg-red-200">
      <i class="fa-solid fa-circle-info mr-10 text-red-600"></i>
      {{ useAlert.message || "đây là cảnh báo xử lý sai" }}
      <button @click="useAlert.error = !useAlert.error">
        <i
          class="fa-solid fa-rectangle-xmark pl-10 hover:text-violet-700 hover:scale-125 duration-300"
        ></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { alertStore } from "../stores/alert.store";

const useAlert = alertStore();
</script>

<style></style>
