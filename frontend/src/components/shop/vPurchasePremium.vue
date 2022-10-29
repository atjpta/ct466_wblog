<template>
  <div class="flex flex-wrap xl:w-[1275px] md:w-[500px] mx-auto justify-evenly space-y-2">
    <!-- <div class="fixed bg-gray-500/80 bg-">grg</div> -->

    <div v-for="i in data" :key="i.id">
      <div
        @click="purchase({ premiumId: i.id })"
        class="cursor-pointer bg-gradient-to-r from-green-400/30 to-blue-500/30 hover:from-pink-500/30 hover:to-yellow-500/30 flex xl:block justify-around rounded-2xl lg:h-full h-[160px] w-[400px]"
      >
        <div class="p-3 space-y-2 xl:block flex">
          <div class="mx-auto text-center">
            <i class="fa-solid fa-crown animate-pulse text-7xl text-yellow-400"></i>
          </div>
          <div class="m-auto pt-7">
            <div class="text-center text-2xl">{{ i.time }} ngày</div>
            <div class="h-[1px] w-3/5 mx-auto bg-slate-600"></div>
            <div class="text-center text-xl">{{ i.price }} gem</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { shopStore } from "../../stores/shop.store";
const useShop = shopStore();
const pops = defineProps({
  data: Array,
});
const open = ref(false);
const loading = ref(false);

async function purchase(data) {
  try {
    await useShop.purchasePremium(data);
  } catch (error) {
    console.log(error + "lỗi mua premium bên frontend");
  }
}
</script>
<style></style>
