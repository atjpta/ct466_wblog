<template>
  <div class="">
    <div
      v-for="blog in useBlog.ListBlog"
      :key="blog.id"
      class="bg-white/50 rounded-2xl m-5"
    >
      <div class="text-4xl font-bold py-5 uppercase p-3">
        {{ blog.title }}
      </div>
      <div class="flex p-5">
        <button
          @click="read(blog.id)"
          class="p-4 mx-3 text-2xl text-center shadow-violet-500 shadow-md rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          Xem
        </button>
        <button
          class="p-3 mx-3 text-2xl text-center shadow-yellow-500 shadow-md rounded-3xl hover:text-yellow-500 hover:scale-125 duration-300"
        >
          Sửa
        </button>
        <button
          class="p-3 mx-3 text-2xl text-center shadow-red-500 shadow-md rounded-3xl hover:text-red-500 hover:scale-125 duration-300"
        >
          Xóa
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { blogStore } from "../../stores/blog.store";
import emptyImage from "@/assets/upload-image.png";

const useBlog = blogStore();
const router = useRouter();
const route = useRoute();

async function read(id) {
  const redirectPath = route.query.redirect || {
    path: `/readblog/${id}`,
  };
  router.push(redirectPath);
}
onMounted(() => {
  useBlog.getListBlog();
});
</script>

<style></style>
