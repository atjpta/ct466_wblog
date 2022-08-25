
<template>
    <div class="flex justify-center mt-10 ">
        <div class="mx-3">
            <input
            type="text"
            class="rounded-lg p-2 shadow-md w-72"
            placeholder="nhập tên cần tìm"
            v-model="Store.keyFind"
            @input="Store.find"
            @keyup.enter="submit"
            />
        </div>

        <div class="">
            <button class="bg-teal-500 rounded-lg p-2 shadow-md hover:scale-125 duration-300" type="button" @click="submit">
                <i class="fas fa-search"></i> Tim kiếm
            </button>
        </div>
    </div>
</template>



<script setup>
import { authStore } from "@/stores/auth.store";

const Store = authStore();

</script>
