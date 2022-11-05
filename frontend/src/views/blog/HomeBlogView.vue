<template>
  <div>
    <div class="flex space-x-5 justify-center">
      <div>
        <div v-for="blog in useBlog.data.arr1" :key="blog.id">
          <vMonoBlogVue :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in useBlog.data.arr2" :key="blog.id">
          <vMonoBlogVue :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in useBlog.data.arr3" :key="blog.id">
          <vMonoBlogVue :data="blog" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vMonoBlogVue from "../../components/blog/vMonoBlog.vue";
import { ref, onMounted } from "vue";
import { blogStore } from "../../stores/blog.store";
import { authStore } from "../../stores/auth.store";
import { cartStore } from "../../stores/cart.store";
const useCart = cartStore();
const useAuth = authStore();
const useBlog = blogStore();
onMounted(() => {
  useBlog.getListBlog();
  useCart.getListCart(useAuth.user.id);
});
</script>

<style></style>
