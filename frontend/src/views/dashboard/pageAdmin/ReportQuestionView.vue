<template>
  <div class="w-full m-5">
    <div class="w-4/5 mx-auto">
      <div class="" v-for="question in useReport.ListQuestion" :key="question.id">
        <vMonoReportVueQ :data="question" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import vMonoReportVueQ from "../../../components/report/vMonoReportQ.vue";
import { alertStore } from "../../../stores/alert.store";
import { reportStore } from "../../../stores/report.store";
const useReport = reportStore();
const loading = ref(false);
const useAlert = alertStore();

onMounted(() => {
  useReport.getReportQuestion();
});
</script>

<style></style>
