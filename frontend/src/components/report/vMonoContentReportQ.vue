<template>
  <div>
    <div class="bg-base-100/50 m-5 p-2 rounded-2xl">
      <div class="flex justify-between">
        <div class="mt-2 pt-0.5 mx-5">{{ data.content }}</div>
        <div @click="deleteReport()" class="btn btn-outline btn-error">
          <i class="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reportStore } from "../../stores/report.store";
import { ref } from "vue";
import { alertStore } from "../../stores/alert.store";

const useReport = reportStore();
const useAlert = alertStore();
const props = defineProps({
  data: Object,
});

const loading = ref();

async function deleteReport() {
  try {
    await useReport.deleteOneReport(props.data.id);
    await useReport.getListReportById("question", props.data.id_question);
    await useReport.getReportQuestion();
    useAlert.setSuccess("đã xóa thành công");
  } catch (error) {
    console.log(error);
    console.log(`lỗi khi deleteReport`);
    useAlert.setError("đã xóa thất bại");
  }
}
</script>

<style></style>
