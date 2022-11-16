<template>
  <div class="mt-20">
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-figure">
          <i class="text-violet-500 fa-solid fa-file-lines text-2xl"></i>
        </div>
        <div class="stat-title">Số bài biết</div>
        <div class="stat-value">{{ data.slBlog }}</div>
      </div>
      <div class="stat">
        <div class="stat-figure">
          <i class="text-violet-500 fa-solid fa-file-circle-question text-2xl"></i>
        </div>
        <div class="stat-title">Số Câu hỏi</div>
        <div class="stat-value">{{ data.slQuestion }}</div>
      </div>

      <div class="stat">
        <div class="stat-figure">
          <i class="text-violet-500 fa-solid fa-users text-2xl"></i>
        </div>
        <div class="stat-title">số người theo dõi</div>
        <div class="stat-value">{{ data.followBy.length }}</div>
      </div>

      <div class="stat">
        <div class="stat-figure">
          <i class="text-violet-500 fa-solid fa-reply text-2xl"></i>
        </div>
        <div class="stat-title">Số lần trả lời</div>
        <div class="stat-value">{{ data.repAnswer.length }}</div>
      </div>
    </div>

    <div>
      <div
        class="mt-10 indent-10 border-2 rounded-2xl p-5 w-[730px] text-2xl font-medium"
      >
        {{ data.introduce || "chưa có lời giới thiệu" }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
});
</script>

<style></style>
