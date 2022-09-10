<template>
  <div class="">
    <div class="">
      <QuillEditor v-model:content="inputValue" theme="snow" toolbar="full" />
      {{ inputValue }}
    </div>
    <div class="flex justify-center">
      <button @click="test" class="bg-blue-300 h-10 w-20 rounded-3xl">submit</button>
    </div>

    <button @click="testadmin">test</button>
  </div>
</template>

<script setup>
import { QuillEditor, Delta } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { ref, onMounted } from "vue";
import { authStore } from "@/stores/auth.store";

const usestore = authStore();

const modules = ref();
const inputValue = ref("");
function test() {
  console.log("dgbh" + inputValue.value);
}

onMounted(() => {
  console.log(QuillEditor);
  console.log(modules);
  usestore.testadminn();
});
</script>

<style></style>
