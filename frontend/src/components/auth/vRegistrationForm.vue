<template>
  <div class="w-1/3 mx-auto">
    <Form
      v-if="!useAlertStore.success.set"
      @submit="handleRegister"
      :validation-schema="userFormSchema"
      class="bg-gradient-to-l from-sky-100 to-sky-500/30 rounded-2xl"
    >
      <div class="text-center text-5xl py-10">Đăng kí</div>
      <div>
        <div class="mx-auto">
          <div class="p-2 flex justify-center w-3/5 mx-auto">
            <div class="">
              <i class="text-gray-500 fa-solid fa-user text-3xl mt-2 mr-5"></i>
            </div>
            <Field
              v-model="user.username"
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

        <div class="mx-auto">
          <div class="p-2 flex justify-center w-3/5 mx-auto">
            <div class="">
              <i class="text-gray-500 fa-solid fa-font text-3xl mt-2 mr-5"></i>
            </div>
            <Field
              v-model="user.name"
              placeholder="nhập tên của bạn"
              name="name"
              type="text"
              class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full"
            />
          </div>
          <div class="text-red-900 text-center">
            <ErrorMessage name="name" class="error-feedback" />
          </div>
        </div>

        <div class="mx-auto">
          <div class="p-2 flex justify-center w-3/5 mx-auto">
            <div class="">
              <i class="text-gray-500 fa-solid fa-at text-3xl mt-2 mr-5"></i>
            </div>
            <Field
              v-model="user.email"
              placeholder="nhập E-mail của bạn"
              name="email"
              type="text"
              class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full"
            />
          </div>
          <div class="text-red-900 text-center">
            <ErrorMessage name="email" class="error-feedback" />
          </div>
        </div>

        <div class="mx-auto">
          <div class="p-2 flex justify-center w-3/5 mx-auto">
            <div class="">
              <i class="text-gray-500 fa-solid fa-lock text-3xl mt-2 mr-5"></i>
            </div>
            <Field
              v-model="user.password"
              placeholder="nhập mật khẩu của bạn"
              name="password"
              type="password"
              class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full"
            />
          </div>
          <div class="text-red-900 text-center">
            <ErrorMessage name="password" class="error-feedback" />
          </div>
        </div>

        <div class="mx-auto">
          <div class="p-2 flex justify-center w-3/5 mx-auto">
            <div class="">
              <i class="text-gray-500 fa-solid fa-lock text-3xl mt-2 mr-5"></i>
            </div>
            <Field
              placeholder="nhập lại mật khẩu của bạn"
              name="repassword"
              type="password"
              class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-full"
            />
          </div>
          <div class="text-red-900 text-center">
            <ErrorMessage name="repassword" class="error-feedback" />
          </div>
        </div>

        <div
          class="text-center cursor-pointer hover:scale-125 duration-300 text-sky-500 hover:text-violet-500"
        >
          <router-link to="/login" class=""> Đã có tài khoản? </router-link>
        </div>

        <div v-show="!loading" class="flex justify-center py-5">
          <button
            class="cursor-pointer bg-violet-500/10 rounded-2xl uppercase font-semibold w-[200px] px-10 m-2 py-3 text-lg text-center truncate hover:text-violet-700 hover:bg-violet-500/30 active:bg-violet-500/50 hover:scale-125 duration-300"
          >
            Đăng kí
          </button>
        </div>
        <div v-show="loading" class="flex justify-center py-5">
          <div
            class="ml-2 cursor-pointer bg-violet-500/10 rounded-2xl uppercase font-semibold w-[210px] px-10 m-2 py-3 text-lg text-center truncate hover:text-violet-700 hover:bg-violet-500/30 active:bg-violet-500/50 hover:scale-125 duration-300"
          >
            <i class="fa-solid fa-spinner animate-spin"></i>
            Đăng kí
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
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { alertStore } from "@/stores/alert.store";

const router = useRouter();
const route = useRoute();
const useAlertStore = alertStore();
const useAuthStore = authStore();
const user = ref({});
const loading = ref(false);

const userFormSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username phải có giá trị.")
    .min(2, "Tên phải ít nhất 2 ký tự.")
    .max(50, "Tên có nhiều nhất 50 ký tự."),
  name: Yup.string()
    .required("Tên phải có giá trị.")
    .min(2, "Tên phải ít nhất 2 ký tự.")
    .max(50, "Tên có nhiều nhất 50 ký tự."),
  email: Yup.string()
    .email("E-mail không đúng.")
    .required("E-mail phải có giá trị.")
    .max(50, "E-mail tối đa 50 ký tự."),
  password: Yup.string()
    .required("mật khẩu phải có giá trị.")
    .min(2, "mật phải ít nhất 2 ký tự."),
  repassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu không đúng!")
    .required("mật khẩu phải có giá trị."),
});
async function handleRegister(user) {
  try {
    console.log(user);
    const data = await useAuthStore.register(user);
    const redirectPath = route.query.redirect || {
      name: "login",
    };
    useAlertStore.setSuccess(data.message);
    loading.value = false;
    router.push(redirectPath);
  } catch (error) {
    console.log(error.message);
    useAlertStore.setError("Tài khoản đã có người sử dụng");
    loading.value = false;
  }
}
</script>
