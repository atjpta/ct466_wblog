<template>
  <div class="bg-base-300 rounded-2xl lg:w-3/5 m-auto">
    <div class="text-6xl py-10 text-center">SỬA BÀI VIẾT</div>
    <vEditBlog v-model:blog="blog" />
    <div class="flex justify-end mx-10 py-5 text-2xl">
      <div v-show="!loading" class="flex justify-center">
        <button @click="updateBlog()" class="btn btn-outline btn-primary">Tạo</button>
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
