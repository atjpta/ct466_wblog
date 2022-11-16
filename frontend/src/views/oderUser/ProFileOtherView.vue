<template>
  <div class="bg-base-200">
    <div class="flex justify-evenly rounded-2xl m-5">
      <div>
        <vAvaterOtherVue :data="useInfo.info_user"></vAvaterOtherVue>
        <div class="text-center">
          <div
            @click="addFollow(useInfo.info_user.id)"
            v-if="isFollow == -1 && !loading"
            class="btn btn-primary btn-outline"
          >
            Theo dõi
          </div>
          <div v-if="loading" class="btn btn-info btn-outline loading">Đang xử lý</div>
          <div
            @click="removeFollow(useInfo.info_user.id)"
            v-if="isFollow != -1 && !loading"
            class="btn btn-warning btn-outline"
          >
            Hủy theo dõi
          </div>
        </div>
      </div>
      <vStatOtherVue :data="useInfo.info_user"> </vStatOtherVue>
    </div>
    <div class="text-center text-4xl font-semibold">các bài viết</div>
    <div class="flex space-x-5 justify-center">
      <div>
        <div v-for="blog in useBlog.data.arr1" :key="blog.id">
          <vMonoBlogVue :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in useBlog.data.arr2" :key="blog.id">
          <vMonoBlogVue :data="blog" />
        </div>
      </div>

      <div>
        <div v-for="blog in useBlog.data.arr3" :key="blog.id">
          <vMonoBlogVue :data="blog" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import vAvaterOtherVue from "../../components/oderUser/vAvaterOther.vue";
import vStatOtherVue from "../../components/oderUser/vStatOther.vue";
import vMonoBlogVue from "../../components/blog/vMonoBlog.vue";
import { computed, onMounted, ref } from "vue";
import { infoStore } from "../../stores/info.store";
import { useRoute, useRouter } from "vue-router";
import { blogStore } from "../../stores/blog.store";
const useBlog = blogStore();
const useInfo = infoStore();
const route = useRoute();
const router = useRouter();
const loading = ref(false);

const isFollow = computed(() => {
  if (useInfo.info_user.followBy) {
    return useInfo.info_user.followBy.indexOf(useInfo.info.id);
  }
  return -1;
});

async function addFollow(id) {
  loading.value = true;
  await useInfo.addFollow(id);
  loading.value = false;
}

async function removeFollow(id) {
  loading.value = true;
  await useInfo.removeFollow(id);
  loading.value = false;
}

onMounted(() => {
  useBlog.getBlogUser(route.params.id);
  useInfo.getInfoUser(route.params.id);
});
</script>

<style></style>
