<template>
  <div>
    <div class="p-20">
      <div
        @mouseenter="openIcon = true"
        class="w-64 mx-auto flex justify-center relative"
      >
        <img
          class="bg-black/50 h-64 w-64 rounded-full"
          :src="useInfo.avatar || useInfo.info.avatar_Url"
          alt=""
        />
        <div
          v-if="openIcon"
          @mouseleave="openIcon = false"
          @click="openInput = !openInput"
          class="h-full w-full btn btn-ghost rounded-full text-5xl text-base-300 absolute"
        >
          <i class="fa-solid fa-camera"></i>
        </div>
      </div>

      <div v-if="!openName" class="my-3 text-2xl font-semibold text-center">
        {{ useInfo.info.name }}
        <div @click="openName = true" class="btn btn-primary btn-outline">
          <i class="fa-solid fa-pen text-2xl"></i>
        </div>
      </div>

      <div v-if="openName" class="my-3">
        <input
          v-model="useInfo.infoEdit.name"
          class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full"
          type="text"
        />
        <div class="flex justify-around">
          <div
            @click="updateName()"
            class="btn btn-primary btn-outline"
            v-if="!loadingName"
          >
            Lưu
          </div>
          <div v-else>
            <div class="btn btn-primary btn-outline loading">Lưu</div>
          </div>
          <div @click="openName = false" class="btn btn-error btn-outline">Hủy</div>
        </div>
      </div>

      <div v-if="openInput">
        <input
          class="w-64 rounded-md border-2 border-primary file:bg-primary file:text-white file:h-12 file:font-semibold file:p-2"
          accept="image/*"
          type="file"
          @change="previewFiles($event)"
        />
      </div>

      <div v-if="useInfo.avatar" class="flex justify-around my-5">
        <div class="">
          <div
            @click="updateAvatar()"
            class="btn btn-primary btn-outline"
            v-if="!loading"
          >
            Lưu
          </div>
          <div v-else class="btn btn-primary btn-outline loading">Lưu</div>
        </div>
        <div class="btn btn-error btn-outline">
          <div>
            <button @click="cancel()">Hủy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { infoStore } from "../../stores/info.store";
import { alertStore } from "../../stores/alert.store";
import { computed, onMounted, ref } from "vue";
import imgageService from "../../services/image.service";

const useInfo = infoStore();
const userAlert = alertStore();
const image = ref();
const loading = ref(false);
const loadingName = ref(false);
const openInput = ref(false);
const openIcon = ref(false);
const openName = ref(false);

async function updateName() {
  try {
    loadingName.value = true;
    await useInfo.updateInfo();
    userAlert.setSuccess("Sửa tên thành công");
  } catch (error) {
    console.log(error);
    userAlert.setError(error.messge);
  } finally {
    loadingName.value = false;
    openName.value = false;
  }
}

async function updateAvatar() {
  const file = new FormData();
  const url = "http://localhost:8088/api/image/" + image.value.name;
  file.append("image", image.value);
  loading.value = true;
  try {
    useInfo.infoEdit.avatar_Url = url;
    await useInfo.updateInfo();
    await imgageService.uploadImage(file);
    useInfo.avatar = "";
  } catch (error) {
    userAlert.setError("Không thể cập nhật ảnh");
  } finally {
    loading.value = false;
    openInput.value = false;
  }
}
function previewFiles(event) {
  image.value = event.target.files[0];
  const theReader = new FileReader();
  theReader.onloadend = async () => {
    useInfo.avatar = await theReader.result;
  };
  theReader.readAsDataURL(image.value);
}

function cancel() {
  useInfo.avatar = "";
  openInput.value = false;
}

onMounted(() => {
  useInfo.getApiInfo();
});
</script>

<style></style>
