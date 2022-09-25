<template>
  <div>
    <div class="my-5 mx-20">
      <div class="h-64 w-64">
        <img
          class="bg-black h-64 w-64 rounded-full"
          :src="infoStore().info.avatar || infoStore().info.avatar_Url || emptyImage"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { infoStore } from "../stores/info.store";
import emptyImage from "@/assets/upload-image.png";
</script>

<style></style>
