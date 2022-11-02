<template>
  <div>
    <vtestVue @test="test" />
  </div>
</template>

<script setup>
import vtestVue from "../components/vtest.vue";

function test(data) {
  console.log(data);
}
</script>

<style></style>
