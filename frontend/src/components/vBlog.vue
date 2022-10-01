<template>
  <div>
    <div class="text-6xl text-center font-bold uppercase mb-10">
      {{ useBlog.blog.title }}
    </div>
    <div class="h-16 m-auto flex w-4/5">
      <img
        class="bg-black h-16 w-16 rounded-full"
        :src="useBlog.blog.author.avatar_Url || emptyImage"
        alt=""
      />
      <div class="text-3xl text-blue-900 mx-3">
        {{ useBlog.blog.author.name }}
        <div class="text-lg">
          <i>{{ useBlog.blog.time }}</i>
        </div>
      </div>
    </div>

    <div class="bg-white/50 mx-auto w-5/6 my-10">
      <QuillEditor
        v-model:content="x"
        @ready="test($event)"
        :readOnly="true"
        theme="bubble"
        :toolbar="[]"
      />
    </div>
    {{ useBlog.blog.content }}
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import emptyImage from "@/assets/upload-image.png";
import { QuillEditor, Quill, Delta } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { blogStore } from "../stores/blog.store";
import blogService from "../services/blog.service";

const useBlog = blogStore();
const x = ref();
const test = async (e) => {
  const res = await blogService.findOneBlog("6337bcf55d7b449496c55146");
  e.editor.delta = res.content;
  x.value = res.content;
  console.log("x");
  console.log(x.value);
  console.log(e.editor.delta);
};
</script>

<style></style>
