<template>
  <div class="w-1/3 mx-auto">
    <Form
      @submit="handleLogin"
      :validation-schema="FormSchema"
      class="bg-base-200 rounded-2xl"
    >
      <div class="text-center text-5xl py-10">Đăng nhập</div>

      <div>
        <div class="mx-auto">
          <div class="p-2 flex mx-auto w-3/5">
            <div class="">
              <i class="text-gray-500 fa-solid fa-user text-3xl mt-2 mr-5"></i>
            </div>
            <Field
              placeholder="nhập tài khoản của bạn"
              name="username"
              type="text"
              class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full"
            />
          </div>
          <div class="text-red-900 text-center">
            <ErrorMessage name="username" class="error-feedback" />
          </div>
        </div>

        <div class="p-2 flex justify-center w-3/5 mx-auto">
          <div class="">
            <i class="text-gray-500 fa-solid fa-lock text-3xl mt-2 mr-5"></i>
          </div>
          <Field
            placeholder="nhập password bạn"
            name="password"
            type="password"
            class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full"
          />
        </div>
        <div class="text-red-900 text-center">
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div
          class="text-center cursor-pointer hover:scale-125 duration-300 text-sky-500 hover:text-violet-500"
        >
          <router-link to="/dangki" class=""> Chưa có tài khoản? </router-link>
        </div>

        <div v-show="!useAlertStore.loading" class="flex justify-center p-5">
          <button
            class="cursor-pointer bg-violet-500/10 rounded-2xl uppercase font-semibold w-[200px] px-10 m-2 py-3 text-lg text-center truncate hover:text-violet-700 hover:bg-violet-500/30 active:bg-violet-500/50 hover:scale-125 duration-300"
          >
            Đăng nhập
          </button>
        </div>

        <div v-show="useAlertStore.loading" class="flex justify-evenly py-5">
          <div
            class="ml-2 cursor-pointer bg-violet-500/10 rounded-2xl uppercase font-semibold w-[210px] px-10 m-2 py-3 text-lg text-center truncate hover:text-violet-700 hover:bg-violet-500/30 active:bg-violet-500/50 hover:scale-125 duration-300"
          >
            <i class="fa-solid fa-spinner animate-spin"></i>
            Đăng nhập
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup>
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { authStore } from "@/stores/auth.store";
import { alertStore } from "@/stores/alert.store";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const userAuthStore = authStore();
const useAlertStore = alertStore();

const FormSchema = Yup.object().shape({
  username: Yup.string()
    .required("Tên phải có giá trị.")
    .min(2, "Tên phải ít nhất 2 ký tự.")
    .max(50, "Tên có nhiều nhất 50 ký tự."),
  password: Yup.string()
    .required("mật khẩu phải có giá trị.")
    .min(2, "mật phải ít nhất 2 ký tự."),
});

async function handleLogin(user) {
  useAlertStore.loading = true;
  try {
    await userAuthStore.login(user);
    const redirectPath = route.query.redirect || {
      name: "homeblog",
    };
    router.push(redirectPath);
    useAlertStore.loading = false;
  } catch (err) {
    console.log(err);
    useAlertStore.loading = false;
    useAlertStore.setError("sai tài khoản hoặc mật khẩu");
  }
}
</script>
