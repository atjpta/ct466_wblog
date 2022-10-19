<template>
  <div>
    <div>
      <div class="mt-10 text-4xl">Các hashtag đã chọn</div>
      <div class="mt-10 flex flex-wrap">
        <div v-for="(sHashtag, index) in useHashtag.selectedHashtag" :key="sHashtag.id">
          <div class="shadow-violet-700 m-3 shadow-md flex content-center">
            <div class="p-3 text-2xl">{{ sHashtag.name }}</div>
            <div>
              <button
                @click="removeHashtag(index)"
                class="active:bg-violet-700/30 p-3 px-5 text-2xl text-center hover:text-blue-900 hover:scale-125 duration-300"
              >
                <i class="fa-solid fa-x"></i>
              </button>
            </div>
          </div>
        </div>
        <div v-for="(sHashtag, index) in useHashtag.newHashtag" :key="sHashtag.id">
          <div class="shadow-yellow-300 m-3 shadow-md flex content-center">
            <div class="p-3 text-2xl">{{ sHashtag.name }}</div>
            <div>
              <button
                @click="removeNewHashtag(index)"
                class="active:bg-yellow-300/30 p-3 px-5 text-2xl text-center hover:text-blue-900 hover:scale-125 duration-300"
              >
                <i class="fa-solid fa-x"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 text-4xl">Thêm hashtag mới</div>
    <div class="mt-10">
      <input
        v-model="inputHashtag"
        class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full"
        type="text"
      />
      <div class="">
        <button
          @click="addNewHashtag()"
          class="active:bg-violet-700/30 p-3 px-5 text-2xl text-center shadow-violet-700 shadow-md rounded-full hover:text-blue-900 hover:scale-125 duration-300"
        >
          Thêm
        </button>
      </div>
    </div>
    <div class="mt-10 text-4xl">Thêm hashtag đã có</div>
    <div class="mt-10">
      <input
        v-model="keyFind"
        class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full"
        type="text"
      />
      <div class="overflow-y-auto h-52 text-2xl w-full">
        <div v-for="hashtag in listHashtag" :key="hashtag.id" class="">
          <button
            @click="addHashtag(hashtag.id, hashtag.name)"
            class="w-full active:bg-violet-700/30 hover:bg-violet-700/70 text-left p-3 px-10 hover:text-blue-900 duration-300"
          >
            {{ hashtag.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { hashtagStore } from "../../stores/hashtag.store";

const keyFind = ref("");
const useHashtag = hashtagStore();
const inputHashtag = ref();

const listHashtag = computed(() => {
  let list;
  if (keyFind.value.length > 0) {
    list = useHashtag.listHashtag.filter(
      (hashtag) => hashtag.name.indexOf(keyFind.value) > -1
    );
  } else list = useHashtag.listHashtag;

  return list;
});

function addHashtag(id, name) {
  let add = true;
  useHashtag.selectedHashtag.forEach((e) => {
    if (e.name == name) {
      add = false;
    }
  });
  useHashtag.newHashtag.forEach((e) => {
    if (e.name == name) {
      add = false;
    }
  });
  if (add == true) {
    useHashtag.selectedHashtag.push({
      id: id,
      name: name,
    });
  }
}

function addNewHashtag() {
  let add = true;
  useHashtag.selectedHashtag.forEach((e) => {
    if (e.name == inputHashtag.value) {
      add = false;
    }
  });
  useHashtag.newHashtag.forEach((e) => {
    if (e.name == inputHashtag.value) {
      add = false;
    }
  });
  if (add == true) {
    useHashtag.newHashtag.push({
      name: inputHashtag.value,
    });
    inputHashtag.value = "";
  }
}

function removeHashtag(index) {
  useHashtag.listRemove.push(useHashtag.selectedHashtag[index]);
  useHashtag.selectedHashtag.splice(index, 1);
}

function removeNewHashtag(index) {
  useHashtag.newHashtag.splice(index, 1);
}
async function getApi() {
  useHashtag.listRemove = [];
  await useHashtag.getListHashtag();
}

onMounted(() => {
  getApi();
});
</script>

<style></style>
