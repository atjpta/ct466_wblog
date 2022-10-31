<template>
  <div>
    <!-- thanh bên trái -->
    <div class="fixed left-64 top-1/3 border-2 p-2 rounded-2xl z-50">
      <router-link :to="`/user/${useBlog.blog.author.id}`">
        <div>
          <img
            class="w-16 h-16 bg-fixed rounded-full"
            :src="useBlog.blog.author.avatar_Url"
            alt=""
          />
        </div>
      </router-link>
      <div v-if="useAuth.user.id != useBlog.blog.author.id">
        <div
          @click="vote('tim', useBlog.blog.voted, useBlog.blog.voted.id)"
          class="hover:bg-violet-500/30 active:bg-violet-500/50 cursor-pointer text-center mt-5"
        >
          <i class="px-2 text-5xl fa-solid fa-caret-up"></i>
        </div>
        <div class="text-xl text-center">{{ rateVote }}</div>
        <div
          @click="vote('dislike', useBlog.blog.voted, useBlog.blog.voted.id)"
          class="hover:bg-violet-500/30 active:bg-violet-500/50 cursor-pointer text-center"
        >
          <i class="px-2 text-5xl fa-solid fa-caret-down"></i>
        </div>

        <div
          class="cursor-pointer text-center mt-3 hover:bg-violet-500/30 active:bg-violet-500/50"
        >
          <i
            @click="followBlog"
            :class="[markBlog > -1 ? 'text-sky-500' : '']"
            class="p-2 text-2xl fa-solid fa-bookmark"
          ></i>
        </div>
      </div>

      <div v-if="useAuth.user.id == useBlog.blog.author.id" class="opacity-30">
        <div class="text-center mt-5">
          <i class="px-2 text-5xl fa-solid fa-caret-up"></i>
        </div>
        <div class="text-xl text-center">{{ rateVote }}</div>
        <div class="text-center">
          <i class="px-2 text-5xl fa-solid fa-caret-down"></i>
        </div>

        <div class="text-center mt-3">
          <i class="p-2 text-2xl fa-solid fa-bookmark"></i>
        </div>
      </div>
    </div>

    <!-- blog -->
    <div class="relative">
      <div
        :style="`background-image: url(${useBlog.blog.cover_image_Url})`"
        class="h-96 bg-cover bg-local"
      ></div>
      <!-- <div>
        <img
          class="bg-fixed rounded-2xl opacity-70"
          :src="useBlog.blog.cover_image_Url"
          alt=""
        />
      </div> -->
      <div class="text-center text-6xl font-bold uppercase mt-5">
        {{ useBlog.blog.title }}
      </div>
      <!-- <div class="h-16 m-auto flex w-11/12">
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
      </div> -->
    </div>

    <div class="my-10 rounded-2xl">
      <QuillEditor ref="quill" :readOnly="true" theme="bubble" :toolbar="[]" />
    </div>

    <!-- hashtag -->
    <div class="mt-10 w-11/12 mx-auto flex flex-wrap">
      <div v-for="Hashtag in useBlog.blog.hashtag" :key="Hashtag.id || Hashtag._id">
        <div>
          <button
            @click="search(Hashtag.id || Hashtag._id)"
            class="badge badge-outline hover: hover:scale-125 duration-300"
          >
            <i class="m-1 text-xl">#{{ Hashtag.name }}</i>
          </button>
        </div>
      </div>
    </div>

    <!-- vote -->
    <div class="lg:text-2xl text-base flex justify-evenly border-b-4 border-black">
      <!-- <button
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
      </button> -->
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
import { ref, onMounted, onBeforeMount, computed } from "vue";
import blogService from "../../services/blog.service";
import { blogStore } from "../../stores/blog.store";
import { authStore } from "../../stores/auth.store";
import { hashtagStore } from "../../stores/hashtag.store";
import { infoStore } from "../../stores/info.store";
const router = useRouter();
const route = useRoute();
const useBlog = blogStore();
const quill = ref();
const useInfo = infoStore();
const useAuth = authStore();
const useHashtag = hashtagStore();

const markBlog = computed(() => {
  return useInfo.info.followBlog.findIndex((e) => e == useBlog.blog.id);
});

const rateVote = computed(() => {
  const rate = useBlog.blog.voted.tim.length - useBlog.blog.voted.dislike.length;
  if (rate > 0) {
    return `+${rate}`;
  }
  return rate;
});

async function followBlog() {
  const index = useInfo.info.followBlog.findIndex((e) => e == useBlog.blog.id);
  if (index > -1) {
    useInfo.info.followBlog.splice(index, 1);
    await useInfo.removeFollowBlog(useBlog.blog.id);
  } else {
    useInfo.info.followBlog.push(useBlog.blog.id);
    await useInfo.addFollowBlog(useBlog.blog.id);
  }
}

function isVote(list) {
  return !!list.find((e) => e == useAuth.user.id);
}

async function vote(type, list, id_list) {
  if (type == "tim") {
    const indexTim = list.tim.findIndex((e) => e == useAuth.user.id);
    const indexDislike = list.dislike.findIndex((e) => e == useAuth.user.id);

    if (indexTim > -1) {
      list.tim.splice(indexTim, 1);
      await useBlog.updatePopVote(type, id_list);
    } else {
      if (indexDislike > -1) {
        list.dislike.splice(indexDislike, 1);
      }
      list.tim.push(useAuth.user.id);
      await useBlog.updatePushVote(type, id_list);
    }
  }

  if (type == "dislike") {
    const indexTim = list.tim.findIndex((e) => e == useAuth.user.id);
    const indexDislike = list.dislike.findIndex((e) => e == useAuth.user.id);

    if (indexDislike > -1) {
      list.dislike.splice(indexDislike, 1);
      useBlog.updatePopVote(type, id_list);
    } else {
      if (indexTim > -1) {
        list.tim.splice(indexTim, 1);
      }
      list.dislike.push(useAuth.user.id);
      useBlog.updatePushVote(type, id_list);
    }
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
  await useInfo.getApiInfo();
  await useInfo.getAllUsers();
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
