<template>
  <div>
    <div class="border-2 bg-white mx-auto w-fit p-5 rounded-2xl">
      <!-- thanh tìm kiếm -->
      <div>
        <div class="mx-auto md:w-[1200px] w-5/6 rounded-2xl flex text-xl">
          <div class="basis-3/4">
            <input
              v-model="keySearch"
              placeholder="nhập từ khóa vào đây"
              class="mt-4 h-10 w-full bg-slate-50/5 border-b-2 border-black"
            />
          </div>
          <div class="w-[200px] basis-1/4 m-2">
            <div
              class="hover:scale-125 duration-300 cursor-pointer mx-auto w-[150px] active:bg-violet-500/50 text-center hover:bg-violet-500/20 truncate p-3 rounded-2xl hover:text-violet-800"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
              Tìm kiếm
            </div>
          </div>
        </div>
      </div>

      <!-- kiểu tìm kiếm -->
      <div class="mx-auto md:w-[1200px] w-5/6 rounded-2xl mt-5 text-2xl">
        <div class="font-medium">Chọn kiểu tìm kiếm:</div>
        <div class="divide-y divide-black">
          <!-- kiểu tiêu đề bài viết -->
          <div
            @click="selected = 'title'"
            class="form-control hover:text-violet-800 hover:bg-violet-500/30 active:bg-violet-500/50"
          >
            <label class="label cursor-pointer">
              <span class="text-xl">Theo tiêu đề bài viết</span>
              <input
                type="radio"
                name="radio-6"
                class="radio checked:bg-red-500"
                checked
              />
            </label>
          </div>
          <!-- kiểu hashtag -->

          <div
            @click="selected = 'hashtag'"
            class="form-control hover:text-violet-800 hover:bg-violet-500/30 active:bg-violet-500/50"
          >
            <label class="label cursor-pointer">
              <span class="text-xl">Theo hashtag</span>
              <input type="radio" name="radio-6" class="radio checked:bg-red-500" />
            </label>
          </div>
          <!-- kiểu tên tác giả -->

          <div
            @click="selected = 'name'"
            class="form-control hover:text-violet-800 hover:bg-violet-500/30 active:bg-violet-500/50"
          >
            <label class="label cursor-pointer">
              <span class="text-xl">Theo tên tác giả</span>
              <input type="radio" name="radio-6" class="radio checked:bg-red-500" />
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- Kết quả tìm kiếm: -->
    <div
      class="backdrop-blur-sm bg-white/50 md:w-[750px] w-5/6 mx-auto p-3 my-5 rounded-xl text-4xl text-center"
    ></div>

    <div v-if="selected == 'name'" class="flex justify-center">
      <div class="m-5 w-52" v-for="user in listSearchUser" :key="user.id">
        <vCardUserVue :data="user"></vCardUserVue>
      </div>
    </div>
    <vLIstBlog :data="listSearchTitle" v-if="selected == 'title'" />
    <vLIstBlog :data="listSearchHashtag" v-if="selected == 'hashtag'" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import vCardUserVue from "../../components/pageUser/vCardUser.vue";
import { useRoute } from "vue-router";
import vListCardUser from "../../components/search/vListCardUser.vue";
import vLIstBlog from "../../components/blog/vListBlog.vue";
import { searchStore } from "../../stores/search.store";

const route = useRoute();
const useSearch = searchStore();
const keySearch = ref("");
const selected = ref("title");

function formatdata(list) {
  const data = {
    arr1: [],
    arr2: [],
    arr3: [],
  };
  if (list) {
    list.forEach((blog, i) => {
      if (i % 3 == 0) {
        data.arr1.push(blog);
      } else if (i % 3 == 1) {
        data.arr2.push(blog);
      } else if (i % 3 == 2) {
        data.arr3.push(blog);
      }
    });
  }

  data.ListBlog = list;
  return data;
}

const listSearchTitle = computed(() => {
  let list = null;
  if (keySearch.value.length > 0) {
    list = useSearch.listSearch.listBlog.filter((e) => {
      if (e.title) {
        return e.title.toLowerCase().indexOf(keySearch.value) > -1;
      }
      return false;
    });
    list = formatdata(list);
  } else list = formatdata(useSearch.listSearch.listBlog);
  return list;
});

const listSearchHashtag = computed(() => {
  let list = null;
  if (keySearch.value.length > 0) {
    list = useSearch.listSearch.listBlog.filter((e) => {
      if (e.listhashtag) {
        return e.listhashtag.indexOf(keySearch.value) > -1;
      }
      return false;
    });
    list = formatdata(list);
  } else list = formatdata(useSearch.listSearch.listBlog);
  return list;
});

const listSearchUser = computed(() => {
  let list = null;
  if (keySearch.value.length > 0) {
    list = useSearch.listSearch.listUser.filter((e) => {
      if (e.name) {
        return e.name.toLowerCase().indexOf(keySearch.value) > -1;
      }
      return false;
    });
  } else list = useSearch.listSearch.listUser;
  return list;
});

onMounted(() => {
  useSearch.getListSearch();
  useSearch.getListUser();
});
</script>

<style></style>
