<template>
  <div class="w-[200px] mx-auto text-center m-2 relative text-lg font-semibold">
    <div>
      <div class="" @mouseenter="open = true" @mouseleave="open = false">
        <!-- tiêu đề  -->
        <div
          class="w-[200px] mx-auto hover:bg-violet-500/20 truncate shadow-violet-500 shadow-md rounded-2xl hover:text-fuchsia-800 flex justify-center"
        >
          <img class="rounded-full w-12 h-12" :src="avatar" alt="" />
          <div class="p-3">{{ name }}</div>
        </div>
        <!-- noi dung  -->
        <div
          v-show="open"
          class="backdrop-blur-sm bg-gradient-to-r from-green-400/50 to-blue-500/50 w-[300px] z-50 absolute right-0 mx-auto rounded-2xl py-4 space-y-3"
        >
          <div v-for="i in data" :key="i.name">
            <div v-if="i.url != '/login'">
              <router-link :to="i.url">
                <div
                  class="backdrop-blur-sm cursor-pointer w-[250px] mx-auto active:bg-teal-500/50 hover:bg-teal-500/20 truncate shadow-teal-500 shadow-md p-3 rounded-2xl hover:text-teal-800 hover:scale-125 duration-300"
                >
                  <i :class="i.icon"></i>
                  {{ i.name }}
                </div>
              </router-link>
            </div>

            <div v-if="i.url == '/login'">
              <router-link :to="i.url">
                <div
                  @click="logout()"
                  class="backdrop-blur-sm cursor-pointer w-[250px] mx-auto active:bg-teal-500/50 hover:bg-teal-500/20 truncate shadow-teal-500 shadow-md p-3 rounded-2xl hover:text-teal-800 hover:scale-125 duration-300"
                >
                  <i :class="i.icon"></i>
                  {{ i.name }}
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { authStore } from "../../stores/auth.store";

const useAuth = authStore();

const props = defineProps({
  avatar: String,
  name: String,
  data: Array,
});

const open = ref(false);

function logout() {
  useAuth.logout();
}
</script>

<style></style>
