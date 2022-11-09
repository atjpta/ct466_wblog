<template>
  <router-link :to="`detailbill/${data.id}`">
    <div class="stats shadow cursor-pointer hover:bg-primary/10 m-1">
      <div class="stat">
        <div class="stat-figure text-secondary">
          <i class="fa-solid fa-circle-info text-2xl"></i>
        </div>
        <div class="stat-title">mã đơn</div>
        <div class="stat-value w-[500px]">{{ data.id }}</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <i class="fa-solid fa-calendar-days text-2xl"></i>
        </div>
        <div class="stat-title">ngày mở khóa</div>
        <div class="stat-value w-[200px]">{{ date }}</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <i class="fa-solid fa-dollar-sign text-2xl"></i>
        </div>
        <div class="stat-title">số tiền</div>
        <div class="stat-value w-[120px]">{{ money }}</div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import dayjs from "dayjs";
const props = defineProps({
  data: Object,
});

const money = computed(() => {
  let sum = 0;
  props.data.id_blog.forEach((e) => {
    sum += e.price;
  });
  return sum;
});

const date = computed(() => {
  let day = new Date(props.data.createdAt);
  return dayjs(props.data.createdAt).format("DD/MM/YYYY");
});
</script>

<style></style>
