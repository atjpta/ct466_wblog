<template>
  <div>
    <div class="bg-white/50 w-3/5 mx-auto py-10">
      <div class="text-6xl text-center font-bold uppercase mb-10">Tiêu đề bài viết</div>
      <div>
        <div class="h-16 m-auto flex w-4/5">
          <img
            class="bg-black h-16 w-16 rounded-full"
            src="../../public/imgs/avatar.jpg"
            alt=""
          />
          <div class="text-3xl text-blue-900 mx-3">
            admin
            <div class="text-lg">
              <i>thời gian đăng</i>
            </div>
          </div>
        </div>

        <div></div>

        <div class="bg-white/50 mx-auto w-5/6 my-10">
          <QuillEditor
            readOnly="true"
            v-model:content="inputValue"
            theme="bubble"
            :toolbar="[]"
          />
        </div>

        <div
          class="text-2xl border-b-4 border-sky-600 pb-5 text-center w-auto flex justify-around"
        >
          <button
            class="px-5 py-5 items-center justify-center flex shadow-violet-700 shadow-md w-40 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
          >
            <i class="fa-solid fa-heart pt-1"></i>
            <p class="">100</p>
          </button>
          <button
            class="px-5 py-5 items-center justify-center flex shadow-violet-700 shadow-md w-40 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
          >
            <i class="fa-solid fa-thumbs-down pt-1"></i>
            <p class="">100</p>
          </button>
          <div class="px-5 py-5 flex">
            <i class="fa-solid fa-comments pt-1"></i>
            <p>100</p>
          </div>
          <div class="px-5 py-5 flex">
            <i class="fa-solid fa-eye pt-1"></i>
            <div class="">100</div>
          </div>
        </div>

        <vCmtVue />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import vCmtVue from "../components/vCmt.vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
const inputValue = ref([
  {
    insert: "bbertbrethbtrhbrthrtjhuogoegoerngoengonergnegoenge\n",
  },
  {
    attributes: {
      bold: true,
    },
    insert: "hujklhkjlhkl",
  },
  {
    insert: "\n",
  },
  {
    attributes: {
      italic: true,
      bold: true,
    },
    insert: ";o;iu;",
  },
  {
    insert: "\n",
  },
]);
</script>

<style></style>
