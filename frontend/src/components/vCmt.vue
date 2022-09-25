<template>
  <div>
    <div class="mx-auto w-5/6">
      <p class="text-4xl pt-10 pb-5">nhập bình luận của bạn:</p>
      <input class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-5/6" type="text" />
      <div class="flex justify-start">
        <button
          @click="read()"
          class="text-2xl text-center shadow-violet-700 shadow-md w-36 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          gửi
        </button>
      </div>
    </div>

    <div
      class="mt-10 w-5/6 mx-auto bg-gradient-to-b from-teal-300/50 rounded-3xl shadow-xl"
    >
      <div class="p-5 h-16 flex">
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

      <div class="text-xl mt-5 pt-3 px-5">
        ghielsssssssssssssssssssssssssssssssssssssghitr
      </div>
      <div class="flex">
        <button
          class="items-center justify-center flex w-1/6 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          <i class="fa-solid fa-heart pt-1"></i>
          <p class="">100</p>
        </button>
        <button
          class="px-5 py-5 items-center justify-center flex w-1/6 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          <i class="fa-solid fa-thumbs-down pt-1"></i>
          <p class="">100</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
