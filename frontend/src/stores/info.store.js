import { defineStore } from "pinia";
import { authStore } from "./auth.store";
import { alertStore } from "./alert.store";
import { useRouter, useRoute } from "vue-router";

import UserService from "@/services/user.service";

const route = useRoute();

export const infoStore = defineStore("infoStore", {
    id: 'info',
	state() {
		return {
			info: {
				id: authStore().user.id,
                name: authStore().user.name,
                avata: '',
                date: '',
                introduce: '',
            },
		};
	},
	getters: {
	},
	actions: {
		async getApiInfo(){
			this.info = await UserService.getInfo(this.info.id)
			localStorage.setItem("info", JSON.stringify(this.info));
		},

		getInfo() {
			return this.info = JSON.parse(localStorage.getItem("info"));
		},

		async updateInfo(){
			
			try {
				const result = await UserService.updateInfo(this.info.id, this.info);
				alertStore().setSuccess(result.message);
				localStorage.setItem("info", JSON.stringify(this.info));
			} catch (error) {
				alertStore().setError('không thể cập nhật thông tin');
				this.info = JSON.parse(localStorage.getItem("info"));
			}
		},

	},
});
