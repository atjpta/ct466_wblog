<template>
  <div class="mx-auto">
    <div class="flex space-x-5 justify-center">
      <div>
        <div v-for="blog in useSearch.dataBlog.arr1" :key="blog.id">
          <vMonoBlogVue :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in useSearch.dataBlog.arr2" :key="blog.id">
          <vMonoBlogVue :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in useSearch.dataBlog.arr3" :key="blog.id">
          <vMonoBlogVue :data="blog" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import vMonoBlogVue from "../../../components/blog/vMonoBlog.vue";
import { searchStore } from "../../../stores/search.store";
const useSearch = searchStore();
onMounted(() => {
  useSearch.getListBlog();
});
</script>

<style></style>
