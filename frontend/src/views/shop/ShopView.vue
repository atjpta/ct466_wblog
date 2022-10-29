<template>
  <div class="">
    <div class="text-center text-6xl mb-10">Nạp tiền</div>
    <div class="flex justify-center mt-5">
      <div class="flex text-2xl">
        <div class="mx-5">Hiện có:</div>
        <img class="w-10 h-10 animate-pulse" src="../../../public/imgs/gem.png" alt="" />
      </div>
      <div class="m-1 text-2xl">X{{ useInfo.wallet.gem || 0 }}</div>
    </div>

    <vRecharge :data="useShop.listgem" />
    <div class="text-center text-6xl my-10">Mua premium</div>
    <div class="flex justify-center mt-5">
      <div class="flex">
        <div class="text-2xl mx-5">hiện có:</div>
        <div>
          <i class="fa-solid fa-crown text-4xl animate-pulse text-yellow-400"></i>
        </div>
      </div>
      <div class="m-1 text-2xl">X {{ useInfo.wallet.premium || 0 }} ngày</div>
    </div>
    <vPurchasePremium :data="useShop.listpremium" />
  </div>
</template>

<script setup>
import vRecharge from "../../components/shop/vRecharge.vue";
import vPurchasePremium from "../../components/shop/vPurchasePremium.vue";
import { ref, onMounted, computed } from "vue";
import { shopStore } from "../../stores/shop.store";
import { authStore } from "../../stores/auth.store";
import { infoStore } from "../../stores/info.store";
const useInfo = infoStore();
const useAuth = authStore();
const useShop = shopStore();

onMounted(() => {
  useShop.getListGem();
  useShop.getListPremium();
  useInfo.getWallet();
});
</script>

<style></style>
