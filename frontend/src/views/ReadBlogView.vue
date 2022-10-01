<template>
  <div>
    <div class="bg-white/50 w-3/5 mx-auto py-10">
      <div>
        <vBlogVue />
        <vVote />
        <vCmtVue />
      </div>
    </div>
  </div>
</template>

<script setup>
import vCmtVue from "../components/vCmt.vue";
import vBlogVue from "../components/vBlog.vue";
import vVote from "../components/vVote.vue";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, onBeforeMount } from "vue";
import blogService from "../services/blog.service";
import { blogStore } from "../stores/blog.store";

const router = useRouter();
const route = useRoute();

const useBlog = blogStore();

async function getApi() {
  await useBlog.findOneBlog(route.params.id);
}

onMounted(getApi);
</script>

<style></style>
