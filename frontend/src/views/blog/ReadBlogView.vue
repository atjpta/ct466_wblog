<template>
  <div>
    <div class="bg-base-300 rounded-2xl lg:w-3/5 mt-10 pb-10 mx-auto">
      <div>
        <vBlogVue />
        <vCmtVue />
      </div>
    </div>
  </div>
</template>

<script setup>
import vCmtVue from "../../components/blog/vCmt.vue";
import vBlogVue from "../../components/blog/vBlog.vue";
</script>

<style></style>
