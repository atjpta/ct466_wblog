<template>
  <div class="">
    <div class="mt-10 w-5/6 mx-auto"></div>
    <div class="flex">
      <!-- voted cua list data -->
      <div class="p-2">
        <button
          @click="vote('tim', data.voted, data.voted._id)"
          class="btn btn-circle btn-outline"
        >
          <i
            :class="[isVote(data.voted.tim) ? 'text-blue-500' : '']"
            class="text-3xl fa-solid fa-caret-up"
          ></i>
        </button>
        <div class="text-xl text-center">
          {{
            data.voted.tim.length - data.voted.dislike.length > 0
              ? `+${data.voted.tim.length - data.voted.dislike.length}`
              : data.voted.tim.length - data.voted.dislike.length
          }}
        </div>

        <button
          @click="vote('dislike', data.voted, data.voted._id)"
          class="btn btn-circle btn-outline"
        >
          <i
            :class="[isVote(data.voted.dislike) ? 'text-blue-500' : '']"
            class="text-3xl fa-solid fa-caret-down"
          ></i>
        </button>
        <div></div>
        <button
          v-if="type != 'child' && type != 'answer'"
          @click="$emit('rep', data.id)"
          class="mt-2 btn btn-circle btn-outline"
        >
          <i class="text-2xl fa-solid fa-reply"></i>
        </button>
      </div>
      <div class="w-full bg-base-100 rounded-3xl shadow-xl">
        <div class="p-3 w-full">
          <div class="flex justify-between">
            <div class="">
              <!-- tác giả -->
              <router-link
                class="hover:text-sky-500 hover:scale-110 duration-500"
                :to="`/user/${data.author._id}`"
              >
                <div class="py-5 h-16 flex">
                  <img
                    class="h-16 w-16 rounded-full"
                    :src="data.author.avatar_Url"
                    alt=""
                  />
                  <div class="text-2xl p-2 mx-3">
                    {{ data.author.name }}
                    <div class="text-sm">
                      <i>{{ data.createdAt }}</i>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
            <!--tùy chọn làm cau tra loi -->
            <!-- chọn làm câu trả lời  -->
            <div
              v-if="!answer"
              @click="
                $emit('selectAnswer', data.id ? data.id : data._id, data.author._id)
              "
              class="btn btn-success btn-outline"
            >
              <i class="fa-solid fa-circle-check mx-1 text-xl"></i>
              chọn làm đáp án
            </div>
            <!-- xóa câu trả lời  -->
            <div
              v-if="answer && type == 'answer'"
              @click="$emit('selectAnswer', data.id, data.author._id)"
              class="btn btn-error btn-outline"
            >
              <i class="fa-solid fa-trash-can mx-1 text-xl"></i>
              xóa đáp án
            </div>
          </div>
          <!-- các tag name -->
          <div class="flex justify-start mt-7 mr-5">
            <div v-for="user in data.listTagName" :key="user.id" class="text-sky-500">
              <div class="badge badge-primar">
                <router-link :to="`/user/${user._id}`" class="">
                  {{ user.name }}
                </router-link>
              </div>
            </div>
          </div>
          <!-- noi dung data -->
          <div
            v-if="data.content.ops[0].insert != '\n'"
            class="mr-5"
            :class="[data.content.ops.length < 2 ? 'h-12' : '']"
          >
            <QuillEditor
              :content="data.content"
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
</template>

<script setup>
import { ref, computed } from "vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { authStore } from "../../stores/auth.store";
import { blogStore } from "../../stores/blog.store";
import { infoStore } from "../../stores/info.store";
import { alertStore } from "../../stores/alert.store";

const useAlert = alertStore();
const useInfo = infoStore();
const useBlog = blogStore();
const useAuth = authStore();
const pops = defineProps({
  data: Object,
  type: String,
  answer: Boolean,
});
const open = ref("");
const openSend = ref(false);
const openSendChild = ref("");

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
