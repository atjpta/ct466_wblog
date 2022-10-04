<template>
  <div>
    <button @click="test()" class="text-6xl">click!!!</button>
  </div>
</template>

<script setup>
const time = Date.now();
const d = new Date();
d.toDateString(time);
function test() {
  console.log(d);
}
</script>

<style></style>
