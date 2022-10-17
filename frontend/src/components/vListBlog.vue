<template>
  <div class="">
    {{ renderKey }}
    <div
      v-if="isOpen"
      class="top-1/3 lg:inset-x-1/4 inset-x-10 fixed rounded-2xl h-1/4 bg-white shadow-lg shadow-blue-500"
    >
      <div>
        <div class="text-center text-2xl py-12">Bạn có chắc chắn muốn xóa?</div>
        <div class="flex justify-evenly">
          <div class="">
            <button
              @click="deleteBlog"
              class="text-xl text-center shadow-red-700 shadow-md p-4 px-10 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
            >
              Có
            </button>
          </div>
          <div class="">
            <button
              @click="cancel"
              class="text-xl text-center shadow-sky-700 shadow-md p-4 px-10 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
            >
              Không
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white/50 lg:w-9/12 mx-auto rounded-2xl mt-20"
      v-for="blog in data"
      :key="blog.id"
    >
      <div class="">
        <div class="xl:flex flex-row h-auto shadow-lg">
          <div class="basis-4/5 p-5 h-auto flex justify-center">
            <img class="" :src="blog.cover_image_Url || emptyImage" alt="" />
          </div>

          <div class="basis-2/4 p-5 h-[500px]">
            <div class="w-72 text-center text-4xl font-bold py-5 uppercase">
              {{ blog.title }}
            </div>
            <div class="h-16 m-auto flex">
              <img
                class="bg-black h-16 w-16 rounded-full"
                :src="blog.author.avatar_Url || emptyImage"
                alt=""
              />
              <div class="text-3xl text-blue-900 mx-3">
                {{ blog.author.name }}
                <div class="text-lg">
                  <i>{{ blog.createdAt }}</i>
                </div>
              </div>
            </div>

            <!-- hashtag -->
            <div class="flex flex-wrap">
              <div class="mx-3 text-xl">HashTag:</div>
              <div v-for="Hashtag in blog.hashtag" :key="Hashtag.id || Hashtag._id">
                <div>
                  <button
                    @click="search(Hashtag.id || Hashtag._id)"
                    class="active:bg-violet-700/30 link text-xl text-center hover:text-blue-900 hover:scale-125 duration-300"
                  >
                    <i class="m-1 text-xl">{{ Hashtag.name }}</i>
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-5 h-32 indent-10 text-xl text-ellipsis overflow-hidden">
              {{ blog.summary }}
            </div>

            <div class="flex justify-evenly">
              <button
                @click="read(blog.id, blog.voted._id)"
                class="truncate active:bg-violet-700/30 text-xl text-center shadow-violet-700 shadow-md p-4 px-6 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
              >
                Xem thêm
              </button>
              <button
                v-if="blog.author._id == useAuth.user.id"
                @click="edit(blog.id)"
                class="active:bg-yellow-700/30 text-xl text-center shadow-yellow-700 shadow-md p-4 px-6 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
              >
                Sửa
              </button>
              <button
                v-if="blog.author._id == useAuth.user.id"
                @click="isOpen = blog.id"
                class="text-xl text-centr active:bg-red-700/30 shadow-red-700 shadow-md p-4 px-6 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
              >
                Xóa
              </button>
            </div>
          </div>
          <div
            class="flex flex-row xl:flex-col justify-evenly text-3xl text-center w-auto"
          >
            <div class="p-5">
              <i class="fa-solid fa-heart"></i>
              <p>{{ blog.voted.tim.length || 0 }}</p>
            </div>
            <div class="p-5">
              <i class="fa-solid fa-thumbs-down"></i>
              <p>{{ blog.voted.dislike.length || 0 }}</p>
            </div>
            <div class="p-5">
              <i class="fa-solid fa-eye"></i>
              <p>{{ blog.voted.view.length || 0 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, nextTick } from "vue";
import { blogStore } from "../stores/blog.store";
import emptyImage from "@/assets/upload-image.png";
import { authStore } from "../stores/auth.store";
import { hashtagStore } from "../stores/hashtag.store";
const props = defineProps({
  data: Array,
});
const useAuth = authStore();
const useBlog = blogStore();
const router = useRouter();
const route = useRoute();
const isOpen = ref("");
const useHashtag = hashtagStore();
// const useHashtag = hashtagStore();
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
  useHashtag.findBlogOnHashtag(id);
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
  useBlog.getListBlog();
});
</script>

<style></style>
