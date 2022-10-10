<template>
  <div class="">
    <div class="my-10 ml-10">
      <p class="text-4xl mt-5">Tên:</p>
      <div class="mt-2">
        <input
          v-model="useInfo.infoEdit.name"
          class="text-blue-600 text-3xl w-11/12 font-bold bg-slate-50/5 border-b-2 border-black"
        />
      </div>
      <p class="text-4xl mt-5">ngày sinh:</p>
      <div class="mt-5 w-1/3 lg:w-1/2">
        <vue-tailwind-datepicker
          as-single
          :formatter="formatter"
          v-model="useInfo.infoEdit.date"
          :placeholder="useInfo.infoEdit.date || 'chưa thêm ngày sinh'"
        />
      </div>

      <div class="mt-10">
        <p class="text-3xl">Giới thiệu:</p>
        <textarea
          v-model="useInfo.infoEdit.introduce"
          class="mt-3 text-xl h-[200px] w-11/12 bg-slate-50/5 border-black border-opacity-0"
        ></textarea>
        <div class="w-11/12 border-b-2 border-black"></div>
      </div>
      <!-- btn  -->
      <div class="flex justify-evenly text-2xl">
        <div v-show="!loading" class="m-10 flex justify-center">
          <button
            @click="update()"
            class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 px-6 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
          >
            Lưu
          </button>
        </div>

        <div v-show="loading" class="m-10 flex justify-center">
          <div
            class="active:bg-violet-700/30 truncate text-base flex justify-center shadow-violet-700 shadow-md p-4 px-6 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
          >
            <i class="fa-solid fa-spinner animate-spin px-4"></i>
            Lưu
          </div>
        </div>

        <div class="m-10 flex justify-center">
          <button
            @click="cancel()"
            class="active:bg-red-500/30 truncate text-base flex justify-center shadow-red-500 shadow-md p-4 px-6 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { infoStore } from "../stores/info.store";
import { alertStore } from "@/stores/alert.store";

import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const useInfo = infoStore();
const useAlertStore = alertStore();

const formatter = ref({
  date: "DD/MM/YYYY",
  Month: "MM",
});

const loading = ref(false);

async function update() {
  try {
    loading.value = true;
    await useInfo.updateInfo();
    const redirectPath = route.query.redirect || {
      name: "profile",
    };
    router.push(redirectPath);
  } catch (error) {
    console.log(error);
    useAlertStore.setError(error.messge);
  }
}

function cancel() {
  useInfo.infoEdit = useInfo.info;
  loading.value = false;
  const redirectPath = route.query.redirect || {
    name: "profile",
  };
  router.push(redirectPath);
}
onMounted(() => {
  useInfo.getApiInfo();
});
</script>

<style></style>
