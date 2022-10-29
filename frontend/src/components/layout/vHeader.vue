<template>
  <div class="z-50 mb-5">
    <div
      class="border-b-2 h-[70px] bg-white dark:bg-gray-700 dark:text-white flex justify-between"
    >
      <!--  bên trái -->
      <!-- tên / logo -->
      <div class="flex">
        <div class="xl:hidden block relative">
          <i
            @click="openLeft = !openLeft"
            :class="[openLeft ? 'fa-solid fa-x' : 'fa-solid fa-bars']"
            class="font-semibold cursor-pointer active:bg-violet-500/50 text-center hover:bg-violet-500/20 truncate p-3 mt-2 ml-3 rounded-xl hover:text-violet-800 text-4xl"
          ></i>
        </div>
        <router-link
          class="cursor-pointer rounded-2xl uppercase font-semibold w-[150px] px-10 m-2 pt-3 text-xl text-center truncate hover:bg-violet-500/30 active:bg-violet-500/50 hover:scale-125 duration-300"
          to="/homeblog"
        >
          <div class="">
            wblog
            <div class="animate-ping border-b-2 border-blue-500 h-1 w-20"></div>
          </div>
        </router-link>

        <vToggleDarkModeVue class="mt-5" />
      </div>
      <!-- ở giữa -->
      <div v-if="useAuth.isUserLoggedIn" class="justify-between hidden xl:flex">
        <!-- nút thứ 1 -->
        <router-link
          class="cursor-pointer rounded-2xl uppercase font-semibold w-[200px] px-10 m-2 pt-3 text-center truncate hover:bg-violet-500/30 active:bg-violet-500/50 hover:scale-125 duration-300"
          to="/follow"
        >
          <i class="fa-solid fa-heart"></i>
          Theo dõi
        </router-link>
        <!-- nút thứ 2 -->
        <router-link
          class="cursor-pointer rounded-2xl uppercase font-semibold w-[200px] px-10 m-2 pt-3 text-center truncate hover:bg-violet-500/30 active:bg-violet-500/50 hover:scale-125 duration-300"
          to="/shop"
        >
          <i class="fa-solid fa-basket-shopping"></i>
          Cửa Hàng
        </router-link>
        <!-- nút thứ 3 -->

        <router-link
          class="cursor-pointer rounded-2xl uppercase font-semibold w-[200px] px-10 m-2 pt-3 text-center truncate hover:bg-violet-500/30 active:bg-violet-500/50 hover:scale-125 duration-300"
          to="/search"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
          Tìm kiếm
        </router-link>

        <!-- nút thứ 4 -->
        <vdropdown type="header" title="menu2" :data="data" />
      </div>
      <!-- bên phải -->

      <div class="w-[200px] mr-5">
        <div
          v-if="!useAuth.isUserLoggedIn"
          class="font-semibold text-lg cursor-pointer mx-auto w-[150px] active:bg-violet-500/50 text-center hover:bg-violet-500/20 truncate shadowa-violet-500 shadowa-md p-3 rounded-2xl hover:text-violet-800"
        >
          Đăng nhập
        </div>
        <vdropdownAvatar
          v-if="useAuth.isUserLoggedIn"
          :name="useAuth.user.name"
          :avatar="useAuth.user.avatar_Url"
          :data="dataAvatar"
        />
      </div>
    </div>

    <!-- slidebar bên trái -->
    <div
      v-if="openLeft"
      class="xl:hidden absolute left-auto z-40 block backdrop-blur-sm bg-gradient-to-r from-green-400/50 to-blue-500/50 w-fit rounded-2xl m-2"
    >
      <!-- nút thứ 1 -->
      <div class="flex justify-between">
        <div>
          <div class="w-[200px] m-2 mx-auto">
            <router-link to="/follow">
              <div
                class="font-semibold text-lg cursor-pointer mx-auto w-[150px] active:bg-violet-500/50 text-center hover:bg-violet-500/20 truncate shadowa-violet-500 shadowa-md p-3 rounded-2xl hover:text-violet-800"
              >
                <i class="fa-solid fa-heart"></i>
                Theo dõi
              </div>
            </router-link>
          </div>
          <!-- nút thứ 2 -->
          <div class="w-[200px] m-2 mx-auto">
            <router-link to="/shop">
              <div
                class="font-semibold text-lg cursor-pointer mx-auto w-[150px] active:bg-violet-500/50 text-center hover:bg-violet-500/20 truncate shadowa-violet-500 shadowa-md p-3 rounded-2xl hover:text-violet-800"
              >
                <i class="fa-solid fa-basket-shopping"></i>
                Cửa Hàng
              </div>
            </router-link>
          </div>
          <!-- nút thứ 3 -->
          <div class="w-[200px] m-2 mx-auto">
            <router-link to="/search">
              <div
                class="font-semibold text-lg cursor-pointer mx-auto w-[150px] active:bg-violet-500/50 text-center hover:bg-violet-500/20 truncate shadowa-violet-500 shadowa-md p-3 rounded-2xl hover:text-violet-800"
              >
                <i class="fa-solid fa-magnifying-glass"></i>
                Tìm kiếm
              </div>
            </router-link>
          </div>
          <!-- nút thứ 4 -->
          <vdropdown title="menu2" :data="data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vdropdown from "../dropdown/vDropDown.vue";
import vdropdownAvatar from "../dropdown/vDropDownAvatar.vue";
import vToggleDarkModeVue from "./vToggleDarkMode.vue";
import { ref, onBeforeMount } from "vue";
import { authStore } from "../../stores/auth.store";
import { infoStore } from "../../stores/info.store";

const useAuth = authStore();
const data = ref([
  {
    name: "thành phần 1",
    url: "/trang2",
  },
  {
    name: "thành phần 2",
    url: "/trang2",
  },
  {
    name: "thành phần 2",
    url: "/trang2",
  },
]);

const dataAvatar = ref([
  {
    name: "Tạo bài viết",
    url: "/addblog",
    icon: "fa-solid fa-file-circle-plus",
  },
  {
    name: "Trang cá nhân",
    url: "/profile",
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

onBeforeMount(() => {
  useAuth.loadAuthState();
});
</script>

<style scoped>
.router-link-exact-active {
  color: rgb(0, 0, 0);
  background-color: rgba(138, 92, 246, 0.726);
  /* box-shadow: 0px 0px 3px rgb(139 92 246);
  border-radius: 1rem; */
  font-weight: 700;
}
</style>
