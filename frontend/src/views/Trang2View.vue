<template>
  <div>
    <div class="w-1/6 h-16 rounded-xl bg-yellow-400/50 m-auto">
      <button class="py-4 px-3" @click="test()">click me!! to test</button>
    </div>
    <div class="bg-white/50 w-5/6 mx-auto">
      <QuillEditor ref="quill" theme="snow" toolbar="full" />
    </div>
    {{ input }}
  </div>
</template>

<script setup>
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

async function getApi() {
  await useBlog.findOneBlog("6337bcf55d7b449496c55146");
  test();
}

const quill = ref(null);
const input = ref();
const test = () => {
  quill.value.setContents(useBlog.blog.content);
};
onBeforeMount(() => {});
onMounted(() => {
  getApi();
  test();
});
</script>

<style></style>
