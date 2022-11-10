<template>
  <div>
    <div class="w-80 bg-base-200 p-4 rounded-2xl m-5">
      <router-link to="/dashboard">
        <div class="avatar flex justify-center">
          <div class="w-32 h-32 rounded-full">
            <img :src="useAuth.user.avatar_Url" />
          </div>
        </div>
        <p class="mt-3 px-2 text-center font-semibold text-2xl">
          {{ useAuth.user.name }}
        </p>
      </router-link>
      <div class="divider"></div>
      <ul class="menu w-64 p-2 rounded-box">
        <div v-for="i in data" :key="i.title">
          <li
            @click="open == i.title ? (open = '') : (open = i.title)"
            class="menu-title text-base btn btn-ghost text-start"
          >
            {{ i.title }}
            <div class="text-end">
              <i
                :class="[
                  open == i.title
                    ? 'fa-solid fa-caret-down text-3xl'
                    : 'fa-solid fa-caret-right text-3xl',
                ]"
              ></i>
            </div>
          </li>
          <transition name="bounce">
            <div class="" v-if="open == i.title">
              <li v-for="j in i.content" :key="j.id" class="hover-bordered ml-3">
                <router-link :to="`/dashboard/${j.url}`">{{ j.title }}</router-link>
              </li>
            </div>
          </transition>
          <div class="divider"></div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { authStore } from "../../stores/auth.store";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const useAuth = authStore();
const data = ref([
  {
    title: "Trang cá nhân",
    content: [
      {
        title: "Thông tin cá nhân",
        url: "profile",
      },
      {
        title: "Theo dõi",
        url: "follow",
      },
      {
        title: "Bài viết đã lưu",
        url: "followblog",
      },
      {
        title: "Bài viết đã mở khóa",
        url: "blogunlocked",
      },
    ],
  },
  {
    title: "Quản lý Mua hàng",
    content: [
      {
        title: "Giỏ hàng",
        url: "cart",
      },
      {
        title: "Lịch sử mua hàng",
        url: "historybill",
      },
      {
        title: "Thống kê",
        url: "1",
      },
    ],
  },
  {
    title: "Quản lý bài viết",
    content: [
      {
        title: "Chỉnh sửa bài viết",
        url: "manageblog",
      },
      {
        title: "Lịch sử bán hàng",
        url: "1",
      },
      {
        title: "Thống kê",
        url: "1",
      },
    ],
  },
  {
    title: "Cài đặt",
    content: [],
  },
]);
const open = ref("");
const link = route.fullPath;
let url = link.substring(11, link.length);
let mark = false;

data.value.forEach((e) => {
  e.content.forEach((e2) => {
    if (e2.url == url) {
      mark = true;
      open.value = e.title;
      return;
    }
  });
  if (mark) {
    return;
  }
});
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
/* .bounce-leave-active {
  animation: bounce-in 0.5s reverse;
} */
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.router-link-exact-active {
  color: rgb(255, 255, 255);
  background-color: rgba(87, 13, 248);
  font-weight: 700;
}
</style>
