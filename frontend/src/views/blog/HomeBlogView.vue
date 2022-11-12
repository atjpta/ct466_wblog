<template>
  <div>
    <div class="flex justify-center m-5">
      <div class="btn-group space-x-5">
        <div v-for="tab in dataTab" :key="tab.value">
          <a
            :href="tab.value"
            :class="[
              selectTab == tab.value ? 'btn-active btn btn-primary ' : 'btn btn-outline ',
            ]"
          >
            {{ tab.title }}
          </a>
        </div>
      </div>
    </div>
    <div class="flex space-x-5 justify-center">
      <div>
        <div v-for="blog in filtersBlog.arr1" :key="blog.id">
          <vMonoBlogVue :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in filtersBlog.arr2" :key="blog.id">
          <vMonoBlogVue :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in filtersBlog.arr3" :key="blog.id">
          <vMonoBlogVue :data="blog" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vMonoBlogVue from "../../components/blog/vMonoBlog.vue";
import { ref, onMounted, computed } from "vue";
import { blogStore } from "../../stores/blog.store";
import { authStore } from "../../stores/auth.store";
import { cartStore } from "../../stores/cart.store";
import { useRoute } from "vue-router";
const route = useRoute();
const useCart = cartStore();
const useAuth = authStore();
const useBlog = blogStore();
let tab = route.hash;
const selectTab = computed(() => {
  if (route.hash) {
    return route.hash;
  }
});
const dataTab = ref([
  {
    title: "mới nhất",
    value: "#new",
  },
  {
    title: "xem nhiều nhất",
    value: "#view",
  },
  {
    title: "Điểm cao",
    value: "#rate",
  },
  {
    title: "Miễn phí",
    value: "#price",
  },
]);

const filtersBlog = computed(() => {
  if (useBlog.data.ListBlog) {
    let listBlog = useBlog.data.ListBlog;
    switch (selectTab.value) {
      case "#new":
        return useBlog.data;
        break;
      case "#view":
        listBlog.sort(function (b, a) {
          return a.voted.view - b.voted.view;
        });
        break;
      case "#rate":
        listBlog.sort(function (b, a) {
          return (
            a.voted.tim.length -
            a.voted.dislike.length -
            (b.voted.tim.length - b.voted.dislike.length)
          );
        });
        break;
      case "#price":
        listBlog = listBlog.filter((e) => e.price == 0);
        break;
    }
    return formatData(listBlog);
  }
  return useBlog.data;
});

function formatData(ListBlog) {
  const data = {
    arr1: [],
    arr2: [],
    arr3: [],
  };
  ListBlog.forEach((blog, i) => {
    if (i % 3 == 0) {
      data.arr1.push(ListBlog[i]);
    } else if (i % 3 == 1) {
      data.arr2.push(ListBlog[i]);
    } else if (i % 3 == 2) {
      data.arr3.push(ListBlog[i]);
    }
  });
  data.ListBlog = ListBlog;
  return data;
}
onMounted(() => {
  useBlog.getListBlog();
  useCart.getListCart(useAuth.user.id);
});
</script>

<style></style>
