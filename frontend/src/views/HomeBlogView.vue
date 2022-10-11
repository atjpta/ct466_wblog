<template>
  <div>
    <vListBlogVue :data="useBlog.ListBlog" class="pb-20" />
  </div>
</template>

<script setup>
import vListBlogVue from "../components/vListBlog.vue";
import { ref, onMounted } from "vue";
import { blogStore } from "../stores/blog.store";
const useBlog = blogStore();

onMounted(() => {
  useBlog.getListBlog();
});
</script>

<style></style>
