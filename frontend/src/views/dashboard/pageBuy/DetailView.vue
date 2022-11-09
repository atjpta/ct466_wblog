<template>
  <div class="mx-auto w-fill">
    <div class="text-4xl font-bold text-center m-5">Các bài viết đã mở khóa</div>
    <div class="flex flex-wrap space-x-10 justify-center">
      <div v-for="blog in useBill.bill.id_blog" :key="blog.id">
        <vMonoBlogVue :data="blog" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import vMonoBlogVue from "../../../components/blog/vMonoBlog.vue";
import { billStore } from "../../../stores/bill.store";
const useBill = billStore();
const route = useRoute();

onMounted(() => {
  useBill.getBill(route.params.id);
});
</script>

<style></style>
