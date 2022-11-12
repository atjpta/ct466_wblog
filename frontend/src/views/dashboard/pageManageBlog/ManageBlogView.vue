<template>
  <div class="mx-auto m-5">
    <vManageStatVue></vManageStatVue>
    <div class="flex space-x-5 justify-center">
      <div v-if="useBlog.ListBlog.length < 1">
        <div class="font-semibold text-3xl text-center m-5">Bạn chưa có bài viết!!</div>
      </div>
      <div>
        <div v-for="blog in useBlog.data.arr1" :key="blog.id">
          <vManageMonoBlogVue :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in useBlog.data.arr2" :key="blog.id">
          <vManageMonoBlogVue :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in useBlog.data.arr3" :key="blog.id">
          <vManageMonoBlogVue :data="blog" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vManageStatVue from "../../../components/manageBlog/vManageStat.vue";
import vManageMonoBlogVue from "../../../components/manageBlog/vManageMonoBlog.vue";
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
