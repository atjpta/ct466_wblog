<template>
  <div class="flex flex-wrap xl:w-[1275px] md:w-[500px] mx-auto justify-evenly space-y-2">
    <div v-for="i in [1, 2, 3]" :key="i">
      <div
        class="bg-gradient-to-r from-green-400/30 to-blue-500/30 hover:from-pink-500/30 hover:to-yellow-500/30 flex xl:block justify-around rounded-2xl h-full w-[400px]"
      >
        <div class="p-3 space-y-2">
          <img src="../../../public/imgs/gem.png" alt="" />

          <div class="text-center text-2xl">100 gem + 10%</div>
          <div class="h-[1px] w-3/5 mx-auto bg-slate-600"></div>
          <div class="text-center text-xl">10.000 VND</div>
        </div>
        <div
          class="active:bg-violet-700/30 hover:text-blue-900 hover:scale-125 duration-300 static rounded-2xl shadow-md shadow-violet-700 text-xl p-3 my-5 w-fit h-fit mx-auto"
        >
          <button>Nạp ngay</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style></style>
