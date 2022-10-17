<template>
  <div class="">
    <div class="">
      <!-- tiêu đề bài viết  -->
      <div class="mx-auto w-5/6">
        <p class="text-4xl pt-10 pb-5">Nhập tiêu đề bài viết:</p>
        <input
          v-model="useBlog.blogEdit.title"
          class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full"
          type="text"
        />
      </div>
      <!-- tóm tắt bài viết  -->
      <div class="mx-auto w-5/6">
        <p class="text-4xl pt-10 pb-5">Nhập tóm tắt nội dung bài viết:</p>
        <input
          v-model="useBlog.blogEdit.summary"
          class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full"
          type="text"
        />
      </div>
      <!-- ảnh bìa bài viết -->
      <div class="mx-auto w-5/6">
        <p class="text-4xl pt-10 pb-5">Chọn ảnh bìa bài viết:</p>
        <div class="flex justify-center">
          <img
            class=""
            :src="useImage.previewImage || useBlog.blogEdit.cover_image_Url"
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
                @change="useImage.previewFiles($event)"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- noi dung bài viết -->
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
      <!-- hashtag -->
      <div class="mt-10 mx-auto w-5/6">
        <vhashtag />
      </div>
      <!-- premium -->
      <div class="mt-10 mx-auto w-5/6 text-4xl">
        <div class="mt-10 text-4xl">Mức giá bài viết</div>
        <select
          v-model="useBlog.blogEdit.premium"
          class="mt-10 text-2xl rounded-2xl bg-white/5 shadow-violet-700 shadow-md hover:text-purple-700 hover:scale-125 duration-300"
        >
          <option value="false">Miễn phí</option>
          <option value="true">Có thu phí</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import vhashtag from "./vEditHashtag.vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { useRouter, useRoute } from "vue-router";
import { imageStore } from "../../stores/image.store";
import { blogStore } from "../../stores/blog.store";
import { hashtagStore } from "../../stores/hashtag.store";

const useBlog = blogStore();
const props = defineProps({
  blog: Object,
});

const router = useRouter();
const route = useRoute();
const quill = ref();
const select = ref();
const useHashtag = hashtagStore();

const useImage = imageStore();

async function getApi() {
  await useBlog.findOneBlog(route.params.id);
  setContent();
}
const setContent = () => {
  quill.value.setContents(useBlog.blogEdit.content);
};
onMounted(() => {
  if (props.blog.edit) {
    getApi();
    useHashtag.newHashtag = [];
    useHashtag.listAddHashtagToBlog = [];
  }
});
</script>

<style></style>
