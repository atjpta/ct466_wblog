<template>
  <div class="text-5xl flex">
    <div class="carousel w-full">
      <div id="slide1" class="carousel-item relative w-full">
        <img src="https://placeimg.com/800/200/arch" class="w-full" />
        <div
          class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
        >
          <a href="#slide4" class="btn btn-circle">❮</a>
          <a href="#slide2" class="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide2" class="carousel-item relative w-full">
        <img src="https://placeimg.com/800/200/arch" class="w-full" />
        <div
          class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
        >
          <a href="#slide1" class="btn btn-circle">❮</a>
          <a href="#slide3" class="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide3" class="carousel-item relative w-full">
        <img src="https://placeimg.com/800/200/arch" class="w-full" />
        <div
          class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
        >
          <a href="#slide2" class="btn btn-circle">❮</a>
          <a href="#slide4" class="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide4" class="carousel-item relative w-full">
        <img src="https://placeimg.com/800/200/arch" class="w-full" />
        <div
          class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
        >
          <a href="#slide3" class="btn btn-circle">❮</a>
          <a href="#slide1" class="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onUpdated, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const data = ref("");
const slide = ref(1);
setInterval(() => {
  slide.value++;
  router.push(`/trang2#slide${slide.value}`);
  console.log(`/trang2#slide${slide.value}`);
}, 2000);

onUpdated(() => {
  if (slide.value == 5) {
    slide.value = 0;
  }
});
</script>

<style></style>
