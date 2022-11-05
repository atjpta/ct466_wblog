<template>
  <div class="bg-base-300 rounded-2xl lg:w-3/5 m-auto">
    <div class="text-6xl py-10 text-center">TẠO BÀI VIẾT</div>
    <vEditBlog v-model:blog="useBlog.blogEdit" />
    <div class="flex justify-end mx-10 py-5 text-2xl">
      <div v-show="!loading" class="flex justify-center">
        <button @click="createBlog()" class="btn btn-outline btn-primary">Tạo</button>
      </div>

      <div v-show="loading" class="flex justify-center">
        <div class="btn btn-outline btn-primary loading">Đang tạo</div>
      </div>

      <div class="flex justify-center ml-10">
        <button @click="router.back()" class="btn btn-outline btn-warning">Hủy</button>
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
