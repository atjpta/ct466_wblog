<template>
  <div>
    <div
      class="pb-10 rounded-2xl bg-gradient-to-r from-sky-500/50 via-sky-100/50 to-sky-500/50 w-3/4 mx-auto lg:flex"
    >
      <div class="basis-1/2 flex justify-center">
        <div class="py-10 w-64 mx-auto flex justify-center">
          <div class="">
            <img
              class="bg-black/50 h-64 w-64 rounded-full"
              :src="useInfo.info_user.avatar_Url"
              alt=""
            />
            <div>
              <div
                @click="addFollow(useInfo.info_user.id)"
                v-if="!useInfo.setFollow && !loading"
                class="mt-7 p-3 bg-violet-500/10 cursor-pointer rounded-2xl uppercase font-semibold text-center truncate hover:text-violet-700 hover:bg-violet-500/30 active:bg-violet-500/50 hover:scale-110 duration-300"
              >
                Quan tâm
              </div>

              <div
                v-show="loading"
                class="disabled:bg-gray-400 disabled:cursor-wait mt-7 p-3 bg-violet-500/10 cursor-pointer rounded-2xl uppercase font-semibold text-center truncate hover:text-violet-700 hover:bg-violet-500/30 active:bg-violet-500/50 hover:scale-110 duration-300"
              >
                Quan tâm
              </div>

              <div
                @click="removeFollow(useInfo.info_user.id)"
                v-if="useInfo.setFollow && !loading"
                class="mt-7 p-3 bg-red-500/10 cursor-pointer rounded-2xl uppercase font-semibold text-center truncate hover:text-red-700 hover:bg-red-500/30 active:bg-red-500/50 hover:scale-110 duration-300"
              >
                Hủy Quan tâm
              </div>
            </div>
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
    <div class="text-center text-3xl m-5">
      Các bài viết của {{ useInfo.info_user.name }}
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

const loading = ref(false);

async function addFollow(follow) {
  try {
    loading.value = true;
    await useInfo.addFollow(follow);
    useInfo.setFollow = true;
  } catch (error) {
    useInfo.setFollow = false;
    console.log("lỗi addFollow trong trang profileother");
    console.log(error);
  } finally {
    loading.value = false;
  }
}

async function removeFollow(follow) {
  try {
    loading.value = true;
    await useInfo.removeFollow(follow);
    useInfo.setFollow = false;
  } catch (error) {
    useInfo.setFollow = true;
    console.log("lỗi removeFollow trong trang profileother");
    console.log(error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  useBlog.getBlogUser(route.params.id);
  useInfo.getInfoUser(route.params.id);
});
</script>
<style></style>
