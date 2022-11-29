<template>
  <div>
    <div class="">
      <div class="mx-auto rounded-2xl my-5 h-fit">
        <div class="w-[400px] mx-auto rounded-2xl px-5 bg-base-300">
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
                  <div class="btn btn-outline btn-info">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </div>
                </router-link>
                <div @click="openDialogDelete()" class="btn btn-outline btn-error">
                  <i class="fa-solid fa-trash-can"></i>
                </div>
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
                    <div @click="openDialogReport()">
                      <i class="fa-solid fa-flag"></i>
                      báo cáo bài viết
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <button
            :class="[
              isRead
                ? 'hover:text-violet-500 hover:scale-105 duration-300 '
                : 'cursor-default',
            ]"
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

          <!-- vote -->
          <div class="">
            <div class="flex justify-around text-xl text-center w-auto py-3">
              <div class="flex w-20">
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
              <div class="flex w-20">
                <i class="fa-solid fa-eye pt-1 px-3"></i>
                <p>{{ data.voted.view || 0 }}</p>
              </div>
            </div>
          </div>
          <!-- mua -->
          <div
            v-if="useAuth.user.id != data.author._id && data.price > 0 && isBuy == -1"
            class="flex justify-around pb-3"
          >
            <div @click="openDialogBuy()" class="btn btn-outline btn-primary">
              <i class="fa-solid fa-lock-open"></i>
              <div v-if="data.price" class="mx-1 mt-1">{{ data.price }} VND</div>
            </div>

            <div
              v-if="!loadingCart"
              @click="addCart()"
              class="btn btn-primary btn-outline"
            >
              <i class="fa-solid fa-cart-plus"></i>
              <div class="mx-1 mt-1">mở khóa sau</div>
            </div>
            <div v-if="loadingCart" class="btn btn-primary btn-outline loading">
              <i class="fa-solid fa-cart-plus"></i>
              <div class="mx-1 mt-1">mở khóa sau</div>
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
import { computed, onMounted, onUpdated, ref, getCurrentInstance } from "vue";
import { billStore } from "../../stores/bill.store";
import { reportStore } from "../../stores/report.store";
import { dialogStore } from "../../stores/dialog.store";
const router = useRouter();
const useBill = billStore();
const route = useRoute();
const useBlog = blogStore();
const useAuth = authStore();
const useAlert = alertStore();
const useCart = cartStore();
const loading = ref(false);
const loadingCart = ref(false);
const inputReport = ref("");
const useReport = reportStore();
const useDialog = dialogStore();
const props = defineProps({
  data: Object,
});

const isBuy = computed(() => {
  if (props.data.buyer) {
    return props.data.buyer.indexOf(useAuth.user.id);
  }
  return -1;
});
const isRead = computed(() => {
  if (props.data) {
    if (
      useAuth.user.id == props.data.author._id ||
      props.data.price == 0 ||
      isBuy.value != -1
    ) {
      return true;
    }
  }
  return false;
});

function openDialogDelete() {
  useDialog.showDialog(
    {
      title: "Thông báo cực căng!",
      content: "bạn có chắc chắn muốn xóa?",
      btn1: "xóa",
      btn2: "thoát",
    },
    deleteBlog
  );
}

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

function openDialogBuy() {
  useDialog.showDialog(
    {
      title: "Thông báo cực căng!",
      content: "bạn có chắc chắn muốn mở khóa?",
      btn1: "mở",
      btn2: "thoát",
    },
    buy
  );
}

async function report(input) {
  const data = {
    id_user: useAuth.user.id,
    content: input,
    id_blog: props.data.id,
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

async function search(id) {
  const redirectPath = route.query.redirect || {
    path: `/searchashtag/${id}`,
  };
  router.push(redirectPath);
}
async function read(id, id_vote) {
  if (isRead.value) {
    await useBlog.updatePushVote("view", id_vote);
    const redirectPath = route.query.redirect || {
      path: `/readblog/${id}`,
    };
    router.push(redirectPath);
  }
}

async function deleteBlog() {
  await useBlog.deleteBlog(props.data.id);
  await useBlog.getListBlog();
}

async function addCart() {
  loadingCart.value = true;
  try {
    if (useCart.cart.id != "") {
      await useCart.addBlogToCart(useCart.cart.id, { id_blog: props.data.id });
    } else {
      await useCart.createCart({
        id_user: useAuth.user.id,
        id_blog: props.data.id,
      });
      await useCart.getListCart(useAuth.user.id);
    }
    useAlert.setSuccess("Đã thêm thành công");
  } catch (error) {
    useAlert.setError("thêm thất bại");
    console.log(error);
  } finally {
    loadingCart.value = false;
  }
}

async function buy() {
  try {
    await useBill.createBill({
      id_user: useAuth.user.id,
      id_blog: props.data.id,
    });
    await useBlog.getListBlog();
    useAlert.setSuccess("đã mở khóa thành công");
  } catch (error) {
    useAlert.setError("thanh toán thất bại");
    console.log(error + "thanh toán thất bại");
  }
}

onMounted(() => {});
</script>

<style></style>
