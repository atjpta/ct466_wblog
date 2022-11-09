<template>
  <div class="mx-auto m-5">
    <div class="font-bold text-4xl text-center m-5">Danh sách các đơn hàng đã mua</div>
    <div class="even:bg-base-300" v-for="bill in useBill.ListBill" :key="bill.id">
      <vMonoBillVue :data="bill" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import vMonoBillVue from "../../../components/shop/vMonoBill.vue";
import { billStore } from "../../../stores/bill.store";
const useBill = billStore();
onMounted(() => {
  useBill.getListBill();
});
</script>

<style></style>
