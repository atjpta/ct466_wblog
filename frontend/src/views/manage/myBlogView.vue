<template>
  <div>
    <div class="bg-white/50 w-2/5 mx-auto p-3 my-5 rounded-xl text-4xl text-center">
      Bài viết của bạn
    </div>
    <vManageBlog :data="useBlog.data" class="pb-20" />
  </div>
</template>

<script setup>
import vManageBlog from "../../components/manage/vManageBlog.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { blogStore } from "../../stores/blog.store";
import { authStore } from "../../stores/auth.store";

const route = useRoute();
const useBlog = blogStore();
const useAuth = authStore();
onMounted(() => {
  useBlog.getBlogUser(useAuth.user.id);
});
</script>

<style></style>
