<template>
  <div>
    <vOptionTabVue
      @select="setSelect"
      class="flex"
      class-select=""
      classCustom=""
      :data="optionTab"
    />
    <div>
      <vContentTabVue v-if="idSelect == 2" />
      <vListBlogVue v-if="idSelect == 1" />
      <vEditInfoVue v-if="idSelect == 0" />
    </div>
  </div>
</template>

<script setup>
import vOptionTabVue from "../components/tab/vOptionTab.vue";
import vContentTabVue from "../components/tab/vContentTab.vue";
import vListBlogVue from "../components/vListBlog.vue";
import vEditInfoVue from "../components/vEditInfo.vue";
import { ref } from "vue";
const optionTab = ref([
  { id: 0, text: "vContentTabVue", icon: "fa-solid fa-user-pen" },
  { id: 1, text: "vListBlogVue", icon: "fa-solid fa-user-pen" },
  { id: 2, text: "vEditInfoVue", icon: "fa-solid fa-user-pen" },
]);
const idSelect = ref(0);
function setSelect(id) {
  idSelect.value = id;
  console.log(id);
}
</script>

<style></style>
