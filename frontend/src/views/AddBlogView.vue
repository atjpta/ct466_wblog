<template>
  <div class="bg-white/50 w-3/5 m-auto">
    <div class="text-6xl py-10 text-center">TẠO BÀI VIẾT</div>
    <vEditBlogVue />
    <div class="flex justify-end mx-10 text-2xl">
      <div v-show="!loading" class="flex justify-center">
        <button
          @click="createBlog()"
          class="my-20 p-3 text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          Tạo
        </button>
      </div>

      <div v-show="loading" class="flex justify-center">
        <div
          class="my-20 p-3 text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          <i class="fa-solid fa-spinner animate-spin px-4"></i>
          Đang tạo
        </div>
      </div>

      <div class="flex justify-center ml-10">
        <button
          @click="cancel()"
          class="my-20 p-3 text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          Hủy
        </button>
      </div>

      <div class=""></div>
    </div>
  </div>
</template>
<script setup>
import vEditBlogVue from "../components/vEditBlog.vue";
import { blogStore } from "../stores/blog.store";
import { ref, onMounted } from "vue";
import imgageService from "../services/image.service";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const useBlog = blogStore();
const loading = ref(false);
async function createBlog() {
  try {
    loading.value = true;
    if (useBlog.blogEdit.cover_image_Url) {
      await imgageService.uploadImage(useBlog.image);
    }
    const id = await useBlog.createBlog();
    const redirectPath = route.query.redirect || {
      path: `/readblog/${id}`,
    };
    router.push(redirectPath);
    useBlog.findOneBlog(id);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  useBlog.getdefault();
});
</script>

<style></style>
