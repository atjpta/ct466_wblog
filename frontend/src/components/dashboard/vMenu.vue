<template>
  <div>
    <div class="w-80 border-2 bg-base-200 p-4 rounded-2xl m-5">
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
          <div class="" v-if="open == i.title">
            <li
              v-for="j in i.content"
              :key="j.id"
              :class="[activeChild == j.id ? 'bg-violet-500 text-white rounded-md' : '']"
              class="hover-bordered ml-3"
            >
              <a @click="activeChild = j.id">{{ j.title }}</a>
            </li>
          </div>
          <div class="divider"></div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { authStore } from "../../stores/auth.store";
const useAuth = authStore();
const data = ref([
  {
    title: "Trang cá nhân",
    content: [
      {
        title: "Thông tin cá nhân",
        id: "1.1",
      },
      {
        title: "Theo dõi",
        id: "1.2",
      },
      {
        title: "Đã lưu",
        id: "1.3",
      },
    ],
  },
  {
    title: "Quản lý Mua hàng",
    content: [
      {
        title: "Giỏ hàng",
        id: "2.1",
      },
      {
        id: "2.2",
        title: "Lịch sử mua hàng",
      },
      {
        id: "2.3",
        title: "Thống kê",
      },
    ],
  },
  {
    title: "Quản lý bài viết",
    content: [
      {
        id: "3.1",
        title: "Chỉnh sửa bài viết",
      },
      {
        title: "Lịch sử bán hàng",
        id: "3.2",
      },
      {
        id: "3.3",
        title: "Thống kê",
      },
    ],
  },
  {
    title: "Cài đặt",
    content: [],
  },
]);

const open = ref("Trang cá nhân");
const activeChild = ref("1.1");
</script>

<style></style>
