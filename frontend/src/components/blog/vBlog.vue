<template>
  <div>
    <!-- blog -->
    <div class="">
      <div class="text-6xl text-center font-bold uppercase mb-10">
        {{ useBlog.blog.title }}
      </div>
      <div class="h-16 m-auto flex w-4/5">
        <img
          class="bg-black h-16 w-16 rounded-full"
          :src="useBlog.blog.author.avatar_Url || emptyImage"
          alt=""
        />
        <div class="text-3xl text-blue-900 mx-3">
          <button>
            <router-link :to="`/user/${useBlog.blog.author._id}`">
              {{ useBlog.blog.author.name }}
            </router-link>
          </button>
          <div class="text-lg">
            <i>{{ useBlog.blog.time }}</i>
          </div>
        </div>
      </div>
    </div>

    <!-- hashtag -->
    <div class="mt-10 w-4/5 mx-auto flex flex-wrap">
      <div class="mx-3 text-xl">HashTag:</div>
      <div v-for="Hashtag in useBlog.blog.hashtag" :key="Hashtag.id || Hashtag._id">
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
    <div class="bg-white/50 mx-auto w-5/6 my-10">
      <QuillEditor ref="quill" :readOnly="true" theme="bubble" :toolbar="[]" />
    </div>

    <!-- vote -->
    <div class="lg:text-2xl text-base flex justify-around border-b-4 border-black">
      <button
        @click="vote('tim', useBlog.blog.voted.tim, useBlog.blog.voted.id)"
        class="p-3 items-center justify-center flex h-16 hover:text-red-500 hover:scale-150 duration-300"
      >
        <i
          :class="[isVote(useBlog.blog.voted.tim) ? 'text-red-500' : '']"
          class="fa-solid fa-heart"
        ></i>
        <p class="mx-2">{{ useBlog.blog.voted.tim.length || 0 }}</p>
      </button>
      <button
        @click="vote('dislike', useBlog.blog.voted.dislike, useBlog.blog.voted.id)"
        class="p-3 items-center justify-center flex h-16 hover:text-blue-500 hover:scale-150 duration-300"
      >
        <i
          :class="[isVote(useBlog.blog.voted.dislike) ? 'text-blue-500' : '']"
          class="fa-solid fa-thumbs-down pt-1"
        ></i>
        <p class="mx-2">{{ useBlog.blog.voted.dislike.length || 0 }}</p>
      </button>
      <div class="p-3 flex items-center justify-center">
        <i class="fa-solid fa-comments pt-1"></i>
        <p class="mx-2">{{ useBlog.blog.comment_Blog.length || 0 }}</p>
      </div>
      <div class="p-3 flex items-center justify-center">
        <i class="fa-solid fa-eye pt-1"></i>
        <div class="mx-2">
          {{ useBlog.blog.voted.view.length || 0 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import emptyImage from "@/assets/upload-image.png";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, onBeforeMount } from "vue";
import blogService from "../../services/blog.service";
import { blogStore } from "../../stores/blog.store";
import { authStore } from "../../stores/auth.store";
import { hashtagStore } from "../../stores/hashtag.store";

const router = useRouter();
const route = useRoute();
const useBlog = blogStore();
const quill = ref();
const useAuth = authStore();
const useHashtag = hashtagStore();
function isVote(list) {
  return !!list.find((e) => e == useAuth.user.id);
}

function vote(type, list, id_list) {
  const index = list.findIndex((e) => e == useAuth.user.id);
  if (index > -1) {
    list.splice(index, 1);
    useBlog.updatePopVote(type, id_list);
  } else {
    list.push(useAuth.user.id);
    useBlog.updatePushVote(type, id_list);
  }
}
function search(id) {
  console.log(id);
  const redirectPath = route.query.redirect || {
    path: `/searchashtag/${id}`,
  };
  router.push(redirectPath);
}
async function getApi() {
  await useBlog.findOneBlog(route.params.id);
  setContent();
}

const setContent = () => {
  quill.value.setContents(useBlog.blog.content);
};
onMounted(() => {
  getApi();
});
</script>

<style></style>
