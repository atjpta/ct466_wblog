<template>
  <div class="flex justify-center">
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-figure">
          <i class="text-violet-500 fa-solid fa-file-lines text-2xl"></i>
        </div>
        <div class="stat-title">Số bài biết</div>
        <div class="stat-value">{{ slBlog }}</div>
      </div>
      <div class="stat">
        <div class="stat-figure">
          <i class="text-violet-500 fa-solid fa-unlock text-2xl"></i>
        </div>
        <div class="stat-title">tổng số lần mở khóa</div>
        <div class="stat-value">{{ slUnlock || 0 }}</div>
      </div>

      <div class="stat">
        <div class="stat-figure">
          <i class="fa-solid fa-sack-dollar text-2xl text-violet-500"></i>
        </div>
        <div class="stat-title">tổng số tiền</div>
        <div class="stat-value">{{ slmoney || 0 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { blogStore } from "../../stores/blog.store";

const slBlog = computed(() => {
  if (useBlog.data.ListBlog) {
    return useBlog.data.ListBlog.length;
  }
  return 0;
});

const slUnlock = computed(() => {
  let sum = 0;
  if (useBlog.data.ListBlog) {
    useBlog.data.ListBlog.forEach((e) => {
      sum += e.buyer.length;
    });
  }
  return sum;
});

const slmoney = computed(() => {
  let sum = 0;
  if (useBlog.data.ListBlog) {
    useBlog.data.ListBlog.forEach((e) => {
      sum += e.price;
    });
  }
  return sum;
});

const useBlog = blogStore();
</script>

<style></style>
