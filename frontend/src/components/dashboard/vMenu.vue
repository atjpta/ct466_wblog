<template>
  <div>
    <div class="w-80 border-2 bg-base-200 p-4 rounded-2xl m-5">
      <router-link to="/dashboard">
        <div class="avatar flex justify-center">
          <div class="w-32 h-32 rounded-full">
            <!-- <img :src="useAuth.user.avatar_Url" /> -->
            <img src="../../../public/imgs/avatar.jpg" />
          </div>
          <!-- <p class="mt-3 px-2">{{ useAuth.user.name }}</p> -->
        </div>
        <p class="mt-3 px-2 text-center font-semibold text-2xl">name</p>
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
            <li v-for="j in i.content" :key="j" class="hover-bordered ml-3">
              <router-link to="/dashboard">{{ j }}</router-link>
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

const data = ref([
  {
    title: "Trang cá nhân",
    content: [1, 2, 3, 4],
  },
  {
    title: "Quản lý Hóa đơn",
    content: [1, 2, 3, 4],
  },
  {
    title: "Quản lý bài viết",
    content: [1, 2, 3, 4],
  },
  {
    title: "Cài đặt",
    content: [1, 2, 3, 4],
  },
]);

const open = ref("");
</script>

<style></style>
