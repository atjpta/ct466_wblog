<template>
  <div class="relative">
    <div
      class="shadow-md bg-gradient-to-r from-green-400/50 to-blue-500/50 flex justify-between"
    >
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
      <div class="justify-around hidden xl:flex">
        <!-- nút thứ 1 -->
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
        <vdropdown type="header" title="menu2" :data="data" />
        <!-- nút thứ 4 -->
        <vdropdown type="header" title="menu2" :data="data" />
      </div>
      <!-- bên phải -->
      <div class="w-[200px] m-3">
        <div
          class="font-semibold text-lg cursor-pointer mx-auto w-[150px] active:bg-violet-500/50 text-center hover:bg-violet-500/20 truncate shadow-violet-500 shadow-md p-4 rounded-2xl hover:text-violet-800"
        >
          Đăng nhập
        </div>
      </div>
      <!-- <vdropdownAvatar name="avatar" avatar="../../public/imgs/avatar.jpg" :data="data" /> -->
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

    hjter;hj;
  </div>
</template>

<script setup>
import vdropdown from "../components/dropdown/vDropDown.vue";
import vdropdownAvatar from "../components/dropdown/vDropDownAvatar.vue";
import { ref, onMounted } from "vue";

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

const openLeft = ref(false);
const openRight = ref(false);
</script>

<style></style>
