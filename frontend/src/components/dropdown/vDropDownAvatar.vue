<template>
  <div class="m-2 relative text-lg font-semibold">
    <div>
      <div class="" @mouseenter="open = true" @mouseleave="open = false">
        <!-- tiêu đề  -->
        <div class="mx-auto w-16">
          <!-- <i class="fa-solid fa-crown text-2xl p-3 animate-pulse text-yellow-400"></i> -->
          <img class="rounded-full w-12 h-12 mt-1" :src="avatar" alt="" />
        </div>
        <!-- noi dung  -->
        <div
          v-if="open"
          class="bg-white dark:bg-gray-700 border-2 w-[300px] z-50 absolute right-0 mx-auto rounded-2xl py-4 space-y-3"
        >
          <div class="flex mx-auto w-[250px]">
            <img class="rounded-full w-12 h-12 mt-1" :src="avatar" alt="" />

            <div class="p-3">{{ name }}</div>
          </div>
          <div v-for="i in data" :key="i.name">
            <div v-if="i.url != '/login'">
              <router-link :to="i.url">
                <div
                  class="cursor-pointer w-[250px] mx-auto active:bg-teal-500/50 hover:bg-teal-500/20 truncate p-3 rounded-2xl hover:scale-125 duration-300"
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
                  class="cursor-pointer w-[250px] mx-auto active:bg-teal-500/50 hover:bg-teal-500/20 truncate p-3 rounded-2xl hover:scale-125 duration-300"
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
