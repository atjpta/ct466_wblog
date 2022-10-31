<template>
  <div>
    <!-- input cmt -->
    <div class="w-4/5 mx-auto">
      <vInputCmtVue />
    </div>
    <!-- list cmt -->
    <div v-for="cmt in listcmt" :key="cmt.id" class="">
      <!-- list cmt cha -->
      <div>
        <div class="mt-10 w-5/6 mx-auto bg-base-100 rounded-3xl shadow-xl">
          <router-link
            class="hover:text-sky-500 hover:scale-110 duration-500"
            :to="`/user/${cmt.author._id}`"
          >
            <!-- tác giả -->
            <div class="p-5 h-16 flex">
              <img
                class="bg-black h-16 w-16 rounded-full"
                :src="cmt.author.avatar_Url || emptyImage"
                alt=""
              />
              <div class="text-2xl p-2 mx-3">
                {{ cmt.author.name }}
                <div class="text-sm">
                  <i>{{ cmt.createdAt }}</i>
                </div>
              </div>
            </div>
          </router-link>
          <!-- các tag name -->
          <div class="flex justify-start mt-7 mx-5">
            <div v-for="user in cmt.listTagName" :key="user.id" class="text-sky-500">
              <div class="mx-5 hover:scale-125 duration-300">
                <router-link :to="`/user/${user._id}`" class="">
                  {{ user.name }}
                </router-link>
              </div>
            </div>
          </div>
          <!-- noi dung cmt -->
          <div class="mx-5">
            <QuillEditor
              :content="cmt.content"
              ref="quill"
              :readOnly="true"
              theme="bubble"
              :toolbar="[]"
            />
          </div>
          <!-- voted cua list blog -->
          <div class="flex mx-5">
            <button
              @click="vote('tim', cmt.voted, cmt.voted._id)"
              class="items-center justify-center flex w-1/6 rounded-3xl hover:text-red-500 hover:scale-150 duration-300"
            >
              <i
                :class="[isVote(cmt.voted.tim) ? 'text-red-500' : '']"
                class="fa-solid fa-heart pt"
              ></i>
              <p class="mx-2">{{ cmt.voted.tim.length || 0 }}</p>
            </button>
            <button
              @click="vote('dislike', cmt.voted, cmt.voted._id)"
              class="px-5 py-5 items-center justify-center flex w-1/6 rounded-3xl hover:text-blue-500 hover:scale-150 duration-300"
            >
              <i
                :class="[isVote(cmt.voted.dislike) ? 'text-blue-500' : '']"
                class="fa-solid fa-thumbs-down pt"
              ></i>
              <p class="mx-2">{{ cmt.voted.dislike.length || 0 }}</p>
            </button>

            <button
              @click="open = cmt.id"
              class="px-5 py-5 items-center justify-center flex w-1/6 rounded-3xl hover:text-blue-500 hover:scale-150 duration-300"
            >
              <p class="mx-2">Phản hồi</p>
            </button>
          </div>
        </div>
        <!-- input phản hồi -->
        <div v-if="open == cmt.id" class="mx-auto w-5/6">
          <div class="ml-10 my-3">
            <vInputCmtChildVue :id="cmt.id" />
          </div>
        </div>
        <!-- list cmt con -->
        <div v-for="child in cmt.cmt_child" :key="child.id" class="w-5/6 mx-auto">
          <div class="ml-10 my-3 rounded-3xl shadow-xl bg-base-100">
            <div>
              <router-link
                class="hover:text-sky-500 hover:scale-110 duration-500"
                :to="`/user/${cmt.author._id}`"
              >
                <!-- tác giả -->
                <div class="p-5 h-16 flex">
                  <img
                    class="bg-black h-16 w-16 rounded-full"
                    :src="cmt.author.avatar_Url || emptyImage"
                    alt=""
                  />
                  <div class="text-2xl p-2 mx-3">
                    {{ cmt.author.name }}
                    <div class="text-sm">
                      <i>{{ cmt.createdAt }}</i>
                    </div>
                  </div>
                </div>
              </router-link>
              <!-- các tag name -->
              <div class="flex justify-start mt-7 mx-5">
                <div
                  v-for="user in child.listTagName"
                  :key="user.id"
                  class="text-sky-500"
                >
                  <div class="mx-5 hover:scale-125 duration-300">
                    <router-link :to="`/user/${user._id}`" class="">
                      {{ user.name }}
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- noi dung cmt -->
              <div class="mx-5">
                <QuillEditor
                  :content="child.content"
                  ref="quill"
                  :readOnly="true"
                  theme="bubble"
                  :toolbar="[]"
                />
              </div>
              <!-- voted cua list blog -->
              <div class="flex mx-5">
                <button
                  @click="vote('tim', child.voted, child.voted._id)"
                  class="items-center justify-center flex w-1/6 rounded-3xl hover:text-red-500 hover:scale-150 duration-300"
                >
                  <i
                    :class="[isVote(child.voted.tim) ? 'text-red-500' : '']"
                    class="fa-solid fa-heart pt"
                  ></i>
                  <p class="mx-2">{{ child.voted.tim.length || 0 }}</p>
                </button>
                <button
                  @click="vote('dislike', child.voted, child.voted._id)"
                  class="px-5 py-5 items-center justify-center flex w-1/6 rounded-3xl hover:text-blue-500 hover:scale-150 duration-300"
                >
                  <i
                    :class="[isVote(child.voted.dislike) ? 'text-blue-500' : '']"
                    class="fa-solid fa-thumbs-down pt"
                  ></i>
                  <p class="mx-2">{{ child.voted.dislike.length || 0 }}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vInputCmtVue from "./vInputCmt.vue";
import vInputCmtChildVue from "./vInputCmtChild.vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref, onMounted, computed } from "vue";
import { blogStore } from "../../stores/blog.store";
import { authStore } from "../../stores/auth.store";
import { alertStore } from "../../stores/alert.store";
import { infoStore } from "../../stores/info.store";
import emptyImage from "@/assets/upload-image.png";
const quill = ref();
const useInfo = infoStore();
const useAuth = authStore();
const useBlog = blogStore();
const tagnameOpen = ref(false);
const tagName = ref("");

const comment_BlogChild = ref({
  id_blog: "",
  content: "",
  author: "",
});

const open = ref();

const listcmt = computed(() => {
  return useBlog.blog.comment_Blog;
});

async function createCommentChild(id) {
  console.log(useInfo.alluser);
  if (comment_BlogChild.value.content) {
    try {
      const data = {
        author: useAuth.user.id,
        content: comment_BlogChild.value.content,
      };
      await useBlog.createCommentChild(data, id);
      await useBlog.findOneBlog(useBlog.blog.id);
      comment_BlogChild.value.content = "";
    } catch (error) {
      alertStore().setError("không thể thêm comment");
    } finally {
      open.value = false;
    }
  }
}

function isVote(list) {
  return !!list.find((e) => e == useAuth.user.id);
}

function vote(type, list, id_list) {
  if (type == "tim") {
    const indexTim = list.tim.findIndex((e) => e == useAuth.user.id);
    const indexDislike = list.dislike.findIndex((e) => e == useAuth.user.id);

    if (indexTim > -1) {
      list.tim.splice(indexTim, 1);
      useBlog.updatePopVote(type, id_list);
    } else {
      if (indexDislike > -1) {
        list.dislike.splice(indexDislike, 1);
      }
      list.tim.push(useAuth.user.id);
      useBlog.updatePushVote(type, id_list);
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
</script>

<style></style>
