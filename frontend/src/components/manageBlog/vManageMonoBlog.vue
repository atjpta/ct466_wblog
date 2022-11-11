<template>
  <div>
    <!-- Put this part before </body> tag -->
    <div class="modal" id="delete">
      <div class="modal-box">
        <h3 class="py-4 font-bold text-lg text-center">bạn có chắc muốn xóa?</h3>
        <div class="flex justify-evenly">
          <div class="modal-action">
            <button @click="deleteBlog()" class="btn w-20 btn-outline btn-error">
              có
            </button>
          </div>
          <a href="#" class="modal-action">
            <button class="btn w-20 btn-outline btn-info">không</button>
          </a>
        </div>
      </div>
    </div>
    <div class="">
      <div class="mx-auto rounded-2xl my-5 h-fit">
        <div class="w-[400px] mx-auto rounded-2xl px-5 border-2 bg-base-300">
          <div class="flex justify-between">
            <router-link
              class="hover:text-sky-500 hover:scale-110 duration-500"
              :to="`/user/${data.author._id}`"
            >
              <!-- tác giả -->
              <div class="flex pt-5">
                <div class="avatar">
                  <div class="w-16 h-16 rounded-full">
                    <img :src="data.author.avatar_Url" />
                  </div>
                </div>
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
                <router-link :to="`/editblog/${data.id}`">
                  <div href="#delete" class="btn btn-outline btn-info">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </div>
                </router-link>
                <a href="#delete" class="btn btn-outline btn-error"
                  ><i class="fa-solid fa-trash-can"></i
                ></a>
              </div>
            </div>
          </div>

          <button
            class="hover:text-violet-500 hover:scale-105 duration-300"
            @click="read(data.id, data.voted._id)"
          >
            <!-- ảnh bìa -->
            <div class="pt-3 h-auto flex justify-center">
              <img class="rounded-2xl" :src="data.cover_image_Url" alt="" />
              <!-- <img class="rounded-2xl" src="../../public/imgs/cuoi.gif" alt="" /> -->
            </div>
            <!-- tiêu đề -->
            <div class="text-3xl font-bold uppercase pt-3">
              {{ data.title }}
            </div>
          </button>
          <!-- hashtag -->
          <div class="flex flex-wrap pt-3">
            <div v-for="Hashtag in data.hashtag" :key="Hashtag.id || Hashtag._id">
              <button
                @click="search(Hashtag.id || Hashtag._id)"
                class="badge badge-outline hover: hover:scale-125 duration-300"
              >
                <i class="m-1 text-xl">#{{ Hashtag.name }}</i>
              </button>
            </div>
          </div>

          <div class="text-center">
            <div class="badge badge-primary badge-outline">
              Đơn giá: {{ data.price || "free" }}
            </div>
          </div>

          <!-- vote -->
          <div class="">
            <div class="flex justify-around text-xl text-center w-auto py-3">
              <div
                class="flex w-20 tooltip-left tooltip tooltip-primary"
                data-tip="điểm bài viết"
              >
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
              <div
                class="flex w-20 tooltip-left tooltip tooltip-primary"
                data-tip="lượt xem"
              >
                <i class="fa-solid fa-eye pt-1 px-3"></i>
                <p>{{ data.voted.view || 0 }}</p>
              </div>
              <div
                class="flex w-20 tooltip-left tooltip tooltip-primary"
                data-tip="số người mở khóa"
              >
                <i class="fa-solid fa-users-rectangle pt-1 px-3"></i>
                <p>{{ data.buyer.length || 0 }}</p>
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
import { alertStore } from "../../stores/alert.store";
import { cartStore } from "../../stores/cart.store";
import { ref } from "vue";
import { billStore } from "../../stores/bill.store";
const router = useRouter();
const useBill = billStore();
const route = useRoute();
const useBlog = blogStore();
const useAuth = authStore();
const useAlert = alertStore();
const useCart = cartStore();
const loading = ref(false);
const props = defineProps({
  data: Object,
});
async function search(id) {
  const redirectPath = route.query.redirect || {
    path: `/searchashtag/${id}`,
  };
  router.push(redirectPath);
}
async function read(id, id_vote) {
  await useBlog.updatePushVote("view", id_vote);
  const redirectPath = route.query.redirect || {
    path: `/readblog/${id}`,
  };
  router.push(redirectPath);
}

async function deleteBlog() {
  await useBlog.deleteBlog(props.data.id);
  await useBlog.getListBlog();
  router.back();
}
</script>

<style></style>
