<template>
  <div>
    <div class="bg-white/50 w-2/5 mx-auto p-3 my-5 rounded-xl text-4xl text-center">
      Kết quả tìm kiếm cho hashtag: {{ useHashtag.resultSearch.name }}
    </div>
    <vListBlogVue :data="useHashtag.data" class="pb-20" />
  </div>
</template>

<script setup>
import vListBlogVue from "../../components/blog/vListBlog.vue";
import { ref, onMounted } from "vue";
import { hashtagStore } from "../../stores/hashtag.store";
import { useRoute } from "vue-router";

const useHashtag = hashtagStore();
const route = useRoute();

onMounted(() => {
  useHashtag.findBlogOnHashtag(route.params.id);
});
</script>

<style></style>
