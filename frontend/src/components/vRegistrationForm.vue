<template>
<div>
    <div v-if="message" class="">
            <n-alert :title=message type="success" closable>
            </n-alert>
    </div>
    <div v-if="error" class="">
            <n-alert :title=error type="error" closable>
            </n-alert>
    </div>
    <Form
        v-if="!success"
        @submit="handleRegister"
        :validation-schema="userFormSchema"
        class="flex justify-center my-20 bg-gradient-to-l from-sky-100 to-sky-500/50 min-w-max max-w-xl rounded-3xl p-10 mx-auto text-lg"
    >
    <div>
        <div class="p-2">
            <div for="username" >Tài khoản : </div>
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
            <div for="name" >Tên : </div>
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
            <div for="email">E-mail : </div>
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
            <Field
                name="repassword"
                type="password"
                class="rounded-md bg-gray-800/10"
            />
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
            <div 
              class="bg-teal-500/50 rounded-lg p-2 shadow-md w-44 duration-300"
              >
                <i class="fa-solid fa-spinner animate-spin px-4"></i>
                Đăng kí
              </div>
        </div>
    </div>
    </Form>
</div>

</template>

<script>
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { mapActions } from "pinia";
import { authStore } from "@/stores/auth.store";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const userFormSchema = Yup.object().shape({
            username: Yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            name: Yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: Yup
                .string()
                .email("E-mail không đúng.")
                .required("E-mail phải có giá trị.")
                .max(50, "E-mail tối đa 50 ký tự."),
            password: Yup
                .string()
                .required("mật khẩu phải có giá trị.")
                .min(2, "mật phải ít nhất 2 ký tự."),
            repassword: Yup
                .string()
                .oneOf([Yup.ref('password'), null], "Mật khẩu không đúng!")             
                .required("mật khẩu phải có giá trị."),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            //  để liên kết với các input trên form
            user:{}, 
            userFormSchema,
            message: "",
            error:"",
            loading: false,
            success: false,
        };
    },
    methods: {
        ...mapActions(authStore, ["register"]),
		async handleRegister(user) {
			this.message = "";
            this.error = "";
			this.successful = false;
			this.loading = true;

			try {
				const data = await this.register(user);
				this.message = data.message;
				this.loading = false;
                this.success = true;
			} catch (error) {
				console.log(error);
                this.error = "đã có lỗi xảy ra!!!"
				this.loading = false;
			}
		},
    },
    
    
};
</script>