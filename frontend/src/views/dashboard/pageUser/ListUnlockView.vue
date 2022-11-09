<template>
  <div class="mx-auto">
    <div class="flex space-x-5 justify-center">
      <div>
        <div
          class="odd:bg-white even:bg-slate-50"
          v-for="blog in useBill.data.arr1"
          :key="blog.id"
        >
          <vMonoBlog :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in useBill.data.arr2" :key="blog.id">
          <vMonoBlog :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in useBill.data.arr3" :key="blog.id">
          <vMonoBlog :data="blog" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { billStore } from "../../../stores/bill.store";
import vMonoBlog from "../../../components/blog/vMonoBlog.vue";
const useBill = billStore();

onMounted(() => {
  useBill.getListBillBlog();
});
</script>

<style></style>
