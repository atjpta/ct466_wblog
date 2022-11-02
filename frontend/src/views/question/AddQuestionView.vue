<template>
  <div class="bg-base-300 rounded-2xl lg:w-3/5 m-auto mt-10">
    <div class="text-center font-bold text-6xl pt-10">Tạo Câu hỏi</div>
    <vAddQuestionVue :data="data" />

    <!-- button -->
    <div class="space-x-5 mx-5 pb-5 text-center">
      <button v-if="!loading" @click="createQ()" class="w-20 btn btn-outline btn-info">
        Tạo
      </button>
      <button v-if="loading" class="btn loading">Tạo</button>
      <a href="#my-modal-Cancel" class="w-20 btn btn-outline btn-error"> Hủy </a>
    </div>

    <!-- Put this part before </body> tag -->
    <div class="modal" id="my-modal-Cancel">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Trở về trang trước!!</h3>
        <p class="py-4">những gì bạn đang thay đổi sẽ bị xóa bỏ</p>
        <div class="modal-action">
          <div @click="router.back()" class="btn btn-outline btn-success">
            Tiếp tục chỉnh
          </div>
          <div @click="cancelQ()" class="btn btn-outline btn-error">Hủy</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vAddQuestionVue from "../../components/question/vAddQuestion.vue";
import { questStore } from "../../stores/question.store";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();
const route = useRoute();
const useQuestion = questStore();
useQuestion.question = {};
const EQuestion = ref({});
const loading = ref(false);

const data = ref({});

async function createQ() {
  loading.value = true;
  try {
    const id = await useQuestion.createQ(data.value);
    const redirectPath = route.query.redirect || {
      path: `/readblog/${id}`,
    };
    router.push(redirectPath);
  } catch (error) {
    console.log("lỗi tạo createQ");
    console.log(error);
  } finally {
    loading.value = false;
  }
}

function cancelQ() {
  data.value = {};
  router.go(-2);
}
</script>

<style></style>
