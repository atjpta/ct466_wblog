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
const useReport = reportStore();
const props = defineProps({
  data: Object,
});
const loading = ref();

async function deleteReport() {
  await useReport.deleteOneReport(props.data.id);
  await useReport.getListReportById("blog", props.data.id_blog);
  await useReport.getReportBlog();
}
</script>

<style></style>
