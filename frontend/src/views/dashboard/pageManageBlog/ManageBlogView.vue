<template>
  <div class="mx-auto m-5">
    <div class="flex space-x-5 justify-center">
      <div>
        <div v-for="blog in useBlog.data.arr1" :key="blog.id">
          <vMonoBlogVue :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in useBlog.data.arr2" :key="blog.id">
          <vMonoBlogVue :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in useBlog.data.arr3" :key="blog.id">
          <vMonoBlogVue :data="blog" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vMonoBlogVue from "../../../components/blog/vMonoBlog.vue";
import { onMounted } from "vue";
import { authStore } from "../../../stores/auth.store";
import { blogStore } from "../../../stores/blog.store";
const useBlog = blogStore();
const useAuth = authStore();

onMounted(() => {
  useBlog.getBlogUser(useAuth.user.id);
});
</script>

<style></style>
