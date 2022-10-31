<template>
  <div class="">
    <div class="">
      <p class="text-4xl pt-10 pb-5">Nhập phản hồi của bạn:</p>
      <div class="">
        <div>
          <QuillEditor
            :on-update:content="gettagname()"
            v-model:content="content"
            ref="quill"
            theme="snow"
            toolbar="full"
          />
        </div>
        <!-- các tag name đã chọn -->
        <div class="flex justify-start">
          <div
            v-for="user in listSelectuser"
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

        <div class="flex">
          <button
            @click="sendCmt()"
            class="cursor-pointer rounded-2xl uppercase font-semibold w-[150px] text-xl text-center truncate hover:bg-violet-500/30 active:bg-violet-500/50 hover:scale-110 duration-300"
          >
            <i class="fa-solid fa-paper-plane py-5"></i>
            gửi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { infoStore } from "../../stores/info.store";
import { blogStore } from "../../stores/blog.store";
const useBlog = blogStore();
const useInfo = infoStore();
const quill = ref();
const tagName = ref("");
const listSelectuser = ref([]);
const content = ref();

const pops = defineProps({
  id: String,
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
  const index = listSelectuser.value.findIndex((e) => e.id == id);
  listSelectuser.value.splice(index, 1);
}
function checkdouble(id) {
  let check = false;
  listSelectuser.value.forEach((e) => {
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
        listSelectuser.value.push(user);
      }
      content.value.ops.forEach((e, i) => {
        let index = e.insert.indexOf("@");
        if (index > -1) {
          content.value.ops[i].insert = content.value.ops[i].insert.substring(0, index);
          quill.value.setContents(content.value.ops);
        }
      });
      tagName.value = "";
    }
  });
}
async function sendCmt() {
  let list = [];
  listSelectuser.value.forEach((e) => {
    list.push(e.id);
  });
  const data = {
    author: useInfo.info.id,
    content: content.value,
    listTagName: list,
  };
  if (data.content || data.listTagName) {
    await useBlog.createCommentChild(data, pops.id);
    useBlog.findOneBlog(useBlog.blog.id);
    content.value.ops = [];
    quill.value.setContents(content.value.ops);
    listSelectuser.value = [];
  }
}

onMounted(() => {
  useInfo.getAllUsers();
});
</script>

<style></style>
