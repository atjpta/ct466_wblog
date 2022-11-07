<template>
  <div class="border-2 p-5 rounded-2xl">
    <div>
      <router-link to="/dashboard/profile">
        <div class="tooltip-left tooltip tooltip-primary" :data-tip="data.introduce">
          <img class="bg-black/50 h-40 w-40 rounded-full" :src="data.avatar_Url" />
          <div class="text-center font-semibold text-2xl">{{ data.name }}</div>
        </div>
      </router-link>
      <div class="flex justify-around">
        <div class="tooltip tooltip-info tooltip-bottom" data-tip="số bài viết">
          <i class="fa-solid fa-file-lines"></i>
          {{ data.slBlog }}
        </div>
        <div class="tooltip tooltip-info tooltip-bottom" data-tip="số câu hỏi">
          <i class="fa-solid fa-file-circle-question"></i>

          {{ data.slQuestion }}
        </div>
        <div class="tooltip tooltip-info tooltip-bottom" data-tip="số người theo dõi ">
          <i class="fa-solid fa-users"></i>
          {{ data.followBy.length }}
        </div>
        <div class="tooltip tooltip-info tooltip-bottom" data-tip="số lần trả lời">
          <i class="fa-solid fa-reply"></i>
          {{ data.repAnswer.length }}
        </div>
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
