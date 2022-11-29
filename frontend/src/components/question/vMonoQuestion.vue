<template>
  <div>
    <div>
      <div class="mx-auto rounded-2xl my-5 h-fit">
        <div
          :class="[data.answer ? 'border-2 border-green-500' : '']"
          class="w-[400px] mx-auto rounded-2xl px-5 bg-base-300"
        >
          <div class="flex justify-between">
            <router-link
              class="hover:text-sky-500 hover:scale-110 duration-500"
              :to="`/user/${data.author._id}`"
            >
              <!-- tác giả -->
              <div class="flex pt-5">
                <img
                  class="bg-black h-16 w-16 rounded-full"
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

            <!-- edit cho tác giả -->
            <div v-if="useAuth.user.id == data.author._id" class="pt-5">
              <div class="bg-base-300 space-x-2 static flex">
                <router-link :to="`/editquestion/${data.id}`">
                  <div href="#delete" class="btn btn-outline btn-info">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </div>
                </router-link>
              </div>
            </div>
            <!-- phần tùy chọn cho người đọc -->
            <div
              v-if="useAuth.user.id != data.author._id"
              class="dropdown dropdown-end z-10"
            >
              <label tabindex="0" class="btn btn-outline btn-info mt-5">
                <i class="fa-solid fa-ellipsis-vertical"> </i>
              </label>
              <ul
                tabindex="0"
                class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>
                    <div @click="openDialogReport()" for="my-modal-report">
                      <i class="fa-solid fa-flag"></i>
                      báo cáo bài viết
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <button
            class="hover:text-violet-500 hover:scale-105 duration-300"
            @click="read(data.id, data.voted._id)"
          >
            <!-- tiêu đề -->
            <div class="text-3xl font-bold uppercase pt-3">
              {{ data.title }}
            </div>
          </button>
          <!-- hashtag -->
          <div class="flex flex-wrap pt-3">
            <div v-for="Hashtag in data.hashtag" :key="Hashtag.id || Hashtag._id">
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

          <div class="">
            <div class="flex justify-evenly text-xl text-center w-auto py-3">
              <div class="flex">
                <i class="mt-2 h-2 text-3xl fa-solid fa-solid fa-sort-up"></i>
                <div class="mx-1">
                  {{
                    data.voted.tim.length - data.voted.dislike.length > 0
                      ? `+${data.voted.tim.length - data.voted.dislike.length}`
                      : data.voted.tim.length - data.voted.dislike.length
                  }}
                </div>
                <i class="mt-4 h-1 text-3xl fa-solid fa-solid fa-sort-up rotate-180"></i>
              </div>
              <div class="flex">
                <i class="fa-solid fa-eye pt-1 px-3"></i>
                <p>{{ data.voted.view || 0 }}</p>
              </div>

              <div>
                <i
                  :class="[
                    data.answer
                      ? 'text-green-500 fa-solid fa-check'
                      : 'fa-solid fa-question',
                  ]"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { authStore } from "../../stores/auth.store";
import { blogStore } from "../../stores/blog.store";
import { useRouter, useRoute } from "vue-router";
import { questStore } from "../../stores/question.store";
import { ref } from "vue";
import { alertStore } from "../../stores/alert.store";
import { reportStore } from "../../stores/report.store";
import { dialogStore } from "../../stores/dialog.store";
const useQuestion = questStore();
const useAlert = alertStore();
const useReport = reportStore();
const router = useRouter();
const route = useRoute();
const useBlog = blogStore();
const useAuth = authStore();
const loading = ref(false);
const useDialog = dialogStore();
const props = defineProps({
  data: Object,
});

const isOpen = ref();

function openDialogReport() {
  useDialog.showDialogInput(
    {
      title: "Thông báo cực căng!",
      content: "Nhập nội dung mà bạn muốn báo cáo bài viết ",
      btn1: "gửi",
      btn2: "thoát",
    },
    report
  );
}
async function report(input) {
  const data = {
    id_user: useAuth.user.id,
    content: input,
    id_question: props.data.id,
  };
  try {
    await useReport.createReport(data);
    useAlert.setSuccess("đã gửi báo cáo thành công");
  } catch (error) {
    console.log(error);
    console.log("lỗi khi gửi report");
    useAlert.setError("có lỗi khi gửi báo cáo");
  }
}

async function read(id, id_vote) {
  await useBlog.updatePushVote("view", id_vote);
  const redirectPath = route.query.redirect || {
    path: `/readquestion/${id}`,
  };
  router.push(redirectPath);
}

async function deleteBlog() {
  await useQuestion.deleteBlog(isOpen.value);
  await useQuestion.getListQuestion();
  isOpen.value = "";
  router.back();
}
</script>

<style></style>
