<template>
  <div class="text-3xl">
    <div class="navbar bg-base-100 border-b-2">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li v-for="i in dataMidNav" :key="i">
              <router-link :to="i.url">
                <i :class="i.icon"></i>
                {{ i.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="mx-5">
          <router-link to="/homeblog" class="btn btn-ghost normal-case text-3xl"
            >Wblog</router-link
          >
          <div class="ml-2 animate-ping border-b-2 border-blue-500 h-1 w-20"></div>
        </div>
      </div>
      <div v-if="useAuth.isUserLoggedIn" class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal p-0">
          <li class="hover-bordered" v-for="i in dataMidNav" :key="i">
            <router-link :to="i.url">
              <i :class="i.icon"></i>
              {{ i.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <!-- chỉnh theme -->
        <vThemeVue />
        <!-- nút đăng xuất -->
        <!-- <router-link to="dangki"> -->
        <button
          v-if="!useAuth.isUserLoggedIn"
          class="mx-3 btn btn-outline btn-primary hover-bordered"
        >
          Đăng nhập
        </button>
        <!-- </router-link> -->

        <!-- dropdown avatar -->
        <div v-if="useAuth.isUserLoggedIn" class="flex-none gap-2 mx-3">
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-12 rounded-full">
                <img :src="useAuth.user.avatar_Url" />
              </div>
            </label>
            <ul
              tabindex="0"
              class="mt-3 border-2 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <div class="avatar">
                <div class="w-12 h-12 rounded-full">
                  <img :src="useAuth.user.avatar_Url" />
                </div>
                <p class="mt-3 px-2">{{ useAuth.user.name }}</p>
              </div>
              <li></li>

              <li class="hover-bordered" v-for="i in dataAvatar" :key="i">
                <router-link v-if="i.name != 'Đăng xuất'" :to="i.url"
                  ><i :class="i.icon"></i>
                  {{ i.name }}
                </router-link>
                <router-link @click="logout()" v-if="i.name == 'Đăng xuất'" :to="i.url"
                  ><i :class="i.icon"></i>
                  {{ i.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vdropdown from "../dropdown/vDropDown.vue";
import vdropdownAvatar from "../dropdown/vDropDownAvatar.vue";
import vThemeVue from "./vTheme.vue";
import { ref, onBeforeMount } from "vue";
import { authStore } from "../../stores/auth.store";
import { infoStore } from "../../stores/info.store";

const useAuth = authStore();
const dataMidNav = ref([
  {
    name: "Theo dõi",
    url: "/follow",
    icon: "fa-solid fa-heart",
  },
  {
    name: "Cửa hàng",
    url: "/shop",
    icon: "fa-solid fa-basket-shopping",
  },
  {
    name: "Tìm kiếm",
    url: "/search",
    icon: "fa-solid fa-magnifying-glass",
  },
  {
    name: "Hỏi Đáp",
    url: "/homequestion",
    icon: "fa-solid fa-comment-dots",
  },
]);

const dataAvatar = ref([
  {
    name: "Tạo bài viết",
    url: "/addblog",
    icon: "fa-solid fa-file-circle-plus",
  },
  {
    name: "Tạo câu hỏi",
    url: "/addquestion",
    icon: "fa-solid fa-file-circle-question",
  },
  {
    name: "Trang dashboard",
    url: "/dashboard/profile",
    icon: "fa-solid fa-address-card",
  },
  {
    name: "Quản lý bài viết",
    url: "/myblog",
    icon: "fa-solid fa-list-check",
  },
  {
    name: "Đăng xuất",
    url: "/login",
    icon: "fa-solid fa-right-from-bracket",
  },
]);

const openLeft = ref(false);

function logout() {
  useAuth.logout();
}

onBeforeMount(() => {
  useAuth.loadAuthState();
});
</script>

<style scoped>
.router-link-exact-active {
  color: rgb(255, 255, 255);
  background-color: rgba(87, 13, 248);
  font-weight: 700;
}
</style>
