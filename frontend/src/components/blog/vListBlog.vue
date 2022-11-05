<template>
  <div>
    <div class="flex space-x-5 justify-center">
      <!-- The button to open modal -->

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
      <div
        v-if="isOpen"
        class="top-1/3 z-50 fixed rounded-2xl h-1/4 shadow-lg shadow-blue-500 bg-base-300"
      >
        <div>
          <div class="text-center text-2xl p-12">Bạn có chắc chắn muốn xóa?</div>
          <div class="flex justify-evenly">
            <div class="">
              <button
                @click="deleteBlog"
                class="p-5 w-40 cursor-pointer rounded-2xl uppercase font-semibold text-center truncate hover:text-violet-700 hover:bg-violet-500/30 active:bg-violet-500/50 hover:scale-110 duration-300"
              >
                Có
              </button>
            </div>
            <div class="">
              <button
                @click="cancel"
                class="p-5 w-40 cursor-pointer rounded-2xl uppercase font-semibold text-center truncate hover:text-red-700 hover:bg-red-500/30 active:bg-red-500/50 hover:scale-110 duration-300"
              >
                Không
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- cột 1 -->
      <div class="hidden xl:block">
        <div
          class="mx-auto rounded-2xl my-5 h-fit"
          v-for="blog in data.arr1"
          :key="blog.id"
        >
          <div class="w-[400px] mx-auto rounded-2xl px-5 border-2 bg-base-300">
            <div class="flex justify-between">
              <router-link
                class="hover:text-sky-500 hover:scale-110 duration-500"
                :to="`/user/${blog.author._id}`"
              >
                <!-- tác giả -->
                <div class="flex pt-5">
                  <img
                    class="bg-black h-16 w-16 rounded-full"
                    :src="blog.author.avatar_Url || emptyImage"
                    alt=""
                  />
                  <div class="text-2xl p-2 mx-3">
                    {{ blog.author.name }}
                    <div class="text-sm">
                      <i>{{ blog.createdAt }}</i>
                    </div>
                  </div>
                </div>
              </router-link>

              <!-- edit cho tác giả -->
              <div v-if="useAuth.user.id == blog.author._id" class="pt-5">
                <div class="bg-base-300 space-x-2 static flex">
                  <router-link :to="`/editblog/${blog.id}`">
                    <div href="#delete" class="btn btn-outline btn-info">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                  </router-link>
                  <a href="#delete" class="btn btn-outline btn-error"
                    ><i class="fa-solid fa-trash-can"></i
                  ></a>
                </div>
              </div>
              <!-- phần tùy chọn cho người đọc -->
              <div
                v-if="useAuth.user.id != blog.author._id"
                class="dropdown dropdown-left"
              >
                <label tabindex="0" class="btn btn-outline btn-info mt-5">
                  <i class="fa-solid fa-ellipsis-vertical"> </i>
                </label>
                <ul
                  tabindex="0"
                  class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li><a>Item 1</a></li>
                  <li><a>Item 2</a></li>
                </ul>
              </div>
            </div>

            <button
              class="hover:text-violet-500 hover:scale-105 duration-300"
              @click="read(blog.id, blog.voted._id)"
            >
              <!-- ảnh bìa -->
              <div class="pt-3 h-auto flex justify-center">
                <img
                  class="rounded-2xl"
                  :src="blog.cover_image_Url || emptyImage"
                  alt=""
                />
                <!-- <img class="rounded-2xl" src="../../public/imgs/cuoi.gif" alt="" /> -->
              </div>
              <!-- tiêu đề -->
              <div class="text-3xl font-bold uppercase pt-3">
                {{ blog.title }}
              </div>
            </button>
            <!-- hashtag -->
            <div class="flex flex-wrap pt-3">
              <div v-for="Hashtag in blog.hashtag" :key="Hashtag.id || Hashtag._id">
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
                  <i class="fa-solid fa-heart pt-1 px-3"></i>
                  <p>{{ blog.voted.tim.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-thumbs-down pt-1 px-3"></i>
                  <p>{{ blog.voted.dislike.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-eye pt-1 px-3"></i>
                  <p>{{ blog.voted.view.length || 0 }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- cột 2 -->
      <div class="hidden xl:block">
        <div
          class="mx-auto rounded-2xl my-5 h-fit"
          v-for="blog in data.arr2"
          :key="blog.id"
        >
          <div class="w-[400px] mx-auto rounded-2xl px-5 border-2 bg-base-300">
            <div class="flex justify-between">
              <router-link
                class="hover:text-sky-500 hover:scale-110 duration-500"
                :to="`/user/${blog.author._id}`"
              >
                <!-- tác giả -->
                <div class="flex pt-5">
                  <img
                    class="bg-black h-16 w-16 rounded-full"
                    :src="blog.author.avatar_Url || emptyImage"
                    alt=""
                  />
                  <div class="text-2xl p-2 mx-3">
                    {{ blog.author.name }}
                    <div class="text-sm">
                      <i>{{ blog.createdAt }}</i>
                    </div>
                  </div>
                </div>
              </router-link>

              <!-- edit cho tác giả -->
              <div v-if="useAuth.user.id == blog.author._id" class="pt-5">
                <div class="bg-base-300 space-x-2 static flex">
                  <router-link :to="`/editblog/${blog.id}`">
                    <div href="#delete" class="btn btn-outline btn-info">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                  </router-link>
                  <a href="#delete" class="btn btn-outline btn-error"
                    ><i class="fa-solid fa-trash-can"></i
                  ></a>
                </div>
              </div>
              <!-- phần tùy chọn cho người đọc -->
              <div
                v-if="useAuth.user.id != blog.author._id"
                class="dropdown dropdown-left"
              >
                <label tabindex="0" class="btn btn-outline btn-info mt-5">
                  <i class="fa-solid fa-ellipsis-vertical"> </i>
                </label>
                <ul
                  tabindex="0"
                  class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li><a>Item 1</a></li>
                  <li><a>Item 2</a></li>
                </ul>
              </div>
            </div>

            <button
              class="hover:text-violet-500 hover:scale-105 duration-300"
              @click="read(blog.id, blog.voted._id)"
            >
              <!-- ảnh bìa -->
              <div class="pt-3 h-auto flex justify-center">
                <img
                  class="rounded-2xl"
                  :src="blog.cover_image_Url || emptyImage"
                  alt=""
                />
                <!-- <img class="rounded-2xl" src="../../public/imgs/cuoi.gif" alt="" /> -->
              </div>
              <!-- tiêu đề -->
              <div class="text-3xl font-bold uppercase pt-3">
                {{ blog.title }}
              </div>
            </button>
            <!-- hashtag -->
            <div class="flex flex-wrap pt-3">
              <div v-for="Hashtag in blog.hashtag" :key="Hashtag.id || Hashtag._id">
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
                  <i class="fa-solid fa-heart pt-1 px-3"></i>
                  <p>{{ blog.voted.tim.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-thumbs-down pt-1 px-3"></i>
                  <p>{{ blog.voted.dislike.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-eye pt-1 px-3"></i>
                  <p>{{ blog.voted.view.length || 0 }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- cột 3 -->
      <div class="hidden xl:block">
        <div
          class="mx-auto rounded-2xl my-5 h-fit"
          v-for="blog in data.arr3"
          :key="blog.id"
        >
          <div class="w-[400px] mx-auto rounded-2xl px-5 border-2 bg-base-300">
            <div class="flex justify-between">
              <router-link
                class="hover:text-sky-500 hover:scale-110 duration-500"
                :to="`/user/${blog.author._id}`"
              >
                <!-- tác giả -->
                <div class="flex pt-5">
                  <img
                    class="bg-black h-16 w-16 rounded-full"
                    :src="blog.author.avatar_Url || emptyImage"
                    alt=""
                  />
                  <div class="text-2xl p-2 mx-3">
                    {{ blog.author.name }}
                    <div class="text-sm">
                      <i>{{ blog.createdAt }}</i>
                    </div>
                  </div>
                </div>
              </router-link>

              <!-- edit cho tác giả -->
              <div v-if="useAuth.user.id == blog.author._id" class="pt-5">
                <div class="bg-base-300 space-x-2 static flex">
                  <router-link :to="`/editblog/${blog.id}`">
                    <div href="#delete" class="btn btn-outline btn-info">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                  </router-link>
                  <a href="#delete" class="btn btn-outline btn-error"
                    ><i class="fa-solid fa-trash-can"></i
                  ></a>
                </div>
              </div>
              <!-- phần tùy chọn cho người đọc -->
              <div
                v-if="useAuth.user.id != blog.author._id"
                class="dropdown dropdown-left"
              >
                <label tabindex="0" class="btn btn-outline btn-info mt-5">
                  <i class="fa-solid fa-ellipsis-vertical"> </i>
                </label>
                <ul
                  tabindex="0"
                  class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li><a>Item 1</a></li>
                  <li><a>Item 2</a></li>
                </ul>
              </div>
            </div>

            <button
              class="hover:text-violet-500 hover:scale-105 duration-300"
              @click="read(blog.id, blog.voted._id)"
            >
              <!-- ảnh bìa -->
              <div class="pt-3 h-auto flex justify-center">
                <img
                  class="rounded-2xl"
                  :src="blog.cover_image_Url || emptyImage"
                  alt=""
                />
                <!-- <img class="rounded-2xl" src="../../public/imgs/cuoi.gif" alt="" /> -->
              </div>
              <!-- tiêu đề -->
              <div class="text-3xl font-bold uppercase pt-3">
                {{ blog.title }}
              </div>
            </button>
            <!-- hashtag -->
            <div class="flex flex-wrap pt-3">
              <div v-for="Hashtag in blog.hashtag" :key="Hashtag.id || Hashtag._id">
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
                  <i class="fa-solid fa-heart pt-1 px-3"></i>
                  <p>{{ blog.voted.tim.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-thumbs-down pt-1 px-3"></i>
                  <p>{{ blog.voted.dislike.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-eye pt-1 px-3"></i>
                  <p>{{ blog.voted.view.length || 0 }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- của mobile -->
      <div class="xl:hidden">
        <div
          class="mx-auto rounded-2xl my-5 h-fit"
          v-for="blog in data.ListBlog"
          :key="blog.id"
        >
          <div class="w-[400px] mx-auto rounded-2xl px-5 border-2 bg-base-300">
            <div class="flex justify-between">
              <router-link
                class="hover:text-sky-500 hover:scale-110 duration-500"
                :to="`/user/${blog.author._id}`"
              >
                <!-- tác giả -->
                <div class="flex pt-5">
                  <img
                    class="bg-black h-16 w-16 rounded-full"
                    :src="blog.author.avatar_Url || emptyImage"
                    alt=""
                  />
                  <div class="text-2xl p-2 mx-3">
                    {{ blog.author.name }}
                    <div class="text-sm">
                      <i>{{ blog.createdAt }}</i>
                    </div>
                  </div>
                </div>
              </router-link>

              <!-- edit cho tác giả -->
              <div v-if="useAuth.user.id == blog.author._id" class="pt-5">
                <div class="bg-base-300 space-x-2 static flex">
                  <router-link :to="`/editblog/${blog.id}`">
                    <div href="#delete" class="btn btn-outline btn-info">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                  </router-link>
                  <a href="#delete" class="btn btn-outline btn-error"
                    ><i class="fa-solid fa-trash-can"></i
                  ></a>
                </div>
              </div>
              <!-- phần tùy chọn cho người đọc -->
              <div
                v-if="useAuth.user.id != blog.author._id"
                class="dropdown dropdown-left"
              >
                <label tabindex="0" class="btn btn-outline btn-info mt-5">
                  <i class="fa-solid fa-ellipsis-vertical"> </i>
                </label>
                <ul
                  tabindex="0"
                  class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li><a>Item 1</a></li>
                  <li><a>Item 2</a></li>
                </ul>
              </div>
            </div>

            <button
              class="hover:text-violet-500 hover:scale-105 duration-300"
              @click="read(blog.id, blog.voted._id)"
            >
              <!-- ảnh bìa -->
              <div class="pt-3 h-auto flex justify-center">
                <img
                  class="rounded-2xl"
                  :src="blog.cover_image_Url || emptyImage"
                  alt=""
                />
                <!-- <img class="rounded-2xl" src="../../public/imgs/cuoi.gif" alt="" /> -->
              </div>
              <!-- tiêu đề -->
              <div class="text-3xl font-bold uppercase pt-3">
                {{ blog.title }}
              </div>
            </button>
            <!-- hashtag -->
            <div class="flex flex-wrap pt-3">
              <div v-for="Hashtag in blog.hashtag" :key="Hashtag.id || Hashtag._id">
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
                  <i class="fa-solid fa-heart pt-1 px-3"></i>
                  <p>{{ blog.voted.tim.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-thumbs-down pt-1 px-3"></i>
                  <p>{{ blog.voted.dislike.length || 0 }}</p>
                </div>
                <div class="flex">
                  <i class="fa-solid fa-eye pt-1 px-3"></i>
                  <p>{{ blog.voted.view.length || 0 }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- nút xem thêm -->
    <div>
      <div class="flex justify-center">
        <div
          v-show="!loading && endList == 9"
          @click="NextPage()"
          class="btn btn-outline btn-info"
        >
          Xem thêm
        </div>
        <div v-show="loading && endList == 9" class="flex justify-center">
          <div class="btn loading btn-outline btn-inf">Xem thêm</div>
        </div>
      </div>
      <div
        v-show="endList < 9 || !endList"
        class="bg-base-300/50 duration-300 mx-auto w-[150px] text-center truncate shadow-violet-500 shadow-md p-3 rounded-2xl"
      >
        ~~~ Hết ~~~
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, nextTick } from "vue";
import { blogStore } from "../../stores/blog.store";
import emptyImage from "@/assets/upload-image.png";
import { authStore } from "../../stores/auth.store";
import { hashtagStore } from "../../stores/hashtag.store";
import { infoStore } from "../../stores/info.store";

const props = defineProps({
  data: Object,
});
const useInfo = infoStore();
const useAuth = authStore();
const useBlog = blogStore();
const router = useRouter();
const route = useRoute();
const isOpen = ref("");
const useHashtag = hashtagStore();
// const useHashtag = hashtagStore();
const page = ref(0);
const loading = ref(false);
const endList = ref(9);
const openOptionBlog = ref();
async function addFollow(follow) {
  try {
    loading.value = true;
    await useInfo.addFollow(follow);
    useInfo.setFollow = true;
  } catch (error) {
    useInfo.setFollow = false;
    console.log("lỗi addFollow trong trang profileother");
    console.log(error);
  } finally {
    loading.value = false;
  }
}

async function removeFollow(follow) {
  try {
    loading.value = true;
    await useInfo.removeFollow(follow);
    useInfo.setFollow = false;
  } catch (error) {
    useInfo.setFollow = true;
    console.log("lỗi removeFollow trong trang profileother");
    console.log(error);
  } finally {
    loading.value = false;
  }
}

async function NextPage() {
  try {
    page.value++;
    loading.value = true;
    endList.value = await useBlog.getListBlogNextPage(page.value);
  } catch (error) {
    page.value--;
    console.log("lỗi khi load next page");
    console.log(error);
  } finally {
    loading.value = false;
  }
}
async function read(id, id_vote) {
  await useBlog.updatePushVote("view", id_vote);
  const redirectPath = route.query.redirect || {
    path: `/readblog/${id}`,
  };
  router.push(redirectPath);
}

async function search(id) {
  const redirectPath = route.query.redirect || {
    path: `/searchashtag/${id}`,
  };
  router.push(redirectPath);
}

function edit(id) {
  const redirectPath = route.query.redirect || {
    path: `/editblog/${id}`,
  };
  router.push(redirectPath);
}

async function deleteBlog() {
  await useBlog.deleteBlog(isOpen.value);
  await useBlog.getListBlog();
  isOpen.value = "";
  router.back();
}

function cancel() {
  isOpen.value = "";
}
onMounted(() => {
  // useBlog.getListBlog();
});
</script>

<style></style>
