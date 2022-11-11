<template>
  <div class="mx-auto">
    <div class="text-5xl font-semibold text-center m-5">Gỏi hàng</div>
    <div @click="removeCart()" class="text-end">
      <div class="btn btn-error btn-outline">
        <i class="fa-solid fa-trash-can"></i>
        <div class="mx-1 mt-1">Xóa tất cả</div>
      </div>
    </div>
    <!-- danh sách giỏ hàng -->
    <div class="flex space-x-5 justify-center">
      <div v-if="summary.count == 0">
        <div class="text-3xl m-5 font-semibold text-center">
          Bạn chưa chọn bất bì bài viết nào
        </div>
      </div>
      <div>
        <div v-for="blog in useCart.data.arr1" :key="blog.id">
          <vMonoCartVue :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in useCart.data.arr2" :key="blog.id">
          <vMonoCartVue :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in useCart.data.arr3" :key="blog.id">
          <vMonoCartVue :data="blog" />
        </div>
      </div>
    </div>
    <!-- tổng kết -->
    <div class="mx-auto">
      <div class="border-2 rounded-2xl flex justify-around">
        <div class="m-5">
          <div class=""><i>tổng số bài viết</i></div>
          <div class="font-bold text-4xl">{{ summary.count }}</div>
        </div>
        <div class="m-5">
          <div class=""><i>tổng số tiền</i></div>
          <div class="font-bold text-4xl">{{ summary.sum }} VND</div>
        </div>
      </div>
    </div>
    <div class="text-center m-5">
      <button @click="buy()" v-if="!loading" class="btn btn-outline btn-primary">
        Thanh toán
      </button>
      <button v-if="loading" class="btn btn-outline btn-primary loading">
        Thanh toán
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "@vue/runtime-core";
import vMonoCartVue from "../../../components/shop/vMonoCart.vue";
import { alertStore } from "../../../stores/alert.store";
import { cartStore } from "../../../stores/cart.store";
import { billStore } from "../../../stores/bill.store";
import { authStore } from "../../../stores/auth.store";
const useAuth = authStore();
const useCart = cartStore();
const useAlert = alertStore();
const useBill = billStore();
const loading = ref(false);
const summary = computed(() => {
  let count = 0;
  let sum = 0;
  if (useCart.cart.id_blog) {
    useCart.cart.id_blog.forEach((e) => {
      sum += e.price;
      count++;
    });
  }
  return {
    count,
    sum,
  };
});

function removeCart() {
  try {
    useCart.deleteCart();
  } catch (error) {
    console.log(error + "lỗi xóa cart");
  }
}

async function buy() {
  if (useCart.cart.id_blog.length > 0) {
    loading.value = true;
    try {
      await useBill.createBill({
        id_user: useAuth.user.id,
        id_blog: useCart.cart.id_blog,
      });
      await useCart.deleteCart();
      await useCart.getListCart();
      useAlert.setSuccess("đã mở khóa thành công");
    } catch (error) {
      useAlert.setError("thanh toán thất bại");
      console.log(error + "thanh toán thất bại");
    } finally {
      loading.value = false;
    }
  }
}
onMounted(() => {
  useCart.getListCart();
});
</script>

<style></style>
