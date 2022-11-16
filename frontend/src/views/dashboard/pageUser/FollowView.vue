<template>
  <div class="mt-5 mx-auto">
    <div class="text-4xl font-semibold text-center">Danh sách theo dõi</div>
    <div class="flex w-[650px] flex-wrap justify-center">
      <div class="m-5 w-52" v-for="user in useSearch.ListUser" :key="user.id">
        <vcardUserVue :data="user"></vcardUserVue>
      </div>
    </div>
  </div>
</template>

<script setup>
import vcardUserVue from "@/components/pageUser/vCardUser.vue";
import { searchStore } from "../../../stores/search.store";
import { ref, onMounted } from "vue";
const useSearch = searchStore();

onMounted(() => {
  useSearch.getListUser();
});
</script>

<style></style>
