<template>
  <div>
    <div class="flex space-x-5 justify-center">
      <div
        v-if="isOpen"
        class="top-1/3 z-50 fixed rounded-2xl h-1/4 shadow-lg shadow-blue-500"
      >
        <div>
          <div class="text-center text-2xl p-12">Bạn có chắc chắn muốn xóa?</div>
          <div class="flex justify-evenly">
            <div class="">
              <button
                @click="deleteBlog"
                class="p-5 w-40 cursor-pointer bg-violet-500/20 rounded-2xl uppercase font-semibold text-center truncate hover:text-violet-700 hover:bg-violet-500/30 active:bg-violet-500/50 hover:scale-110 duration-300"
              >
                Có
              </button>
            </div>
            <div class="">
              <button
                @click="cancel"
                class="p-5 w-40 cursor-pointer bg-red-500/20 rounded-2xl uppercase font-semibold text-center truncate hover:text-red-700 hover:bg-red-500/30 active:bg-red-500/50 hover:scale-110 duration-300"
              >
                Không
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- cột 1 -->
      <div class="hidden xl:block">
        <div
          class="mx-auto rounded-2xl my-5 h-fit"
          v-for="blog in data.arr1"
          :key="blog.id"
        >
          <div
            class="w-[400px] mx-auto rounded-2xl px-5 border-2 bg-white dark:bg-gray-700 dark:text-white"
          >
            <div class="flex justify-between">
              <!-- tác giả -->
              <div class="flex pt-5">
                <img
                  class="bg-black h-16 w-16 rounded-full"
                  :src="blog.author.avatar_Url || emptyImage"
                  alt=""
                />
                <div class="text-2xl p-2 mx-3">
                  <button
                    class="hover:scale-110 hover:text-sky-800 active:text-sky-800/50"
                  >
                    <router-link :to="`/user/${blog.author._id}`">
                      {{ blog.author.name }}
                    </router-link>
                  </button>
                  <div class="text-sm">
                    <i>{{ blog.createdAt }}</i>
                  </div>
                </div>
              </div>
              <div v-if="useAuth.user.id == blog.author._id" class="pt-5">
                <div
                  class="bg-white dark:bg-gray-700 dark:text-white static border-2 rounded-2xl flex"
                >
                  <router-link :to="`/editblog/${blog.id}`">
                    <div
                      class="cursor-pointer mx-auto active:bg-teal-500/50 hover:bg-teal-500/20 truncate p-3 rounded-2xl hover:text-teal-800 hover:scale-125 duration-300"
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                  </router-link>
                  <div class="border-r-2"></div>
                  <div
                    @click="isOpen = blog.id"
                    class="cursor-pointer mx-auto active:bg-teal-500/50 hover:bg-teal-500/20 truncate p-3 rounded-2xl hover:text-teal-800 hover:scale-125 duration-300"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="hover:text-violet-500 hover:scale-105 duration-300"
              @click="read(blog.id, blog.voted._id)"
            >
              <!-- ảnh bìa -->
              <div class="pt-3 h-auto flex justify-center">
                <img
                  class="rounded-2xl"
                  :src="blog.cover_image_Url || emptyImage"
                  alt=""
                />
                <!-- <img class="rounded-2xl" src="../../public/imgs/cuoi.gif" alt="" /> -->
              </div>
              <!-- tiêu đề -->
              <div class="text-3xl font-bold uppercase pt-3">
                {{ blog.title }}
              </div>
            </button>
            <!-- hashtag -->
            <div class="flex flex-wrap pt-3">
              <div v-for="Hashtag in blog.hashtag" :key="Hashtag.id || Hashtag._id">
                <div>
                  <button
                    @click="search(Hashtag.id || Hashtag._id)"
                    class="active:bg-violet-700/30 link text-xl text-center hover: hover:scale-125 duration-300"
                  >
                    <i class="m-1 text-xl">#{{ Hashtag.name }}</i>
                  </button>
                </div>
              </div>
            </div>
            <div class="">
              <div class="flex justify-evenly text-xl text-center w-auto py-3">
                <div class="flex">
                  <i class="fa-solid fa-heart pt-1 px-3"></i>
                  <p>{{ blog.voted.tim.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-thumbs-down pt-1 px-3"></i>
                  <p>{{ blog.voted.dislike.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-eye pt-1 px-3"></i>
                  <p>{{ blog.voted.view.length || 0 }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- cột 2 -->
      <div class="hidden xl:block">
        <div
          class="mx-auto rounded-2xl my-5 h-fit"
          v-for="blog in data.arr2"
          :key="blog.id"
        >
          <div
            class="w-[400px] mx-auto rounded-2xl px-5 border-2 bg-white dark:bg-gray-700 dark:text-white"
          >
            <div class="flex justify-between">
              <!-- tác giả -->
              <div class="flex pt-5">
                <img
                  class="bg-black h-16 w-16 rounded-full"
                  :src="blog.author.avatar_Url || emptyImage"
                  alt=""
                />
                <div class="text-2xl p-2 mx-3">
                  <button
                    class="hover:scale-110 hover:text-sky-800 active:text-sky-800/50"
                  >
                    <router-link :to="`/user/${blog.author._id}`">
                      {{ blog.author.name }}
                    </router-link>
                  </button>
                  <div class="text-sm">
                    <i>{{ blog.createdAt }}</i>
                  </div>
                </div>
              </div>
              <div v-if="useAuth.user.id == blog.author._id" class="pt-5">
                <div
                  class="bg-white dark:bg-gray-700 dark:text-white static border-2 rounded-2xl flex"
                >
                  <router-link :to="`/editblog/${blog.id}`">
                    <div
                      class="cursor-pointer mx-auto active:bg-teal-500/50 hover:bg-teal-500/20 truncate p-3 rounded-2xl hover:text-teal-800 hover:scale-125 duration-300"
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                  </router-link>
                  <div class="border-r-2"></div>
                  <div
                    @click="isOpen = blog.id"
                    class="cursor-pointer mx-auto active:bg-teal-500/50 hover:bg-teal-500/20 truncate p-3 rounded-2xl hover:text-teal-800 hover:scale-125 duration-300"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="hover:text-violet-500 hover:scale-105 duration-300"
              @click="read(blog.id, blog.voted._id)"
            >
              <!-- ảnh bìa -->
              <div class="pt-3 h-auto flex justify-center">
                <img
                  class="rounded-2xl"
                  :src="blog.cover_image_Url || emptyImage"
                  alt=""
                />
                <!-- <img class="rounded-2xl" src="../../public/imgs/cuoi.gif" alt="" /> -->
              </div>
              <!-- tiêu đề -->
              <div class="text-3xl font-bold uppercase pt-3">
                {{ blog.title }}
              </div>
            </button>
            <!-- hashtag -->
            <div class="flex flex-wrap pt-3">
              <div v-for="Hashtag in blog.hashtag" :key="Hashtag.id || Hashtag._id">
                <div>
                  <button
                    @click="search(Hashtag.id || Hashtag._id)"
                    class="active:bg-violet-700/30 link text-xl text-center hover: hover:scale-125 duration-300"
                  >
                    <i class="m-1 text-xl">#{{ Hashtag.name }}</i>
                  </button>
                </div>
              </div>
            </div>

            <div class="">
              <div class="flex justify-evenly text-xl text-center w-auto py-3">
                <div class="flex">
                  <i class="fa-solid fa-heart pt-1 px-3"></i>
                  <p>{{ blog.voted.tim.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-thumbs-down pt-1 px-3"></i>
                  <p>{{ blog.voted.dislike.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-eye pt-1 px-3"></i>
                  <p>{{ blog.voted.view.length || 0 }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- cột 3 -->
      <div class="hidden xl:block">
        <div
          class="mx-auto rounded-2xl my-5 h-fit"
          v-for="blog in data.arr3"
          :key="blog.id"
        >
          <div
            class="w-[400px] mx-auto rounded-2xl px-5 border-2 bg-white dark:bg-gray-700 dark:text-white"
          >
            <div class="flex justify-between">
              <!-- tác giả -->
              <div class="flex pt-5">
                <img
                  class="bg-black h-16 w-16 rounded-full"
                  :src="blog.author.avatar_Url || emptyImage"
                  alt=""
                />
                <div class="text-2xl p-2 mx-3">
                  <button
                    class="hover:scale-110 hover:text-sky-800 active:text-sky-800/50"
                  >
                    <router-link :to="`/user/${blog.author._id}`">
                      {{ blog.author.name }}
                    </router-link>
                  </button>
                  <div class="text-sm">
                    <i>{{ blog.createdAt }}</i>
                  </div>
                </div>
              </div>
              <div v-if="useAuth.user.id == blog.author._id" class="pt-5">
                <div
                  class="bg-white dark:bg-gray-700 dark:text-white static border-2 rounded-2xl flex"
                >
                  <router-link :to="`/editblog/${blog.id}`">
                    <div
                      class="cursor-pointer mx-auto active:bg-teal-500/50 hover:bg-teal-500/20 truncate p-3 rounded-2xl hover:text-teal-800 hover:scale-125 duration-300"
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                  </router-link>
                  <div class="border-r-2"></div>
                  <div
                    @click="isOpen = blog.id"
                    class="cursor-pointer mx-auto active:bg-teal-500/50 hover:bg-teal-500/20 truncate p-3 rounded-2xl hover:text-teal-800 hover:scale-125 duration-300"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="hover:text-violet-500 hover:scale-105 duration-300"
              @click="read(blog.id, blog.voted._id)"
            >
              <!-- ảnh bìa -->
              <div class="pt-3 h-auto flex justify-center">
                <img
                  class="rounded-2xl"
                  :src="blog.cover_image_Url || emptyImage"
                  alt=""
                />
                <!-- <img class="rounded-2xl" src="../../public/imgs/cuoi.gif" alt="" /> -->
              </div>
              <!-- tiêu đề -->
              <div class="text-3xl font-bold uppercase pt-3">
                {{ blog.title }}
              </div>
            </button>
            <!-- hashtag -->
            <div class="flex flex-wrap pt-3">
              <div v-for="Hashtag in blog.hashtag" :key="Hashtag.id || Hashtag._id">
                <div>
                  <button
                    @click="search(Hashtag.id || Hashtag._id)"
                    class="active:bg-violet-700/30 link text-xl text-center hover: hover:scale-125 duration-300"
                  >
                    <i class="m-1 text-xl">#{{ Hashtag.name }}</i>
                  </button>
                </div>
              </div>
            </div>

            <div class="">
              <div class="flex justify-evenly text-xl text-center w-auto py-3">
                <div class="flex">
                  <i class="fa-solid fa-heart pt-1 px-3"></i>
                  <p>{{ blog.voted.tim.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-thumbs-down pt-1 px-3"></i>
                  <p>{{ blog.voted.dislike.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-eye pt-1 px-3"></i>
                  <p>{{ blog.voted.view.length || 0 }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- của mobile -->
      <div class="xl:hidden">
        <div
          class="mx-auto rounded-2xl my-5 h-fit"
          v-for="blog in data.ListBlog"
          :key="blog.id"
        >
          <div
            class="w-[400px] mx-auto rounded-2xl px-5 border-2 bg-white dark:bg-gray-700 dark:text-white"
          >
            <div class="flex justify-between">
              <!-- tác giả -->
              <div class="flex pt-5">
                <img
                  class="bg-black h-16 w-16 rounded-full"
                  :src="blog.author.avatar_Url || emptyImage"
                  alt=""
                />
                <div class="text-2xl p-2 mx-3">
                  <button
                    class="hover:scale-110 hover:text-sky-800 active:text-sky-800/50"
                  >
                    <router-link :to="`/user/${blog.author._id}`">
                      {{ blog.author.name }}
                    </router-link>
                  </button>
                  <div class="text-sm">
                    <i>{{ blog.createdAt }}</i>
                  </div>
                </div>
              </div>
              <div v-if="useAuth.user.id == blog.author._id" class="pt-5">
                <div
                  class="bg-white dark:bg-gray-700 dark:text-white static border-2 rounded-2xl flex"
                >
                  <router-link :to="`/editblog/${blog.id}`">
                    <div
                      class="cursor-pointer mx-auto active:bg-teal-500/50 hover:bg-teal-500/20 truncate p-3 rounded-2xl hover:text-teal-800 hover:scale-125 duration-300"
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                  </router-link>
                  <div class="border-r-2"></div>
                  <div
                    @click="isOpen = blog.id"
                    class="cursor-pointer mx-auto active:bg-teal-500/50 hover:bg-teal-500/20 truncate p-3 rounded-2xl hover:text-teal-800 hover:scale-125 duration-300"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="hover:text-violet-500 hover:scale-105 duration-300"
              @click="read(blog.id, blog.voted._id)"
            >
              <!-- ảnh bìa -->
              <div class="pt-3 h-auto flex justify-center">
                <img
                  class="rounded-2xl"
                  :src="blog.cover_image_Url || emptyImage"
                  alt=""
                />
                <!-- <img class="rounded-2xl" src="../../public/imgs/cuoi.gif" alt="" /> -->
              </div>
              <!-- tiêu đề -->
              <div class="text-3xl font-bold uppercase pt-3">
                {{ blog.title }}
              </div>
            </button>
            <!-- hashtag -->
            <div class="flex flex-wrap pt-3">
              <div v-for="Hashtag in blog.hashtag" :key="Hashtag.id || Hashtag._id">
                <div>
                  <button
                    @click="search(Hashtag.id || Hashtag._id)"
                    class="active:bg-violet-700/30 link text-xl text-center hover: hover:scale-125 duration-300"
                  >
                    <i class="m-1 text-xl">#{{ Hashtag.name }}</i>
                  </button>
                </div>
              </div>
            </div>

            <div class="">
              <div class="flex justify-evenly text-xl text-center w-auto py-3">
                <div class="flex">
                  <i class="fa-solid fa-heart pt-1 px-3"></i>
                  <p>{{ blog.voted.tim.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-thumbs-down pt-1 px-3"></i>
                  <p>{{ blog.voted.dislike.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-eye pt-1 px-3"></i>
                  <p>{{ blog.voted.view.length || 0 }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- nút xem thêm -->
    <div>
      <div class="w-[200px] mx-auto m-2">
        <div
          v-show="!loading && endList == 9"
          @click="NextPage()"
          class="hover:scale-125 bg-white dark:bg-gray-700 dark:text-white/50 duration-300 cursor-pointer mx-auto w-[150px] active:bg-violet-500/50 text-center hover:bg-white truncate shadow-violet-500 shadow-md p-3 rounded-2xl hover:text-violet-800"
        >
          Xem thêm
        </div>
        <div v-show="loading && endList == 9" class="flex justify-center">
          <div
            class="bg-white dark:bg-gray-700 dark:text-white/50 cursor-wait mx-auto w-[150px] active:bg-violet-500/50 text-center truncate shadow-violet-500 shadow-md p-3 rounded-2xl"
          >
            <i class="fa-solid fa-spinner animate-spin px-4"></i>
            Xem thêm
          </div>
        </div>
        <div
          v-show="endList < 9"
          class="bg-white dark:bg-gray-700 dark:text-white/50 duration-300 mx-auto w-[150px] text-center truncate shadow-violet-500 shadow-md p-3 rounded-2xl"
        >
          ~~~ Hết ~~~
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, nextTick } from "vue";
import { blogStore } from "../../stores/blog.store";
import emptyImage from "@/assets/upload-image.png";
import { authStore } from "../../stores/auth.store";
import { hashtagStore } from "../../stores/hashtag.store";
import { infoStore } from "../../stores/info.store";

const props = defineProps({
  data: Object,
});
const useInfo = infoStore();
const useAuth = authStore();
const useBlog = blogStore();
const router = useRouter();
const route = useRoute();
const isOpen = ref("");
const useHashtag = hashtagStore();
// const useHashtag = hashtagStore();
const page = ref(0);
const loading = ref(false);
const endList = ref(9);

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

async function NextPage() {
  try {
    page.value++;
    loading.value = true;
    endList.value = await useBlog.getListBlogNextPage(page.value);
  } catch (error) {
    page.value--;
    console.log("lỗi khi load next page");
    console.log(error);
  } finally {
    loading.value = false;
  }
}
async function read(id, id_vote) {
  await useBlog.updatePushVote("view", id_vote);
  const redirectPath = route.query.redirect || {
    path: `/readblog/${id}`,
  };
  router.push(redirectPath);
}

async function search(id) {
  const redirectPath = route.query.redirect || {
    path: `/searchashtag/${id}`,
  };
  // useHashtag.findBlogOnHashtag(id);
  router.push(redirectPath);
}

function edit(id) {
  const redirectPath = route.query.redirect || {
    path: `/editblog/${id}`,
  };
  router.push(redirectPath);
}

async function deleteBlog() {
  await useBlog.deleteBlog(isOpen.value);
  await useBlog.getListBlog();
  isOpen.value = "";
}

function cancel() {
  isOpen.value = "";
}
onMounted(() => {
  // useBlog.getListBlog();
});
</script>

<style></style>
