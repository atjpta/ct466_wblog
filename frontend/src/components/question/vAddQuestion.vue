<template>
  <div class="">
    <div class="">
      <!-- tiêu đề bài viết  -->
      <div class="mx-auto w-5/6">
        <p class="text-4xl pt-10 pb-5">Nhập tiêu đề câu hỏi:</p>
        <input
          v-bind="useQuestion.question.title"
          v-model="data.title"
          class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full"
          type="text"
        />
      </div>

      <!-- noi dung bài viết -->
      <div class="mx-auto w-5/6">
        <p class="text-4xl pt-10 pb-5">Nhập dung câu hỏi:</p>
        <div class="">
          <QuillEditor
            :content="useQuestion.question.content"
            v-model:content="data.content"
            ref="quill"
            theme="snow"
            toolbar="full"
          />
        </div>
      </div>
      <!-- hashtag -->
      <div class="mt-10 mx-auto w-5/6">
        <vhashtag />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import vhashtag from "../blog/vEditHashtag.vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { questStore } from "../../stores/question.store";
const useQuestion = questStore();

const pops = defineProps({
  data: Object,
});
</script>

<style scoped></style>
