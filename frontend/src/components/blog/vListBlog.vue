<template>
  <div class="flex space-x-5 justify-center">
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
    <!-- cột 1 -->
    <div class="hidden xl:block">
      <div
        class="mx-auto rounded-2xl my-5 h-fit"
        v-for="blog in data.arr1"
        :key="blog.id"
      >
        <div
          class="w-[400px] mx-auto rounded-2xl px-5 bg-gradient-to-r from-green-400/30 to-blue-500/30 hover:from-pink-500/30 hover:to-yellow-500/30"
        >
          <!-- tác giả -->
          <div class="flex pt-5">
            <img
              class="bg-black h-16 w-16 rounded-full"
              :src="blog.author.avatar_Url || emptyImage"
              alt=""
            />
            <div class="text-2xl p-2 text-blue-900 mx-3">
              <button class="hover:scale-110 hover:text-sky-800 active:text-sky-800/50">
                <router-link :to="`/user/${blog.author._id}`">
                  {{ blog.author.name }}
                </router-link>
              </button>
              <div class="text-sm">
                <i>{{ blog.createdAt }}</i>
              </div>
            </div>
          </div>
          <!-- tóm tắt bài viết -->
          <div class="pt-3 text-xl text-ellipsis overflow-hidden max-h-40">
            {{ blog.summary }}
          </div>
          <!-- hashtag -->
          <div class="flex flex-wrap pt-3">
            <div class="mr-3 text-xl">HashTag:</div>
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
          <button @click="read(blog.id, blog.voted._id)">
            <!-- ảnh bìa -->
            <div class="pt-3 h-auto flex justify-center">
              <img class="rounded-2xl" :src="blog.cover_image_Url || emptyImage" alt="" />
              <!-- <img class="rounded-2xl" src="../../public/imgs/cuoi.gif" alt="" /> -->
            </div>
            <!-- tiêu đề -->
            <div class="text-3xl font-bold uppercase pt-3">
              {{ blog.title }}
            </div>
          </button>
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
          class="w-[400px] mx-auto rounded-2xl px-5 bg-gradient-to-r from-green-400/30 to-blue-500/30 hover:from-pink-500/30 hover:to-yellow-500/30"
        >
          <!-- tác giả -->
          <div class="flex pt-5">
            <img
              class="bg-black h-16 w-16 rounded-full"
              :src="blog.author.avatar_Url || emptyImage"
              alt=""
            />
            <div class="text-2xl p-2 text-blue-900 mx-3">
              <button class="hover:scale-110 hover:text-sky-800 active:text-sky-800/50">
                <router-link :to="`/user/${blog.author._id}`">
                  {{ blog.author.name }}
                </router-link>
              </button>
              <div class="text-sm">
                <i>{{ blog.createdAt }}</i>
              </div>
            </div>
          </div>
          <!-- tóm tắt bài viết -->
          <div class="pt-3 text-xl text-ellipsis overflow-hidden max-h-40">
            {{ blog.summary }}
          </div>
          <!-- hashtag -->
          <div class="flex flex-wrap pt-3">
            <div class="mr-3 text-xl">HashTag:</div>
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
          <button @click="read(blog.id, blog.voted._id)">
            <!-- ảnh bìa -->
            <div class="pt-3 h-auto flex justify-center">
              <img class="rounded-2xl" :src="blog.cover_image_Url || emptyImage" alt="" />
              <!-- <img class="rounded-2xl" src="../../public/imgs/cuoi.gif" alt="" /> -->
            </div>
            <!-- tiêu đề -->
            <div class="text-3xl font-bold uppercase pt-3">
              {{ blog.title }}
            </div>
          </button>

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
          class="w-[400px] mx-auto rounded-2xl px-5 bg-gradient-to-r from-green-400/30 to-blue-500/30 hover:from-pink-500/30 hover:to-yellow-500/30"
        >
          <!-- tác giả -->
          <div class="flex pt-5">
            <img
              class="bg-black h-16 w-16 rounded-full"
              :src="blog.author.avatar_Url || emptyImage"
              alt=""
            />
            <div class="text-2xl p-2 text-blue-900 mx-3">
              <button class="hover:scale-110 hover:text-sky-800 active:text-sky-800/50">
                <router-link :to="`/user/${blog.author._id}`">
                  {{ blog.author.name }}
                </router-link>
              </button>
              <div class="text-sm">
                <i>{{ blog.createdAt }}</i>
              </div>
            </div>
          </div>
          <!-- tóm tắt bài viết -->
          <div class="pt-3 text-xl text-ellipsis overflow-hidden max-h-40">
            {{ blog.summary }}
          </div>
          <!-- hashtag -->
          <div class="flex flex-wrap pt-3">
            <div class="mr-3 text-xl">HashTag:</div>
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
          <button @click="read(blog.id, blog.voted._id)">
            <!-- ảnh bìa -->
            <div class="pt-3 h-auto flex justify-center">
              <img class="rounded-2xl" :src="blog.cover_image_Url || emptyImage" alt="" />
              <!-- <img class="rounded-2xl" src="../../public/imgs/cuoi.gif" alt="" /> -->
            </div>
            <!-- tiêu đề -->
            <div class="text-3xl font-bold uppercase pt-3">
              {{ blog.title }}
            </div>
          </button>

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
          class="w-[400px] mx-auto rounded-2xl px-5 bg-gradient-to-r from-green-400/30 to-blue-500/30 hover:from-pink-500/30 hover:to-yellow-500/30"
        >
          <!-- tác giả -->
          <div class="flex pt-5">
            <img
              class="bg-black h-16 w-16 rounded-full"
              :src="blog.author.avatar_Url || emptyImage"
              alt=""
            />
            <div class="text-2xl p-2 text-blue-900 mx-3">
              <button class="hover:scale-110 hover:text-sky-800 active:text-sky-800/50">
                <router-link :to="`/user/${blog.author._id}`">
                  {{ blog.author.name }}
                </router-link>
              </button>
              <div class="text-sm">
                <i>{{ blog.createdAt }}</i>
              </div>
            </div>
          </div>
          <!-- tóm tắt bài viết -->
          <div class="pt-3 text-xl text-ellipsis overflow-hidden max-h-40">
            {{ blog.summary }}
          </div>
          <!-- hashtag -->
          <div class="flex flex-wrap pt-3">
            <div class="mr-3 text-xl">HashTag:</div>
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
          <button @click="read(blog.id, blog.voted._id)">
            <!-- ảnh bìa -->
            <div class="pt-3 h-auto flex justify-center">
              <img class="rounded-2xl" :src="blog.cover_image_Url || emptyImage" alt="" />
              <!-- <img class="rounded-2xl" src="../../public/imgs/cuoi.gif" alt="" /> -->
            </div>
            <!-- tiêu đề -->
            <div class="text-3xl font-bold uppercase pt-3">
              {{ blog.title }}
            </div>
          </button>

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
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, nextTick } from "vue";
import { blogStore } from "../../stores/blog.store";
import emptyImage from "@/assets/upload-image.png";
import { authStore } from "../../stores/auth.store";
import { hashtagStore } from "../../stores/hashtag.store";
const props = defineProps({
  data: Object,
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
  // useBlog.getListBlog();
});
</script>

<style></style>
