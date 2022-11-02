<template>
  <div class="">
    <div>
      <QuillEditor
        :on-update:content="gettagname()"
        v-model:content="data.content"
        ref="quill"
        theme="snow"
        toolbar="full"
      />
    </div>
    <!-- các tag name đã chọn -->
    <div class="flex justify-start">
      <div
        v-for="user in data.tagname"
        :key="user.id"
        class="border-2 w-fit p-2 rounded-md"
      >
        <div>
          {{ user.name }}
          <i
            @click="removeUser(user.id)"
            class="cursor-pointer hover:scale-125 duration-300 fa-solid fa-x"
          ></i>
        </div>
      </div>
    </div>
    <!-- listuser -->
    <div
      v-for="user in listUser"
      :key="user.id"
      class="bg-slate-200 mt-3 dark:text-white dark:bg-gray-800"
    >
      <div
        @click="selectUser(user.id)"
        class="flex hover:bg-teal-500/50 cursor-pointer p-1"
      >
        <img class="rounded-full w-12 h-12" :src="user.avatar_Url" alt="" />

        <div class="p-3">{{ user.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUpdated, ref } from "vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { infoStore } from "../../stores/info.store";

const useInfo = infoStore();
const quill = ref();
const tagName = ref("");

const props = defineProps({
  data: Object,
  reset: Intl,
});

const listUser = computed(() => {
  let list;
  if (tagName.value.length > 0) {
    list = useInfo.alluser.filter((user) => user.name.indexOf(tagName.value) > -1);
  }
  return list;
});

function gettagname() {
  if (quill.value) {
    let text = quill.value.getText();
    let indextagname = text.search("@");
    if (indextagname > -1) {
      tagName.value = text.substring(indextagname + 1, text.length).trim();
    }
  }
}
function removeUser(id) {
  const index = props.data.tagname.findIndex((e) => e.id == id);
  props.data.tagname.splice(index, 1);
}
function checkdouble(id) {
  let check = false;
  props.data.tagname.forEach((e) => {
    if (e.id == id) {
      check = true;
    }
  });
  return check;
}
function selectUser(id) {
  useInfo.alluser.forEach((user) => {
    if (user.id == id) {
      if (!checkdouble(id)) {
        props.data.tagname.push(user);
      }
      props.data.content.ops.forEach((e, i) => {
        let index = e.insert.indexOf("@");
        if (index > -1) {
          props.data.content.ops[i].insert = props.data.content.ops[i].insert.substring(
            0,
            index
          );
          quill.value.setContents(props.data.content.ops);
        }
      });
      tagName.value = "";
    }
  });
}
const isReset = ref(0);
onUpdated(() => {
  if (props.reset > isReset.value) {
    isReset.value = props.reset;
    quill.value.setContents({ ops: [{ insert: "\n" }] });
  }
});

onMounted(() => {
  quill.value.setContents({ ops: [{ insert: "\n" }] });
  useInfo.getAllUsers();
});
</script>

<style></style>
