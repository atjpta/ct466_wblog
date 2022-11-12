<template>
  <div>
    <div class="bg-white/50 w-2/5 mx-auto p-3 my-5 rounded-xl text-4xl text-center">
      Các bài viết cho hashtag: {{ useHashtag.resultSearch.name }}
    </div>
    <vListBlogVue :data="useHashtag.data" class="pb-20" />
    <div class="bg-white/50 w-2/5 mx-auto p-3 my-5 rounded-xl text-4xl text-center">
      Các câu hỏi cho hashtag: {{ useHashtag.resultSearch.name }}
    </div>
    <div class="flex space-x-5 justify-center">
      <div>
        <div v-for="question in useHashtag.data2.arr1" :key="question.id">
          <vMonoQuestionVue :data="question"> </vMonoQuestionVue>
        </div>
      </div>

      <div>
        <div v-for="question in useHashtag.data2.arr2" :key="question.id">
          <vMonoQuestionVue :data="question"> </vMonoQuestionVue>
        </div>
      </div>

      <div>
        <div v-for="question in useHashtag.data2.arr3" :key="question.id">
          <vMonoQuestionVue :data="question"> </vMonoQuestionVue>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vMonoQuestionVue from "../../components/question/vMonoQuestion.vue";
import vListBlogVue from "../../components/blog/vListBlog.vue";
import { ref, onMounted } from "vue";
import { hashtagStore } from "../../stores/hashtag.store";
import { useRoute } from "vue-router";

const useHashtag = hashtagStore();
const route = useRoute();

onMounted(() => {
  useHashtag.findBlogOnHashtag(route.params.id);
});
</script>

<style></style>
