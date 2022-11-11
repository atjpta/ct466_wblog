<template>
  <div class="mt-20">
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-figure">
          <i class="text-violet-500 fa-solid fa-file-lines text-2xl"></i>
        </div>
        <div class="stat-title">Số bài biết</div>
        <div class="stat-value">{{ useInfo.info.slBlog }}</div>
      </div>
      <div class="stat">
        <div class="stat-figure">
          <i class="text-violet-500 fa-solid fa-file-circle-question text-2xl"></i>
        </div>
        <div class="stat-title">Số Câu hỏi</div>
        <div class="stat-value">{{ useInfo.info.slQuestion }}</div>
      </div>

      <div class="stat">
        <div class="stat-figure">
          <i class="text-violet-500 fa-solid fa-users text-2xl"></i>
        </div>
        <div class="stat-title">số người theo dõi</div>
        <div class="stat-value">{{ useInfo.info.followBy.length }}</div>
      </div>

      <div class="stat">
        <div class="stat-figure">
          <i class="text-violet-500 fa-solid fa-reply text-2xl"></i>
        </div>
        <div class="stat-title">Số lần trả lời</div>
        <div class="stat-value">{{ useInfo.info.repAnswer.length }}</div>
      </div>
    </div>

    <div v-if="!open">
      <div
        class="mt-10 indent-10 border-2 rounded-2xl p-5 w-[730px] text-2xl font-medium"
      >
        {{ useInfo.infoEdit.introduce || "chưa có lời giới thiệu" }}
      </div>
      <!-- btn -->
      <div class="text-center">
        <div @click="open = true" class="btn btn-ghost mt-3">
          <i class="fa-solid fa-pen text-primary"></i>
        </div>
      </div>
    </div>

    <div v-if="open" class="mt-10 text-center">
      <textarea
        placeholder="chưa có lời giới thiệu"
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
