<template>
  <div>
    <div v-if="message" class="">
      <n-alert :title="message" type="success" closable> </n-alert>
    </div>
    <div v-if="error" class="">
      <n-alert :title="error" type="error" closable> </n-alert>
    </div>
    <Form
      v-if="!success"
      @submit="handleRegister"
      :validation-schema="userFormSchema"
      class="flex justify-center my-20 bg-gradient-to-l from-sky-100 to-sky-500/50 min-w-max max-w-xl rounded-3xl p-10 mx-auto text-lg"
    >
      <div>
        <div class="p-2">
          <div for="username">Tài khoản :</div>
          <Field
            name="username"
            type="text"
            class="rounded-md bg-gray-800/10"
            v-model="user.username"
          />
          <div class="text-red-900">
            <ErrorMessage name="username" class="error-feedback" />
          </div>
        </div>
        <div class="p-2">
          <div for="name">Tên :</div>
          <Field
            name="name"
            type="text"
            class="rounded-md bg-gray-800/10"
            v-model="user.name"
          />
          <div class="text-red-900">
            <ErrorMessage name="name" class="error-feedback" />
          </div>
        </div>
        <div class="p-2">
          <div for="email">E-mail :</div>
          <Field
            name="email"
            type="email"
            class="rounded-md bg-gray-800/10"
            v-model="user.email"
          />
          <div class="text-red-900">
            <ErrorMessage name="email" class="error-feedback" />
          </div>
        </div>
        <div class="p-2">
          <div for="password">Mật khẩu :</div>
          <Field
            name="password"
            type="password"
            class="rounded-md bg-gray-800/10"
            v-model="user.password"
          />
          <div class="text-red-900">
            <ErrorMessage name="password" class="error-feedback" />
          </div>
        </div>
        <div class="p-2">
          <div for="repassword">Nhập lại mật khẩu :</div>
          <Field name="repassword" type="password" class="rounded-md bg-gray-800/10" />
          <div class="text-red-900">
            <ErrorMessage name="repassword" class="error-feedback" />
          </div>
        </div>

        <div v-show="!loading" class="flex justify-center pt-10">
          <button
            class="disabled bg-teal-500 rounded-lg p-2 shadow-md w-44 hover:scale-125 duration-300"
          >
            Đăng kí
          </button>
        </div>
        <div v-show="loading" class="flex justify-center pt-10">
          <div class="bg-teal-500/50 rounded-lg p-2 shadow-md w-44 duration-300">
            <i class="fa-solid fa-spinner animate-spin px-4"></i>
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
import { alertStore } from "@/stores/alert.store";

const useAlertStore = alertStore();
const useAuthStore = authStore();
const user = ref({});
const message = ref("");
const error = ref("");
const loading = ref(false);
const success = ref(false);

const userFormSchema = Yup.object().shape({
  username: Yup.string()
    .required("Tên phải có giá trị.")
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
    const data = await useAuthStore.register(user);
    useAlertStore.message = data.message;
    loading.value = false;
    useAlertStore.success = true;
  } catch (err) {
    useAlertStore.message = err.message;
    useAlertStore.error = true;
    loading.value = false;
  }
}
</script>
