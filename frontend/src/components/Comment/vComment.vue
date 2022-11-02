<template>
  <div class="">
    <!-- thẻ input -->
    <div class="mt-10 w-5/6 mx-auto">
      <vInputCmtVue :data="dataInput" :reset="resetInput" />
      <div v-if="!openSend" @click="send()" class="btn btn-outline btn-info my-3">
        <i class="fa-solid fa-paper-plane"></i>
        <div class="p-3">Gửi</div>
      </div>
      <div v-if="openSend" class="loading btn btn-outline btn-info my-3">
        <div class="p-3">Gửi</div>
      </div>
    </div>
    <div v-for="cmt in data" :key="cmt.id" class="mt-10 w-5/6 mx-auto">
      <div class="flex">
        <!-- voted cua list cmt -->
        <div class="mt-4 p-2">
          <button
            @click="vote('tim', cmt.voted, cmt.voted._id)"
            class="btn btn-circle btn-outline"
          >
            <i
              :class="[isVote(cmt.voted.tim) ? 'text-blue-500' : '']"
              class="text-3xl fa-solid fa-caret-up"
            ></i>
          </button>
          <div class="text-xl text-center">
            {{
              cmt.voted.tim.length - cmt.voted.dislike.length > 0
                ? `+${cmt.voted.tim.length - cmt.voted.dislike.length}`
                : cmt.voted.tim.length - cmt.voted.dislike.length
            }}
          </div>

          <button
            @click="vote('dislike', cmt.voted, cmt.voted._id)"
            class="btn btn-circle btn-outline"
          >
            <i
              :class="[isVote(cmt.voted.dislike) ? 'text-blue-500' : '']"
              class="text-3xl fa-solid fa-caret-down"
            ></i>
          </button>
        </div>
        <div class="w-full bg-base-100 rounded-3xl shadow-xl">
          <div class="p-3 w-fit">
            <!-- tác giả -->
            <router-link
              class="hover:text-sky-500 hover:scale-110 duration-500"
              :to="`/user/${cmt.author._id}`"
            >
              <div class="py-5 h-16 flex">
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
            <div class="flex justify-start mt-7 mr-5">
              <div v-for="user in cmt.listTagName" :key="user.id" class="text-sky-500">
                <div class="badge badge-primar">
                  <router-link :to="`/user/${user._id}`" class="">
                    {{ user.name }}
                  </router-link>
                </div>
              </div>
            </div>
            <!-- noi dung cmt -->
            <div
              v-if="cmt.content.ops[0].insert != '\n'"
              class="mr-5"
              :class="[cmt.content.ops.length < 2 ? 'h-12' : '']"
            >
              <QuillEditor
                :content="cmt.content"
                ref="quill"
                :readOnly="true"
                theme="bubble"
                :toolbar="[]"
              />
            </div>
          </div>
          <!-- voted cua list blog -->
          <button
            @click="open = cmt.id"
            class="mx-3 mb-5 btn btn-outline btn-primary btn-sm"
          >
            <p class="">Phản hồi</p>
          </button>
        </div>
      </div>
      <!-- input phản hồi -->
      <div v-if="open == cmt.id" class="ml-6">
        <div class="ml-10 my-3">
          <vInputCmtVue :data="dataInputChild" :reset="resetInputChild" />
          <div
            v-if="openSendChild != cmt.id"
            @click="sendchild(cmt.id)"
            class="btn btn-outline btn-info my-3"
          >
            <i class="fa-solid fa-paper-plane"></i>
            <div class="p-3">Gửi</div>
          </div>
          <div
            v-if="openSendChild == cmt.id"
            class="loading btn btn-outline btn-info my-3"
          >
            <div class="p-3">Gửi</div>
          </div>
        </div>
      </div>
      <!-- cmt con -->
      <div v-for="child in cmt.cmt_child" :key="child.id" class="ml-16">
        <div class="flex my-2">
          <!-- voted cua list cmt -->
          <div class="mt-4 p-2">
            <button
              @click="vote('tim', child.voted, child.voted._id)"
              class="btn btn-circle btn-outline"
            >
              <i
                :class="[isVote(child.voted.tim) ? 'text-blue-500' : '']"
                class="text-3xl fa-solid fa-caret-up"
              ></i>
            </button>
            <div class="text-xl text-center">
              {{
                child.voted.tim.length - child.voted.dislike.length > 0
                  ? `+${child.voted.tim.length - child.voted.dislike.length}`
                  : child.voted.tim.length - child.voted.dislike.length
              }}
            </div>

            <button
              @click="vote('dislike', child.voted, child.voted._id)"
              class="btn btn-circle btn-outline"
            >
              <i
                :class="[isVote(child.voted.dislike) ? 'text-blue-500' : '']"
                class="text-3xl fa-solid fa-caret-down"
              ></i>
            </button>
          </div>
          <div class="w-full bg-base-100 rounded-3xl shadow-xl">
            <div class="p-3 w-fit">
              <!-- tác giả -->
              <router-link
                class="hover:text-sky-500 hover:scale-110 duration-500"
                :to="`/user/${child.author._id}`"
              >
                <div class="py-5 h-16 flex">
                  <img
                    class="bg-black h-16 w-16 rounded-full"
                    :src="child.author.avatar_Url || emptyImage"
                    alt=""
                  />
                  <div class="text-2xl p-2 mx-3">
                    {{ child.author.name }}
                    <div class="text-sm">
                      <i>{{ child.createdAt }}</i>
                    </div>
                  </div>
                </div>
              </router-link>
              <!-- các tag name -->
              <div class="flex justify-start mt-7 mr-5">
                <div
                  v-for="user in child.listTagName"
                  :key="user.id"
                  class="text-sky-500"
                >
                  <div class="badge badge-primar">
                    <router-link :to="`/user/${user._id}`" class="">
                      {{ user.name }}
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- noi dung cmt -->
              <div
                v-if="child.content.ops[0].insert != '\n'"
                class="mr-5"
                :class="[child.content.ops.length < 2 ? 'h-12' : '']"
              >
                <QuillEditor
                  :content="child.content"
                  ref="quill"
                  :readOnly="true"
                  theme="bubble"
                  :toolbar="[]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { authStore } from "../../stores/auth.store";
import { blogStore } from "../../stores/blog.store";
import vInputCmtVue from "./vInputCmt.vue";
import { infoStore } from "../../stores/info.store";
import { alertStore } from "../../stores/alert.store";

const useAlert = alertStore();
const useInfo = infoStore();
const useBlog = blogStore();
const useAuth = authStore();
const pops = defineProps({
  data: Object,
});
const resetInput = ref();
const resetInputChild = ref();
const open = ref("");
const openSend = ref(false);
const openSendChild = ref("");

const dataInput = ref({
  content: {},
  tagname: [],
});

const dataInputChild = ref({
  content: {},
  tagname: [],
});

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

async function send() {
  openSend.value = true;
  let list = [];
  dataInput.value.tagname.forEach((e) => {
    list.push(e.id);
  });
  const data = {
    author: useInfo.info.id,
    id_blog: useBlog.blog.id,
    content: dataInput.value.content,
    listTagName: list,
  };
  try {
    if (data.content.ops[0].insert.length > 1 || data.listTagName.length > 0) {
      await useBlog.createComment(data);
      useBlog.findOneBlog(data.id_blog);
      dataInput.value.content = { ops: [{ insert: "\n" }] };
      dataInput.value.tagname = [];
      resetInput.value = true;
      useAlert.setSuccess("đã gửi bình luận");
    }
  } catch (error) {
    useAlert.setError("có lỗi");
    console.log("lỗi gửi cmt");
    console.log(error);
  } finally {
    openSend.value = false;
  }
}

async function sendchild(id) {
  openSendChild.value = id;
  let list = [];
  dataInputChild.value.tagname.forEach((e) => {
    list.push(e.id);
  });
  const data = {
    author: useInfo.info.id,
    content: dataInputChild.value.content,
    listTagName: list,
  };

  try {
    if (data.content.ops[0].insert.length > 1 || data.listTagName) {
      await useBlog.createCommentChild(data, id);
      useBlog.findOneBlog(useBlog.blog.id);
      dataInputChild.value.content = { ops: [{ insert: "\n" }] };
      dataInputChild.value.tagname = [];
      resetInputChild.value = true;
      useAlert.setSuccess("đã gửi phản hồi");
    }
  } catch (error) {
    useAlert.setError("có lỗi");
    console.log("lỗi gửi cmt con");
    console.log(error);
  } finally {
    openSendChild.value = "";
  }
}
</script>

<style></style>
