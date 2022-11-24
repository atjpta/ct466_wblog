<template>
  <div class="w-full m-5">
    <div class="w-4/5 mx-auto">
      <div v-if="!useReport.isEmtyBlog">
        <div class="" v-for="blog in useReport.ListBlog" :key="blog.id">
          <vMonoReportVue :data="blog" />
        </div>
      </div>
      <div class="text-center text-2xl font-semibold m-5" v-if="useReport.isEmtyBlog">
        không có báo cáo nào cả !!!
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import vMonoReportVue from "../../../components/report/vMonoReport.vue";
import { alertStore } from "../../../stores/alert.store";
import { reportStore } from "../../../stores/report.store";
const useReport = reportStore();
const loading = ref(false);
const useAlert = alertStore();

onMounted(() => {
  useReport.getReportBlog();
});
</script>

<style></style>
