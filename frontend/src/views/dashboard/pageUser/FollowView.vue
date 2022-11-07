<template>
  <div class="mt-5 mx-auto">
    <div class="form-control">
      <div class="input-group">
        <input type="text" placeholder="Search…" class="input input-bordered" />
        <button class="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="m-5 w-52" v-for="user in useSearch.ListUser" :key="user.id">
      <vcardUserVue :data="user"></vcardUserVue>
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
