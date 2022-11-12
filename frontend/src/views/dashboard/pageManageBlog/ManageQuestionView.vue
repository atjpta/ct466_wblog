<template>
  <div class="m-5 mx-auto">
    <div class="flex space-x-5 justify-center">
      <div v-if="useQuestion.ListQuestion.length < 1">
        <div class="font-semibold text-3xl text-center m-5">Bạn chưa có câu hỏi!!</div>
      </div>
      <div>
        <div v-for="question in useQuestion.data.arr1" :key="question.id">
          <vMonoQuestionVue :data="question" />
        </div>
      </div>

      <div>
        <div v-for="question in useQuestion.data.arr2" :key="question.id">
          <vMonoQuestionVue :data="question" />
        </div>
      </div>

      <div>
        <div v-for="question in useQuestion.data.arr3" :key="question.id">
          <vMonoQuestionVue :data="question" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vMonoQuestionVue from "../../../components/question/vMonoQuestion.vue";

import { ref, onMounted } from "vue";
import { questStore } from "../../../stores/question.store";

const useQuestion = questStore();
onMounted(() => {
  useQuestion.getListQuestionUser();
});
</script>

<style></style>
