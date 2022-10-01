<template>
  <div>
    <div>
      <div class="text-6xl text-center font-bold m-5 uppercase">Tiêu đề bài viết</div>
      <div class="">
        <div class="flex flex-row w-9/12 mx-auto h-auto shadow-lg">
          <div class="basis-3/4 p-5 bg-white/50">
            <img class="h-[400px] w-auto" src="../../public/imgs/miku.png" alt="" />
          </div>

          <div class="basis-2/4 py-5 bg-white/50 h-[450px]">
            <div class="h-16 m-auto flex">
              <img
                class="bg-black h-16 w-16 rounded-full"
                src="../../public/imgs/avatar.jpg"
                alt=""
              />
              <div class="text-3xl text-blue-900 mx-3">
                admin
                <div class="text-lg">
                  <i>thời gian đăng</i>
                </div>
              </div>
            </div>

            <div class="mt-5 indent-10 h-[200px] text-xl">
              Ở bài trước mình đã có giới thiệu về MERN stack. Nhưng với sự phát triển
              vượt trội của VueJS trong năm vừa rồi nên mình sẽ thử thay React bằng Vue.
              Bài trước thì dùng mern-cli, còn giờ chưa có mevn-cli nên tạm thời mình dùng
              tay nhé 😄 Thì như bài trước, "MEVN" là viết tắt cho "MongoDB Express.js
              VueJS Node.js"
            </div>

            <div class="flex justify-center">
              <button
                @click="read()"
                class="text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
              >
                xem thêm
              </button>
            </div>
          </div>
          <div class="text-3xl bg-white/50 text-center w-auto">
            <div class="px-5 py-5">
              <i class="fa-solid fa-heart"></i>
              <p>100</p>
            </div>
            <div class="px-5 py-5">
              <i class="fa-solid fa-thumbs-down"></i>
              <p>100</p>
            </div>
            <div class="px-5 py-5">
              <i class="fa-solid fa-comments"></i>
              <p>100</p>
            </div>
            <div class="px-5 py-5">
              <i class="fa-solid fa-eye"></i>
              <p>100</p>
            </div>
          </div>
        </div>
      </div>
      <div class="border-b-4 border-black w-3/5 mx-auto my-5"></div>
    </div>

    <div>
      <div class="text-6xl text-center font-bold m-5 uppercase">Tiêu đề bài viết</div>
      <div class="">
        <div class="flex flex-row w-9/12 mx-auto h-auto shadow-lg">
          <div class="basis-3/4 p-5 bg-white/50">
            <img class="h-[400px] w-auto" src="../../public/imgs/miku.png" alt="" />
          </div>

          <div class="basis-2/4 py-5 bg-white/50 h-[450px]">
            <div class="h-16 m-auto flex">
              <img
                class="bg-black h-16 w-16 rounded-full"
                src="../../public/imgs/avatar.jpg"
                alt=""
              />
              <div class="text-3xl text-blue-900 mx-3">
                admin
                <div class="text-lg">
                  <i>thời gian đăng</i>
                </div>
              </div>
            </div>

            <div class="mt-5 indent-10 h-[200px] text-xl">
              Ở bài trước mình đã có giới thiệu về MERN stack. Nhưng với sự phát triển
              vượt trội của VueJS trong năm vừa rồi nên mình sẽ thử thay React bằng Vue.
              Bài trước thì dùng mern-cli, còn giờ chưa có mevn-cli nên tạm thời mình dùng
              tay nhé 😄 Thì như bài trước, "MEVN" là viết tắt cho "MongoDB Express.js
              VueJS Node.js"
            </div>

            <div class="flex justify-center">
              <button
                @click="read()"
                class="text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
              >
                xem thêm
              </button>
            </div>
          </div>
          <div class="text-3xl bg-white/50 text-center w-auto">
            <div class="px-5 py-5">
              <i class="fa-solid fa-heart"></i>
              <p>100</p>
            </div>
            <div class="px-5 py-5">
              <i class="fa-solid fa-thumbs-down"></i>
              <p>100</p>
            </div>
            <div class="px-5 py-5">
              <i class="fa-solid fa-comments"></i>
              <p>100</p>
            </div>
            <div class="px-5 py-5">
              <i class="fa-solid fa-eye"></i>
              <p>100</p>
            </div>
          </div>
        </div>
      </div>
      <div class="border-b-4 border-black w-3/5 mx-auto my-5"></div>
    </div>

    <div>
      <div class="text-6xl text-center font-bold m-5 uppercase">Tiêu đề bài viết</div>
      <div class="">
        <div class="flex flex-row w-9/12 mx-auto h-auto shadow-lg">
          <div class="basis-3/4 p-5 bg-white/50">
            <img class="h-[400px] w-auto" src="../../public/imgs/miku.png" alt="" />
          </div>

          <div class="basis-2/4 py-5 bg-white/50 h-[450px]">
            <div class="h-16 m-auto flex">
              <img
                class="bg-black h-16 w-16 rounded-full"
                src="../../public/imgs/avatar.jpg"
                alt=""
              />
              <div class="text-3xl text-blue-900 mx-3">
                admin
                <div class="text-lg">
                  <i>thời gian đăng</i>
                </div>
              </div>
            </div>

            <div class="mt-5 indent-10 h-[200px] text-xl">
              Ở bài trước mình đã có giới thiệu về MERN stack. Nhưng với sự phát triển
              vượt trội của VueJS trong năm vừa rồi nên mình sẽ thử thay React bằng Vue.
              Bài trước thì dùng mern-cli, còn giờ chưa có mevn-cli nên tạm thời mình dùng
              tay nhé 😄 Thì như bài trước, "MEVN" là viết tắt cho "MongoDB Express.js
              VueJS Node.js"
            </div>

            <div class="flex justify-center">
              <button
                @click="read()"
                class="text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
              >
                xem thêm
              </button>
            </div>
          </div>
          <div class="text-3xl bg-white/50 text-center w-auto">
            <div class="px-5 py-5">
              <i class="fa-solid fa-heart"></i>
              <p>100</p>
            </div>
            <div class="px-5 py-5">
              <i class="fa-solid fa-thumbs-down"></i>
              <p>100</p>
            </div>
            <div class="px-5 py-5">
              <i class="fa-solid fa-comments"></i>
              <p>100</p>
            </div>
            <div class="px-5 py-5">
              <i class="fa-solid fa-eye"></i>
              <p>100</p>
            </div>
          </div>
        </div>
      </div>
      <div class="border-b-4 border-black w-3/5 mx-auto my-5"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

function read() {
  const redirectPath = route.query.redirect || {
    name: "readblog",
  };
  router.push(redirectPath);
}
</script>

<style></style>
