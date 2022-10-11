<template>
  <div>
    <div class="bg-white/50 w-2/5 mx-auto p-3 rounded-xl text-4xl text-center">
      Kết quả tìm kiếm cho hashtag: {{ useHashtag.resultSearch.name }}
    </div>
    <vListBlogVue :data="useHashtag.resultSearch.blog" class="pb-20" />
  </div>
</template>

<script setup>
import vListBlogVue from "../components/vListBlog.vue";
import { ref, onMounted, nextTick } from "vue";
import { blogStore } from "../stores/blog.store";
import { hashtagStore } from "../stores/hashtag.store";
import { useRouter, useRoute } from "vue-router";

const useHashtag = hashtagStore();
const router = useRouter();
const route = useRoute();

onMounted(() => {
  useHashtag.findBlogOnHashtag(route.params.id);
});
</script>

<style></style>
