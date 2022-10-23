<template>
  <div>
    <div>
      <div class="text-center text-4xl font-semibold">Tác giả đã theo dõi</div>
      <vListCardUserMini :data="useSearch.ListFollow.listUser" />
    </div>
    <div>
      <div class="text-center text-4xl font-semibold">Các blog</div>
      <vListBlogVue :data="useSearch.dataBlog" />
    </div>
  </div>
</template>

<script setup>
import vListCardUserMini from "../../components/search/vListCardUserMini.vue";
import vListBlogVue from "../../components/blog/vListBlog.vue";
import { searchStore } from "../../stores/search.store";
import { ref, onMounted } from "vue";

const useSearch = searchStore();

onMounted(() => {
  useSearch.getListFollow();
});
</script>

<style></style>
