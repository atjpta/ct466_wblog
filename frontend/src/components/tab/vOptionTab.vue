<template>
  <div>
    <div
      @click="selectId(title.id)"
      v-for="title in data"
      :key="title.id"
      :class="[
        idSelect == title.id
          ? classSelect ||
            ' bg-teal-500/50 hover:text-violet-700 hover:scale-100 duration-0 '
          : classCustom,
      ]"
      class="text-xl mx-auto p-4 my-5 text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-purple-700 hover:scale-125 duration-300"
    >
      <!-- <router-link to="#"> -->
      <button>
        <i :class="title.icon"></i>
        {{ title.text }}
      </button>
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["select"]);

const props = defineProps({
  data: Array,
  classCustom: String,
  classSelect: String,
});
const idSelect = ref(0);

function selectId(id) {
  idSelect.value = id;
  emit("select", id);
}
</script>

<style></style>
