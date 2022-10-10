<template>
  <div class="bg-white/50 lg:w-3/5 m-auto">
    <div class="text-6xl py-10 text-center">SỬA BÀI VIẾT</div>
    <div class="">
      <div class="mx-auto w-5/6">
        <p class="text-4xl pt-10 pb-5">Nhập tiêu đề bài viết:</p>
        <input
          v-model="useBlog.blogEdit.title"
          class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full"
          type="text"
        />
      </div>

      <div class="mx-auto w-5/6">
        <p class="text-4xl pt-10 pb-5">Nhập tóm tắt nội dung bài viết:</p>
        <input
          v-model="useBlog.blogEdit.summary"
          class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full"
          type="text"
        />
      </div>

      <div class="mx-auto w-5/6">
        <p class="text-4xl pt-10 pb-5">Chọn ảnh bìa bài viết:</p>
        <div class="flex justify-center">
          <img
            class="h-[400px] w-[700px]"
            :src="img || useBlog.blogEdit.cover_image_Url || emptyImage"
            alt=""
          />
        </div>
        <div class="flex justify-center">
          <div
            class="flex justify-center text-xl my-10 p-3 text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-purple-700 hover:scale-125 duration-300"
          >
            <i class="fa-regular fa-image mt-2 mr-3"></i>
            <div class="">
              <input
                class="file:text-black file:bg-white/0 file:border-0 w-24 hover:file:text-purple-700"
                accept="image/*"
                type="file"
                @change="previewFiles($event)"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mx-auto w-5/6">
        <p class="text-4xl pt-10 pb-5">nhập dung bài viết:</p>
        <div class="bg-white/50">
          <QuillEditor
            v-model:content="useBlog.blogEdit.content"
            ref="quill"
            theme="snow"
            toolbar="full"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-end mx-10 text-2xl">
      <div v-show="!loading" class="flex justify-center">
        <button
          @click="updateBlog()"
          class="active:bg-violet-700/30 my-20 p-3 px-5 text-2xl text-center shadow-violet-700 shadow-md rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          cập nhật
        </button>
      </div>

      <div v-show="loading" class="flex justify-center">
        <div
          class="my-20 p-3 px-5 text-2xl text-center shadow-violet-700 shadow-md rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          <i class="fa-solid fa-spinner animate-spin px-4"></i>
          Đang cập nhật
        </div>
      </div>

      <div class="flex justify-center ml-10">
        <button
          @click="cancel()"
          class="my-20 p-3 px-5 text-2xl text-center active:bg-red-700/30 shadow-red-700 shadow-md rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          Hủy
        </button>
      </div>

      <div class=""></div>
    </div>
  </div>
</template>
<script setup>
import { blogStore } from "../stores/blog.store";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import emptyImage from "@/assets/upload-image.png";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import imgageService from "../services/image.service";

const img = ref();
const quill = ref();
const router = useRouter();
const route = useRoute();
const useBlog = blogStore();
const loading = ref(false);

async function updateBlog() {
  try {
    loading.value = true;
    if (useBlog.image.value) {
      await imgageService.uploadImage(useBlog.image);
    }
    const data = {
      id: useBlog.blogEdit.id,
      title: useBlog.blogEdit.title,
      summary: useBlog.blogEdit.summary,
      cover_image_Url: useBlog.blogEdit.cover_image_Url,
      content: useBlog.blogEdit.content,
    };
    const id = data.id;
    await useBlog.updateBlog(id, data);
    const redirectPath = route.query.redirect || {
      path: `/readblog/${id}`,
    };
    router.push(redirectPath);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

function cancel() {
  router.back();
}

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

async function getApi() {
  await useBlog.findOneBlog(route.params.id);
  setContent();
}

const setContent = () => {
  quill.value.setContents(useBlog.blogEdit.content);
};
onMounted(() => {
  getApi();
});
</script>

<style></style>
