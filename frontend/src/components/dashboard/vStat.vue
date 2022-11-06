<template>
  <div class="mt-20">
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div class="stat-title">Downloads</div>
        <div class="stat-value">31K</div>
        <div class="stat-desc">Jan 1st - Feb 1st</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            ></path>
          </svg>
        </div>
        <div class="stat-title">New Users</div>
        <div class="stat-value">4,200</div>
        <div class="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            ></path>
          </svg>
        </div>
        <div class="stat-title">New Registers</div>
        <div class="stat-value">1,200</div>
        <div class="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>

    <div v-if="!open">
      <div class="mt-10 indent-10 border-2 rounded-2xl p-5 max-w-xl">
        {{ useInfo.infoEdit.introduce }}
      </div>
      <!-- btn -->
      <div class="text-center">
        <div @click="open = true" class="btn btn-primary btn-outline mt-3">
          <i class="fa-solid text-2xl fa-pen"></i>
        </div>
      </div>
    </div>

    <div v-if="open" class="mt-10 text-center">
      <textarea
        v-model="useInfo.infoEdit.introduce"
        class="mt-3 w-full text-xl bg-slate-50/5 border-black border-opacity-0"
      ></textarea>
      <div class="border-b-2 border-black"></div>
      <!-- btn -->
      <div class="flex justify-around mt-3">
        <div @click="update()" class="btn btn-primary btn-outline" v-if="!loading">
          Lưu
        </div>
        <div v-else>
          <div class="btn btn-primary btn-outline loading">Lưu</div>
        </div>
        <div @click="open = false" class="btn btn-error btn-outline">Hủy</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { infoStore } from "../../stores/info.store";
import { ref } from "vue";
import { alertStore } from "../../stores/alert.store";
const userAlert = alertStore();
const useInfo = infoStore();
const open = ref(false);
const loading = ref(false);

async function update() {
  try {
    loading.value = true;
    await useInfo.updateInfo();
    userAlert.setSuccess("Sửa giới thiệu thành công");
  } catch (error) {
    console.log(error);
    userAlert.setError(error.messge);
  } finally {
    loading.value = false;
    open.value = false;
  }
}
</script>

<style></style>
