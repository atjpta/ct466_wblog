<template>
  <div>
    <div class="py-20 pt-20 pb-10">
      <div class="w-64 mx-auto flex justify-center relative">
        <img class="h-64 w-64 rounded-full" :src="data.avatar_Url" alt="" />
      </div>
      <div class="text-2xl font-semibold text-center">{{ data.name }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
});
</script>

<style></style>
