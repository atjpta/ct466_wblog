<template>
  <div>
    <div
      class="pb-10 rounded-2xl bg-gradient-to-r from-sky-500/50 via-sky-100/50 to-sky-500/50 w-3/4 mx-auto lg:flex"
    >
      <div class="basis-1/2 flex justify-center">
        <div>
          <div class="py-10 w-64 mx-auto flex justify-center">
            <img
              class="bg-black/50 h-64 w-64 rounded-full"
              :src="useInfo.info_user.avatar_Url"
              alt=""
            />
          </div>
          <div v-if="!follow" class="mx-auto flex justify-center">
            <button
              @click="follow = !follow"
              class="truncate active:bg-violet-700/30 text-xl text-center shadow-violet-700 shadow-md p-4 px-6 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
            >
              Theo dõi
            </button>
          </div>
          <div v-if="follow" class="mx-auto flex justify-center">
            <button
              @click="follow = !follow"
              class="truncate active:bg-red-700/30 text-xl text-center shadow-red-700 shadow-md p-4 px-6 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
            >
              Hủy theo dõi
            </button>
          </div>
        </div>
      </div>
      <div class="basis-1/2 flex justify-center">
        <div>
          <div class="mt-20 text-center px-5">
            <p class="text-blue-600 text-3xl font-bold">
              {{ useInfo.info_user.name }}
            </p>
            <i class="text-gray-600">{{
              useInfo.info_user.date || "chưa thêm ngày sinh"
            }}</i>
          </div>

          <div class="mt-10 bg-cover">
            <div class="p-10 bg-white/30 lg:max-w-lg max-w-xs rounded-2xl">
              {{ useInfo.info_user.introduce || "chưa có lời giới thiệu" }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <vListBlogVue :data="useBlog.data" class="pb-20" />
  </div>
</template>

<script setup>
import vListBlogVue from "../../components/blog/vListBlog.vue";
import vAvatarVue from "@/components/vAvatar.vue";
import VInfo from "@/components/vInfo.vue";
import { onMounted, ref } from "vue";
import { infoStore } from "../../stores/info.store";
import VEditInfo from "../../components/vEditInfo.vue";
import { useRoute } from "vue-router";
import { blogStore } from "../../stores/blog.store";

const useInfo = infoStore();
const useBlog = blogStore();
const route = useRoute();

const follow = ref(false);

onMounted(() => {
  useBlog.getBlogUser(route.params.id);
  useInfo.getInfoUser(route.params.id);
});
</script>
<style></style>
