<template>
  <div class="text-center m-10">
    <div @click="btntest" class="text-center btn btn-primary btn-outline">bấm nè</div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const emit = defineEmits(["test"]);

function btntest() {
  const data = {
    a: 1,
    b: 2,
  };
  emit("test", data);
}
</script>

<style></style>
