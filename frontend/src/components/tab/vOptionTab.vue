<template>
  <div>
    <div
      @click="selectId(title.id)"
      v-for="title in data"
      :key="title.id"
      :class="[
        idSelect == title.id
          ? classSelect ||
            ' bg-violet-500/80 hover:text-violet-700 hover:scale-100 duration-0 '
          : classCustom,
      ]"
      class="cursor-pointer bg-violet-500/10 rounded-2xl uppercase font-semibold w-[200px] px-10 m-2 py-3 text-lg text-center truncate hover:text-violet-700 hover:bg-violet-500/30 active:bg-violet-500/50 hover:scale-125 duration-300"
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
