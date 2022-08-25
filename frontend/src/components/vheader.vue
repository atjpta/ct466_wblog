<template>
  <div class="h-16 bg-gray-200/50 text-xl">
      <div class="flex justify-between p-4">
            <!-- bên trái -->
            <div class="hover:text-violet-700 hover:scale-125 duration-300 ">
                <router-link to="/">
                        <button>
                            WBCHAT
                        </button>
                </router-link>
            <div class="animate-ping border-b-2 border-blue-500 h-1 w-20"></div>
            </div>
            <!-- giữa -->
            <div class="flex pl-28"> 
                <div class="px-6 hover:text-violet-700 hover:scale-125 duration-300 ">
                   <router-link to="/">
                        <button>
                            <i class="fa-solid fa-house"></i>
                            Trang chủ
                        </button>
                   </router-link>
                </div>
                <div class="px-6 hover:text-violet-700 hover:scale-125 duration-300">
                    <router-link to="/trang2">
                        <button>
                            <i class="fa-solid fa-circle-question"></i>
                            Giúp đỡ
                        </button>
                   </router-link>
                </div>
                <div class="px-6 hover:text-violet-700 hover:scale-125 duration-300 ">
                    <router-link to="/">
                        <button>
                            <i class="fa-solid fa-phone"></i>
                            Liên hệ
                        </button>
                   </router-link>
                </div>
                <div class="px-6 hover:text-violet-700 hover:scale-125 duration-300 ">
                   <router-link to="/chatroom">
                        <button>
                            <i class="fa-solid fa-comments"></i>
                            Trò chuyện
                        </button>
                   </router-link>
                </div>
            </div>
            <!-- bên phải -->
            <div v-if="!currentUser" class="flex"> 
                <div class="pr-3 hover:text-violet-700 hover:scale-125 duration-300">
                    <router-link to="/login" class=""><button>Đăng nhập</button></router-link>
                </div>
                <div class="border-r-2"></div>

                <div class="px-3 hover:text-violet-700 hover:scale-125 duration-300">
                    <router-link to="/login" class="">Đăng kí</router-link>
                </div>
            </div>

            <div v-if="currentUser" class="flex"> 
                <div class="pr-3 hover:text-violet-700 hover:scale-125 duration-300">
                    <router-link to="/profile" class=""><button>{{ currentUser.name }}</button></router-link>
                </div> 
                <div class="border-r-2"></div>
                <div class="px-3 hover:text-violet-700 hover:scale-125 duration-300">
                    <button @click.prevent="handleLogout" > Đăng xuất </button>
                </div>
            </div>

      </div>
  </div>
</template>

<script>

import { mapState, mapActions } from "pinia";
import { authStore } from "@/stores/auth.store";

export default {
	computed: {
		...mapState(authStore, {
			currentUser: "user",
		}),
	},
	methods: {
		...mapActions(authStore, ["logout", "loadAuthState"]),

		handleLogout() {
			this.logout();
			this.$router.push({ name: "login" });
		},
	},
	created() {
		this.loadAuthState();
	},
};
</script>

<style>

</style>