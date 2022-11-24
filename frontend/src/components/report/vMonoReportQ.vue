<template>
  <div v-if="data.question.length">
    <!--Modal delete -->
    <input type="checkbox" id="my-modal-delete" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Thông báo cực căng</h3>
        <p class="py-4">bạn có chắc chắn muốn xóa bài viết?</p>
        <!-- tùy chọn btn -->
        <div class="flex justify-around">
          <div class="modal-action">
            <label
              @click="deletequestion()"
              for="my-modal-delete"
              :class="[loading ? 'loading' : '']"
              class="btn btn-warning btn-outline"
              >Xóa</label
            >
          </div>
          <div class="modal-action">
            <label for="my-modal-delete" class="btn btn-primary btn-outline">Hủy</label>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full border-2 rounded-2xl bg-base-200 m-5">
      <div class="flex m-5 space-x-5 overflow-clip">
        <router-link :to="`/readquestion/${data._id}`" class="btn btn-ghost text-2xl">{{
          data.question[0].title || "RFWHFGO"
        }}</router-link>
      </div>
      <div class="flex space-x-5 mx-5 mb-5">
        <div class="flex text-2xl">
          <div class="m-2">{{ data.count }}</div>
          <i class="fa-solid fa-flag mt-3"></i>
        </div>
        <div
          @click="readReport(data._id)"
          :class="[loading ? 'loading' : '']"
          class="btn btn-primary btn-outline"
        >
          xem report
        </div>
        <label for="my-modal-delete" class="btn btn-outline btn-error">
          <i class="fa-solid fa-trash-can"></i>
        </label>
        <!-- phần content report  -->
      </div>
      <transition name="bounce">
        <div
          v-if="
            useReport.ListReport.length && useReport.ListReport[0].id_question == data._id
          "
        >
          <div v-for="report in useReport.ListReport" :key="report.id">
            <vMonoContentReportVueQ :data="report" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import vMonoContentReportVueQ from "./vMonoContentReportQ.vue";
import { ref } from "vue";
import { reportStore } from "../../stores/report.store";
import { alertStore } from "../../stores/alert.store";
import { questStore } from "../../stores/question.store";

const props = defineProps({
  data: Object,
});

const useReport = reportStore();
const loading = ref(false);
const useAlert = alertStore();
const ListReport = ref([]);
const useQuestion = questStore();

async function readReport(id) {
  try {
    loading.value = true;
    await useReport.getListReportById("question", id);
  } catch (error) {
    console.log(error);
    console.log("lỗi readReport");
    useAlert.setError("lỗi lấy dữ liệu");
  } finally {
    loading.value = false;
  }
}

async function deletequestion() {
  await useQuestion.deletequestion(props.data._id);
  await useReport.getReportquestion();
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.router-link-exact-active {
  color: rgb(255, 255, 255);
  background-color: rgba(87, 13, 248);
  font-weight: 700;
}
</style>
