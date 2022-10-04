<template>
  <div>
    <!-- blog -->
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
      <QuillEditor ref="quill" :readOnly="true" theme="bubble" :toolbar="[]" />
    </div>

    <!-- vote -->
    <div class="text-2xl flex justify-around border-b-4 border-black">
      <button
        class="p-3 items-center justify-center flex h-16 hover:text-red-500 hover:scale-150 duration-300"
      >
        <i class="fa-solid fa-heart"></i>
        <p class="mx-2">{{ useBlog.blog.voted.tim.length || 0 }}</p>
      </button>
      <button
        class="p-3 items-center justify-center flex h-16 hover:text-blue-500 hover:scale-150 duration-300"
      >
        <i class="fa-solid fa-thumbs-down pt-1"></i>
        <p class="mx-2">{{ useBlog.blog.voted.dislike.length || 0 }}</p>
      </button>
      <div class="p-3 flex items-center justify-center">
        <i class="fa-solid fa-comments pt-1"></i>
        <p class="mx-2">{{ useBlog.blog.comment_Blog.length || 0 }}</p>
      </div>
      <div class="p-3 flex items-center justify-center">
        <i class="fa-solid fa-eye pt-1"></i>
        <div class="mx-2">{{ useBlog.blog.voted.view.length || 0 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import emptyImage from "@/assets/upload-image.png";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, onBeforeMount } from "vue";
import blogService from "../services/blog.service";
import { blogStore } from "../stores/blog.store";

const router = useRouter();
const route = useRoute();

const useBlog = blogStore();

const quill = ref();

async function getApi() {
  await useBlog.findOneBlog(route.params.id);
  setContent();
}

const setContent = () => {
  quill.value.setContents(useBlog.blog.content);
};
onMounted(() => {
  getApi();
});
</script>

<style></style>
