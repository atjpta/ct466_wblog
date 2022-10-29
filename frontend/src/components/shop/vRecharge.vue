<template>
  <div class="flex flex-wrap xl:w-[1275px] md:w-[500px] mx-auto justify-evenly space-y-2">
    <div v-for="i in data" :key="i.id">
      <div
        @click="recharge({ gemId: i.id })"
        class="cursor-pointer bg-gradient-to-r from-green-400/30 to-blue-500/30 hover:from-pink-500/30 hover:to-yellow-500/30 flex xl:block justify-around rounded-2xl lg:h-full h-[160px] w-[400px]"
      >
        <div class="p-3 space-y-2 xl:block flex">
          <img
            class="h-20 w-20 animate-pulse mx-auto"
            src="../../../public/imgs/gem.png"
            alt=""
          />
          <div class="m-auto pt-7">
            <div class="text-center text-2xl">{{ i.value }} gem</div>
            <div class="h-[1px] w-3/5 mx-auto bg-slate-600"></div>
            <div class="text-center text-xl">{{ i.price }} VND</div>
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

const loading = ref(false);

async function recharge(data) {
  try {
    await useShop.recharge(data);
  } catch (error) {
    console.log(error + "lỗi mua premium bên frontend");
  }
}
</script>

<style></style>
