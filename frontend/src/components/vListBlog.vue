<template>
  <div class="">
    <div
      v-if="isOpen"
      class="fixed top-1/3 inset-x-1/4 rounded-2xl h-1/4 bg-white shadow-lg shadow-blue-500"
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
      class="bg-white/50 w-9/12 mx-auto rounded-2xl mt-20"
      v-for="blog in useBlog.ListBlog"
      :key="blog.id"
    >
      <div class="">
        <div class="xl:flex flex-row h-auto shadow-lg">
          <div class="basis-4/5 p-5 h-auto flex justify-center">
            <img class="" :src="blog.cover_image_Url || emptyImage" alt="" />
          </div>

          <div class="basis-2/4 p-5 h-[450px]">
            <div class="text-center text-4xl font-bold py-5 uppercase">
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

            <div class="mt-5 h-40 indent-10 text-xl text-ellipsis overflow-hidden">
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
            class="flex flex-row xl:flex-col justify-evenly text-3xl text-center w-auto pt-10"
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
import { ref, onMounted } from "vue";
import { blogStore } from "../stores/blog.store";
import emptyImage from "@/assets/upload-image.png";
import { authStore } from "../stores/auth.store";
const useAuth = authStore();
const useBlog = blogStore();
const router = useRouter();
const route = useRoute();
const isOpen = ref("");
async function read(id, id_vote) {
  await useBlog.updatePushVote("view", id_vote);
  const redirectPath = route.query.redirect || {
    path: `/readblog/${id}`,
  };
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
