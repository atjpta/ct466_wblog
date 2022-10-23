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
            <div v-show="loading" class="flex justify-center mt-5">
              <div
                class="cursor-wait mx-auto w-[150px] active:bg-violet-500/50 text-center truncate shadow-violet-500 shadow-md p-3 rounded-2xl"
              >
                <i class="fa-solid fa-spinner animate-spin px-4"></i>
                Đang xử lý
              </div>
            </div>
            <div
              v-if="!useInfo.setFollow && !loading"
              class="mx-auto flex justify-center mt-5"
            >
              <button
                @click="addFollow(useInfo.info_user.id)"
                class="hover:scale-125 duration-300 cursor-pointer mx-auto w-[150px] active:bg-violet-500/50 text-center hover:bg-violet-500/30 truncate shadow-violet-500 shadow-md p-3 rounded-2xl hover:text-violet-800"
              >
                Theo dõi
              </button>
            </div>
            <div
              v-if="useInfo.setFollow && !loading"
              class="mx-auto flex justify-center mt-5"
            >
              <button
                @click="removeFollow(useInfo.info_user.id)"
                class="hover:scale-125 duration-300 cursor-pointer mx-auto w-[150px] active:bg-violet-500/50 text-center hover:bg-violet-500/30 truncate shadow-violet-500 shadow-md p-3 rounded-2xl hover:text-violet-800"
              >
                Hủy theo dõi
              </button>
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
