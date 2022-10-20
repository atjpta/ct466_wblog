<template>
  <div class="relative mb-10">
    <div class="bg-gradient-to-r from-green-400/50 to-blue-500/50 flex justify-around">
      <!--  bên trái -->
      <!-- tên / logo -->
      <div class="flex">
        <div class="xl:hidden block">
          <i
            @click="openLeft = !openLeft"
            :class="[openLeft ? 'fa-solid fa-x' : 'fa-solid fa-bars']"
            class="font-semibold cursor-pointer active:bg-violet-500/50 text-center hover:bg-violet-500/20 truncate p-3 mt-3 ml-3 rounded-xl hover:text-violet-800 text-4xl"
          ></i>
        </div>
        <div
          class="uppercase font-semibold px-10 py-7 text-xl hover:text-violet-700 hover:scale-125 duration-300"
        >
          wblog
          <div class="animate-ping border-b-2 border-blue-500 h-1 w-20"></div>
        </div>
      </div>

      <!-- ở giữa -->
      <div class="justify-between hidden xl:flex">
        <!-- nút thứ 1 -->
        <div class="w-[200px] m-3 mx-auto">
          <router-link to="/homeblog">
            <div
              class="font-semibold text-lg cursor-pointer mx-auto w-[150px] active:bg-violet-500/50 text-center hover:bg-violet-500/20 truncate shadow-violet-500 shadow-md p-4 rounded-2xl hover:text-violet-800"
            >
              Trang chủ
            </div>
          </router-link>
        </div>
        <!-- nút thứ 2 -->
        <div class="w-[200px] m-3 mx-auto">
          <div
            class="font-semibold text-lg cursor-pointer mx-auto w-[150px] active:bg-violet-500/50 text-center hover:bg-violet-500/20 truncate shadow-violet-500 shadow-md p-4 rounded-2xl hover:text-violet-800"
          >
            menu2
          </div>
        </div>
        <!-- nút thứ 3 -->
        <vdropdown type="header" title="menu2" :data="data" />
        <!-- nút thứ 4 -->
        <vdropdown type="header" title="menu2" :data="data" />
      </div>
      <!-- bên phải -->

      <div class="w-[200px]">
        <div
          v-if="!useAuth.isUserLoggedIn"
          class="font-semibold text-lg cursor-pointer mx-auto w-[150px] active:bg-violet-500/50 text-center hover:bg-violet-500/20 truncate shadow-violet-500 shadow-md p-4 rounded-2xl hover:text-violet-800"
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
      class="xl:hidden absolute z-40 block bg-gradient-to-r from-green-400/50 to-blue-500/50 w-fit rounded-2xl m-3"
    >
      <!-- nút thứ 1 -->
      <div class="flex justify-between">
        <div>
          <div class="w-[200px] m-3 mx-auto">
            <div
              class="font-semibold text-lg cursor-pointer mx-auto w-[150px] active:bg-violet-500/50 text-center hover:bg-violet-500/20 truncate shadow-violet-500 shadow-md p-4 rounded-2xl hover:text-violet-800"
            >
              menu2
            </div>
          </div>
          <!-- nút thứ 2 -->
          <div class="w-[200px] m-3 mx-auto">
            <div
              class="font-semibold text-lg cursor-pointer mx-auto w-[150px] active:bg-violet-500/50 text-center hover:bg-violet-500/20 truncate shadow-violet-500 shadow-md p-4 rounded-2xl hover:text-violet-800"
            >
              menu2
            </div>
          </div>
          <!-- nút thứ 3 -->
          <vdropdown title="menu2" :data="data" />
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

<style></style>
