<template>
  <div class="">
    <div class="text-6xl mb-10 text-center">TẠO BÀI VIẾT</div>
    <div class="bg-white/50 w-3/5 m-auto">
      <div class="mx-auto w-5/6">
        <p class="text-4xl pt-10 pb-5">Nhập tiêu đề bài viết:</p>
        <input
          v-model="blog.title"
          class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-5/6"
          type="text"
        />
      </div>

      <div class="mx-auto w-5/6">
        <p class="text-4xl pt-10 pb-5">Nhập tóm tắt nội dung bài viết:</p>
        <input
          v-model="blog.summary"
          class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-5/6"
          type="text"
        />
      </div>

      <div class="mx-auto w-5/6">
        <p class="text-4xl pt-10 pb-5">Chọn ảnh bìa bài viết:</p>
        <div class="flex">
          <img class="h-[400px] w-[700px]" :src="blog.cover_image || emptyImage" alt="" />
        </div>
        <div
          class="flex justify-center text-xl my-10 p-3 text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-purple-700 hover:scale-125 duration-300"
        >
          <i class="fa-regular fa-image mt-2 mr-3"></i>
          <div>
            <input
              class="file:text-black file:bg-white/0 file:border-0 w-24 hover:file:text-purple-700"
              accept="image/*"
              type="file"
              @change="previewFiles($event)"
            />
          </div>
        </div>
      </div>

      <div class="mx-auto w-5/6">
        <p class="text-4xl pt-10 pb-5">nhập dung bài viết:</p>
        <div class="bg-white/50">
          <QuillEditor v-model:content="blog.content" theme="snow" toolbar="full" />
        </div>
      </div>

      <div class="mt-10 mx-auto w-5/6 text-4xl">
        <select
          class="text-4xl w-1/4 rounded-2xl bg-white/5 shadow-violet-700 shadow-md h-16 hover:text-purple-700 hover:scale-125 duration-300"
        >
          <option>Miễn phí</option>
          <option>Có thu phí</option>
        </select>
      </div>

      <div class="flex justify-end mx-10 text-2xl">
        <div v-show="true" class="flex justify-center">
          <button
            @click="test()"
            class="my-20 p-3 text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
          >
            Tạo
          </button>
        </div>

        <div v-show="true" class="flex justify-center">
          <div
            class="my-20 p-3 text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
          >
            <i class="fa-solid fa-spinner animate-spin px-4"></i>
            Đang tạo
          </div>
        </div>

        <div class="flex justify-center ml-10">
          <button
            @click="cancel()"
            class="my-20 p-3 text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
          >
            Hủy
          </button>
        </div>

        <div class=""></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { ref, onMounted } from "vue";
import emptyImage from "@/assets/upload-image.png";

const blog = ref({
  title: "",
  summary: "",
  content: "",
  cover_image: "",
  cmt: {},
  status: "",
  deleted: "",
});

function test() {
  console.log(blog.value);
}

function previewFiles(event) {
  const file = event.target.files[0];
  const theReader = new FileReader();
  theReader.onloadend = async () => {
    blog.value.cover_image = await theReader.result;
  };
  theReader.readAsDataURL(file);
}

onMounted(() => {});
</script>

<style></style>
