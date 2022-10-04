<template>
  <div>
    <div v-for="blog in useBlog.ListBlog" :key="blog.id">
      <div class="text-6xl text-center font-bold m-5 uppercase">{{ blog.title }}</div>
      <div class="">
        <div class="flex flex-row w-9/12 mx-auto h-auto shadow-lg">
          <div class="basis-3/4 p-5 bg-white/50">
            <img
              class="h-[400px] w-auto"
              :src="blog.cover_image_Url || emptyImage"
              alt=""
            />
          </div>

          <div class="basis-2/4 py-5 bg-white/50 h-[450px]">
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

            <div class="mt-5 indent-10 h-[200px] text-xl">
              {{ blog.summary }}
            </div>

            <div class="flex justify-center">
              <button
                @click="read(blog.id)"
                class="text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
              >
                xem thêm
              </button>
            </div>
          </div>
          <div class="text-3xl bg-white/50 text-center w-auto pt-10">
            <div class="px-5 py-5">
              <i class="fa-solid fa-heart"></i>
              <p>{{ blog.voted.tim.length || 0 }}</p>
            </div>
            <div class="px-5 py-5">
              <i class="fa-solid fa-thumbs-down"></i>
              <p>{{ blog.voted.dislike.length || 0 }}</p>
            </div>
            <div class="px-5 py-5">
              <i class="fa-solid fa-eye"></i>
              <p>{{ blog.voted.view.length || 0 }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="border-b-4 border-black w-3/5 mx-auto my-5"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { blogStore } from "../stores/blog.store";
import emptyImage from "@/assets/upload-image.png";

const useBlog = blogStore();
const router = useRouter();
const route = useRoute();

function read(id) {
  const redirectPath = route.query.redirect || {
    path: `/readblog/${id}`,
  };
  router.push(redirectPath);
}
onMounted(() => {
  useBlog.getListBlog();
});
</script>

<style></style>
