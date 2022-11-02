<template>
  <div>
    <div class="bg-base-300 rounded-2xl lg:w-3/5 mt-10 pb-10 mx-auto">
      <div>
        <vBlogVue />
        <vCommentVue :data="useBlog.blog.comment_Blog" />
      </div>
    </div>
  </div>
</template>

<script setup>
import vBlogVue from "../../components/blog/vBlog.vue";
import vCommentVue from "../../components/Comment/vComment.vue";
import { blogStore } from "../../stores/blog.store";
const useBlog = blogStore();
</script>

<style></style>
