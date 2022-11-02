<template>
  <div>
    <div class="bg-base-300 rounded-2xl lg:w-3/5 mt-10 pb-10 mx-auto">
      <div>
        <vBlogVue />
        <!-- danh sách cmt -->
        <div class="w-4/5 mx-auto">
          <!-- input cmt của bài blog -->
          <div>
            <div class="text-4xl py-5">Nhập bình luận</div>
            <vInputCmtVue :reset="resetInput" :data="dataInput" />
            <!-- btn gửi -->
            <div>
              <div v-if="!loading" @click="send()" class="btn btn-outline btn-info my-3">
                <i class="fa-solid fa-paper-plane"></i>
                <div class="p-3">Gửi</div>
              </div>
              <div v-if="loading" class="loading btn btn-outline btn-info my-3">
                <div class="p-3">Gửi</div>
              </div>
            </div>
          </div>
          <!-- cmt blog -->
          <div :key="cmt.id" v-for="cmt in useBlog.blog.comment_Blog">
            <vCommentVue @rep="openInput" :data="cmt" />
            <!-- input rep -->
            <div class="ml-16" v-if="isOpenInput == cmt.id">
              <vInputCmtVue :reset="resetInput" :data="dataInput" />
              <!-- btn gửi -->
              <div>
                <div
                  v-if="!loadingChild"
                  @click="sendchild(cmt.id)"
                  class="btn btn-outline btn-info my-3"
                >
                  <i class="fa-solid fa-paper-plane"></i>
                  <div class="p-3">Gửi</div>
                </div>
                <div v-if="loadingChild" class="loading btn btn-outline btn-info my-3">
                  <div class="p-3">Gửi</div>
                </div>
              </div>
            </div>
            <!-- list cmt child -->
            <div class="ml-16" :key="child.id" v-for="child in cmt.cmt_child">
              <vCommentVue :child="true" @rep="openInput" :data="child" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vBlogVue from "../../components/blog/vBlog.vue";
import vCommentVue from "../../components/Comment/vComment.vue";
import vInputCmtVue from "../../components/Comment/vInputCmt.vue";
import { blogStore } from "../../stores/blog.store";
import { ref } from "vue";
import { infoStore } from "../../stores/info.store";
import { alertStore } from "../../stores/alert.store";

const useBlog = blogStore();
const useInfo = infoStore();
const useAlert = alertStore();
const resetInput = ref(0);
const dataInput = ref({
  content: {},
  tagname: [],
});

const isOpenInput = ref("");

const loading = ref(false);
const loadingChild = ref(false);

function openInput(id) {
  if (isOpenInput.value == id) {
    isOpenInput.value = "";
  } else isOpenInput.value = id;
}

async function send() {
  loading.value = true;
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
    if (
      data.content.ops.length > 1 ||
      typeof data.content.ops[0].insert != "string" ||
      data.content.ops[0].insert.trim() != "" ||
      data.listTagName.length
    ) {
      await useBlog.createComment(data);
      useBlog.findOneBlog(data.id_blog);
      dataInput.value.content = { ops: [{ insert: "\n" }] };
      dataInput.value.tagname = [];
      resetInput.value++;
      useAlert.setSuccess("đã gửi bình luận");
    }
  } catch (error) {
    useAlert.setError("có lỗi");
    console.log("lỗi gửi cmt");
    console.log(error);
  } finally {
    loading.value = false;
  }
}

async function sendchild(id) {
  loadingChild.value = true;
  let list = [];
  dataInput.value.tagname.forEach((e) => {
    list.push(e.id);
  });
  const data = {
    author: useInfo.info.id,
    content: dataInput.value.content,
    listTagName: list,
  };

  try {
    if (
      data.content.ops.length > 1 ||
      typeof data.content.ops[0].insert != "string" ||
      data.content.ops[0].insert.trim() != "" ||
      data.listTagName.length
    ) {
      await useBlog.createCommentChild(data, id);
      useBlog.findOneBlog(useBlog.blog.id);
      dataInput.value.content = { ops: [{ insert: "\n" }] };
      dataInput.value.tagname = [];
      resetInput.value++;
      useAlert.setSuccess("đã gửi phản hồi");
    }
  } catch (error) {
    useAlert.setError("có lỗi");
    console.log("lỗi gửi cmt con");
    console.log(error);
  } finally {
    loadingChild.value = "";
  }
}
</script>

<style></style>
