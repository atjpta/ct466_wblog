<template>
  <div>
    <vListBlogVue :data="useBlog.data" class="pb-20" />
  </div>   
</template>

<script setup>
import vListBlogVue from "../components/vListBlog2.vue";
import { ref, onMounted } from "vue";
import { blogStore } from "../stores/blog.store";
const useBlog = blogStore();
onMounted(() => {
  useBlog.getListBlog();
});
</script>

<style></style>
