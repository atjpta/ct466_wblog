<template>
  <div>
    <vCommentVue :data="useBlog.blog.comment_Blog" />
  </div>
</template>

<script setup>
import vInput from "../components/Comment/vInputCmt.vue";
import vCommentVue from "../components/Comment/vComment.vue";
import { onMounted, ref } from "vue";
import { blogStore } from "../stores/blog.store";

const useBlog = blogStore();

function indata() {
  console.log(data.value.content.ops.length);
}

onMounted(() => {
  useBlog.findOneBlog("635bf5e48c7ed79dbfc92f89");
});
</script>

<style></style>
