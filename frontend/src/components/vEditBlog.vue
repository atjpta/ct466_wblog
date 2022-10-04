<template>
  <div class="">
    <div class="mx-auto w-5/6">
      <p class="text-4xl pt-10 pb-5">Nhập tiêu đề bài viết:</p>
      <input
        v-model="useBlog.blogEdit.title"
        class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-5/6"
        type="text"
      />
    </div>

    <div class="mx-auto w-5/6">
      <p class="text-4xl pt-10 pb-5">Nhập tóm tắt nội dung bài viết:</p>
      <input
        v-model="useBlog.blogEdit.summary"
        class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-5/6"
        type="text"
      />
    </div>

    <div class="mx-auto w-5/6">
      <p class="text-4xl pt-10 pb-5">Chọn ảnh bìa bài viết:</p>
      <div class="flex">
        <img
          class="h-[400px] w-[700px]"
          :src="img || useBlog.blogEdit.cover_image_Url || emptyImage"
          alt=""
        />
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
        <QuillEditor
          v-model:content="useBlog.blogEdit.content"
          theme="snow"
          toolbar="full"
        />
      </div>
    </div>
    {{ useBlog.blogEdit.content }}

    <div class="mt-10 mx-auto w-5/6 text-4xl">
      <select
        v-model="useBlog.blogEdit.premium"
        class="text-4xl w-1/4 rounded-2xl bg-white/5 shadow-violet-700 shadow-md h-16 hover:text-purple-700 hover:scale-125 duration-300"
      >
        <option value="false">Miễn phí</option>
        <option value="true">Có thu phí</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import emptyImage from "@/assets/upload-image.png";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { ref, onMounted } from "vue";
import { blogStore } from "../stores/blog.store";
import imgageService from "../services/image.service";

const img = ref();
const useBlog = blogStore();

function previewFiles(event) {
  const file = event.target.files[0];
  useBlog.blogEdit.cover_image_Url = "http://localhost:8088/api/image/" + file.name;
  const theReader = new FileReader();
  theReader.onloadend = async () => {
    img.value = await theReader.result;
  };
  theReader.readAsDataURL(file);
  useBlog.image = new FormData();
  useBlog.image.append("image", file);
}

onMounted(() => {});
</script>

<style></style>
