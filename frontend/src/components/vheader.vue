<template>
  <div>
    <div class="navbar mb-10 bg-white/50 text-xl">
      <!-- bên trái -->
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <i class="fa-solid fa-bars"></i>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
          >
            <li class="mt-3">
              <div
                class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
              >
                <router-link to="/homeblog">
                  <button>
                    <i class="fa-solid fa-house"></i>
                    Trang chủ
                  </button>
                </router-link>
              </div>
            </li>
            <li class="mt-5" tabindex="0">
              <div
                class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
              >
                <!-- <router-link to="/trang2"> -->
                <button>
                  <i class="fa-solid fa-circle-question"></i>
                  Giúp đỡ
                </button>
                <!-- </router-link> -->
              </div>
              <ul class="p-2 bg-white">
                <li>
                  <div
                    class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
                  >
                    <router-link to="/">
                      <button>
                        <i class="fa-solid fa-phone"></i>
                        submenu 1
                      </button>
                    </router-link>
                  </div>
                </li>
                <li>
                  <div
                    class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
                  >
                    <router-link to="/">
                      <button>
                        <i class="fa-solid fa-phone"></i>
                        submenu 2
                      </button>
                    </router-link>
                  </div>
                </li>
              </ul>
            </li>
            <li class="mt-5">
              <div
                class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
              >
                <router-link to="/">
                  <button>
                    <i class="fa-solid fa-phone"></i>
                    Liên hệ
                  </button>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
        <div class="mx-10 hover:text-violet-700 hover:scale-125 duration-300">
          <router-link to="/">
            <button>WBLOG</button>
          </router-link>
          <div class="animate-ping border-b-2 border-blue-500 h-1 w-20"></div>
        </div>
      </div>
      <!-- ở giữa -->
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal p-0">
          <li class="mx-5">
            <div
              class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
            >
              <router-link to="/homeblog">
                <button>
                  <i class="fa-solid fa-house"></i>
                  Trang chủ
                </button>
              </router-link>
            </div>
          </li>
          <li class="mx-5" tabindex="0">
            <div
              class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
            >
              <!-- <router-link to="/homeblog"> -->
              <button>
                <i class="fa-solid fa-house"></i>
                giúp đỡ
              </button>
              <!-- </router-link> -->
            </div>
            <ul class="p-2 bg-white/50">
              <li>
                <div
                  class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
                >
                  <router-link to="/">
                    <button>
                      <i class="fa-solid fa-phone"></i>
                      submenu 1
                    </button>
                  </router-link>
                </div>
              </li>
              <li>
                <div
                  class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
                >
                  <router-link to="/">
                    <button>
                      <i class="fa-solid fa-phone"></i>
                      submenu 2
                    </button>
                  </router-link>
                </div>
              </li>
            </ul>
          </li>
          <li class="mx-5">
            <div
              class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
            >
              <router-link to="/">
                <button>
                  <i class="fa-solid fa-phone"></i>
                  Liên hệ
                </button>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
      <!-- bên phải  -->
      <div class="navbar-end">
        <div v-if="!useAuthStore.user">
          <div
            class="flex justify-start mx-10 active:bg-violet-700/30 truncate text-xl p-3 shadow-violet-700 shadow-md rounded-lg hover:text-blue-900 duration-300"
          >
            <router-link to="/login" class=""><button>Đăng nhập</button></router-link>
          </div>
        </div>
        <div v-else class="dropdown">
          <label tabindex="0">
            <div
              class="flex justify-start mx-10 active:bg-violet-700/30 truncate text-xl p-1 shadow-violet-700 shadow-md rounded-lg hover:text-blue-900 hover:scale-125 duration-300"
              v-if="useAuthStore.user"
            >
              <img
                class="w-12 h-12 rounded-full"
                :src="useAuthStore.user.avatar_Url"
                alt=""
              />
              <div class="truncate w-24 h-12 p-3 text-center">
                {{ useAuthStore.user.name }}
              </div>
            </div>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
          >
            <li class="mt-3">
              <div
                class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
              >
                <router-link to="/addblog">
                  <button>
                    <i class="fa-solid fa-file-circle-plus"></i>
                    Tạo bài viết
                  </button>
                </router-link>
              </div>
            </li>
            <li class="mt-3">
              <div
                class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
              >
                <router-link to="/profile">
                  <button>
                    <i class="fa-solid fa-address-card"></i>
                    Thông tin cá nhân
                  </button>
                </router-link>
              </div>
            </li>
            <li class="mt-5">
              <div
                class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
              >
                <router-link to="/">
                  <button>
                    <i class="fa-solid fa-list"></i>
                    Quản lý bài viết
                  </button>
                </router-link>
              </div>
            </li>
            <li class="mt-5">
              <div
                class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
              >
                <router-link to="/login" @click.prevent="useAuthStore.logout()"
                  ><button>
                    <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
                  </button></router-link
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { authStore } from "@/stores/auth.store";
import { onBeforeMount } from "vue";
const useAuthStore = authStore();
onBeforeMount(() => {
  useAuthStore.loadAuthState();
});
</script>

<style></style>
