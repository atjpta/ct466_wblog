<template>
  <div class="mx-auto w-fit">
    <div class="flex justify-center m-5">
      <div class="btn-group space-x-5">
        <div v-for="tab in dataTab" :key="tab.value">
          <a
            :href="tab.value"
            :class="[
              selectTab == tab.value ? 'btn-active btn btn-primary ' : 'btn btn-outline ',
            ]"
          >
            {{ tab.title }}
          </a>
        </div>
      </div>
    </div>
    <div class="text-end mx-auto">
      <router-link to="/addquestion">
        <div class="btn btn-primary btn-outline">
          <i class="fa-solid fa-circle-plus mr-3 text-2xl"></i>
          Thêm Câu hỏi mới
        </div>
      </router-link>
    </div>
    <div class="flex space-x-5 justify-center">
      <div>
        <div v-for="question in filtersQuestion.arr1" :key="question.id">
          <vMonoQuestionVue :data="question" />
        </div>
      </div>

      <div>
        <div v-for="question in filtersQuestion.arr2" :key="question.id">
          <vMonoQuestionVue :data="question" />
        </div>
      </div>

      <div>
        <div v-for="question in filtersQuestion.arr3" :key="question.id">
          <vMonoQuestionVue :data="question" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vMonoQuestionVue from "../../components/question/vMonoQuestion.vue";

import { ref, onMounted, computed } from "vue";
import { questStore } from "../../stores/question.store";
import { useRoute } from "vue-router";
const route = useRoute();
const useQuestion = questStore();

let tab = route.hash;
const selectTab = computed(() => {
  if (route.hash) {
    return route.hash;
  }
});
const dataTab = ref([
  {
    title: "mới nhất",
    value: "#new",
  },
  {
    title: "xem nhiều nhất",
    value: "#view",
  },
  {
    title: "Điểm cao",
    value: "#rate",
  },
  {
    title: "chưa có đáp án",
    value: "#rep",
  },
]);

const filtersQuestion = computed(() => {
  if (useQuestion.data.ListQuestion) {
    let listQuestion = useQuestion.data.ListQuestion;
    switch (selectTab.value) {
      case "#new":
        return useQuestion.data;
        break;
      case "#view":
        listQuestion.sort(function (b, a) {
          return a.voted.view - b.voted.view;
        });
        break;
      case "#rate":
        listQuestion.sort(function (b, a) {
          return (
            a.voted.tim.length -
            a.voted.dislike.length -
            (b.voted.tim.length - b.voted.dislike.length)
          );
        });
        break;
      case "#rep":
        listQuestion = listQuestion.filter((e) => !e.answer);
        break;
    }
    return formatData(listQuestion);
  }
  return useQuestion.data;
});

function formatData(ListQuestion) {
  const data = {
    arr1: [],
    arr2: [],
    arr3: [],
  };
  ListQuestion.forEach((blog, i) => {
    if (i % 3 == 0) {
      data.arr1.push(ListQuestion[i]);
    } else if (i % 3 == 1) {
      data.arr2.push(ListQuestion[i]);
    } else if (i % 3 == 2) {
      data.arr3.push(ListQuestion[i]);
    }
  });
  data.ListQuestion = ListQuestion;
  return data;
}

onMounted(() => {
  useQuestion.getListQuestion();
});
</script>

<style></style>
