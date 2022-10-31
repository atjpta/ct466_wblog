<template>
  <div class="bg-base-300 rounded-2xl lg:w-3/5 m-auto">
    <div class="text-6xl py-10 text-center">SỬA BÀI VIẾT</div>
    <vEditBlog v-model:blog="blog" />
    <div class="flex justify-end mx-10 text-2xl">
      <div v-show="!loading" class="flex justify-center">
        <button
          @click="updateBlog()"
          class="active:bg-violet-700/30 my-20 p-3 px-5 text-2xl text-center shadow-violet-700 shadow-md rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          Tạo
        </button>
      </div>

      <div v-show="loading" class="flex justify-center">
        <div
          class="my-20 p-3 px-5 text-2xl text-center shadow-violet-700 shadow-md rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          <i class="fa-solid fa-spinner animate-spin px-4"></i>
          Đang tạo
        </div>
      </div>

      <div class="flex justify-center ml-10">
        <button
          @click="router.back()"
          class="my-20 p-3 px-5 text-2xl text-center active:bg-red-700/30 shadow-red-700 shadow-md rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          Hủy
        </button>
      </div>

      <div class=""></div>
    </div>
  </div>
</template>
<script setup>
import vEditBlog from "../../components/blog/vEditBlog.vue";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { blogStore } from "../../stores/blog.store";

const router = useRouter();
const route = useRoute();
const useBlog = blogStore();
const loading = ref(false);

const blog = ref({ edit: true });

async function updateBlog() {
  try {
    loading.value = true;
    const id = await useBlog.updateBlog();

    const redirectPath = route.query.redirect || {
      path: `/readblog/${id}`,
    };
    router.push(redirectPath);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>

<style></style>
