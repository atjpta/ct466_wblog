<template>
  <div>
    <p class="text-4xl mt-5">Tên:</p>
    <div class="mt-2">
      <input v-model="useInfo.info.name" class="text-blue-600 text-3xl font-bold" />
    </div>
    <p class="text-4xl mt-5">ngày sinh:</p>
    <div class="mt-5">
      <vue-tailwind-datepicker
        as-single
        :formatter="formatter"
        v-model="useInfo.info.date"
        :placeholder="useInfo.info.date || 'chưa thêm ngày sinh'"
        class="w-36"
      />
    </div>

    <div class="mt-10">
      <p class="text-3xl">Giới thiệu:</p>
      <textarea
        v-model="useInfo.info.introduce"
        cols="100"
        class="mt-3 text-xl"
      ></textarea>
    </div>

    <div class="flex justify-end m-10 mt-32 text-2xl">
      <div v-show="!useAlertStore.loading" class="flex justify-center pt-10">
        <button
          @click="update()"
          class="my-20 p-3 text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          Lưu
        </button>
      </div>

      <div v-show="useAlertStore.loading" class="flex justify-center pt-10">
        <div
          class="my-20 p-3 text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          <i class="fa-solid fa-spinner animate-spin px-4"></i>
          Lưu
        </div>
      </div>

      <div class="flex justify-center pt-10 ml-10">
        <button
          @click="cancel()"
          class="my-20 p-3 text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          Hủy
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { infoStore } from "../stores/info.store";
import { alertStore } from "../stores/alert.store";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const useInfo = infoStore();
const useAlertStore = alertStore();
const formatter = ref({
  date: "DD/MM/YYYY",
  Month: "MM",
});

async function update() {
  try {
    useAlertStore.loading = true;
    await useInfo.updateInfo();
    const redirectPath = route.query.redirect || {
      name: "profile",
    };
    router.push(redirectPath);
  } catch (error) {}
}

function cancel() {
  useInfo.getInfo();
  useAlertStore.loading = false;
  const redirectPath = route.query.redirect || {
    name: "profile",
  };
  router.push(redirectPath);
}
</script>

<style></style>
