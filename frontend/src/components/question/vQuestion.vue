<template>
  <div>
    <!-- thanh bên trái -->
    <div class="fixed left-64 top-1/3 border-2 p-2 rounded-2xl z-50">
      <router-link :to="`/user/${useQuestion.question.author.id}`">
        <div>
          <img
            class="w-16 h-16 bg-fixed rounded-full"
            :src="useQuestion.question.author.avatar_Url"
            alt=""
          />
        </div>
      </router-link>
      <div v-if="useAuth.user.id != useQuestion.question.author.id">
        <div
          @click="vote('tim', useQuestion.question.voted, useQuestion.question.voted.id)"
          class="hover:bg-violet-500/30 active:bg-violet-500/50 cursor-pointer text-center mt-5"
        >
          <i class="px-2 text-5xl fa-solid fa-caret-up"></i>
        </div>
        <div class="text-xl text-center">{{ rateVote }}</div>
        <div
          @click="
            vote('dislike', useQuestion.question.voted, useQuestion.question.voted.id)
          "
          class="hover:bg-violet-500/30 active:bg-violet-500/50 cursor-pointer text-center"
        >
          <i class="px-2 text-5xl fa-solid fa-caret-down"></i>
        </div>
      </div>

      <div v-if="useAuth.user.id == useQuestion.question.author.id" class="opacity-30">
        <div class="text-center mt-5">
          <i class="px-2 text-5xl fa-solid fa-caret-up"></i>
        </div>
        <div class="text-xl text-center">{{ rateVote }}</div>
        <div class="text-center">
          <i class="px-2 text-5xl fa-solid fa-caret-down"></i>
        </div>
      </div>
    </div>
    <!-- question -->
    <div>
      <div class="text-center text-4xl py-5">
        {{ useQuestion.question.title }}
      </div>
      <div class="my-10 rounded-2xl">
        <QuillEditor ref="quill" :readOnly="true" theme="bubble" :toolbar="[]" />
      </div>
    </div>
    <!-- hashtag -->
    <div class="mt-10 w-11/12 mx-auto flex flex-wrap">
      <div
        v-for="Hashtag in useQuestion.question.hashtag"
        :key="Hashtag.id || Hashtag._id"
      >
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { useRouter, useRoute } from "vue-router";
import { questStore } from "../../stores/question.store";
import { hashtagStore } from "../../stores/hashtag.store";
import { authStore } from "../../stores/auth.store";

const router = useRouter();
const route = useRoute();
const useAuth = authStore();
const useQuestion = questStore();
const useHashtag = hashtagStore();
const quill = ref();

const rateVote = computed(() => {
  const rate =
    useQuestion.question.voted.tim.length - useQuestion.question.voted.dislike.length;
  if (rate > 0) {
    return `+${rate}`;
  }
  return rate;
});

async function getApi() {
  await useQuestion.findOneQuestion(route.params.id);
  quill.value.setContents(useQuestion.question.content);
}

onMounted(() => {
  getApi();
});
</script>

<style></style>
