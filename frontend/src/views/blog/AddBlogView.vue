<template>
  <div class="bg-white dark:text-white dark:bg-gray-700 rounded-2xl lg:w-3/5 m-auto">
    <div class="text-6xl py-10 text-center">TẠO BÀI VIẾT</div>
    <vEditBlog v-model:blog="useBlog.blogEdit" />
    <div class="flex justify-end mx-10 text-2xl">
      <div v-show="!loading" class="flex justify-center">
        <button
          @click="createBlog()"
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
import { hashtagStore } from "../../stores/hashtag.store";
import { blogStore } from "../../stores/blog.store";

const blog = ref({ premium: false });

const router = useRouter();
const route = useRoute();
const useHashtag = hashtagStore();
const useBlog = blogStore();
const loading = ref(false);

async function createBlog() {
  try {
    loading.value = true;
    const id = await useBlog.createBlog(useBlog.blogEdit);
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

onMounted(() => {
  useHashtag.selectedHashtag = [];
  useHashtag.newHashtag = [];
  useHashtag.listAddHashtagToBlog = [];
});
</script>

<style></style>
