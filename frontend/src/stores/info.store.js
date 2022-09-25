import { defineStore } from "pinia";
import { authStore } from "./auth.store";
import { alertStore } from "./alert.store";
// import { useRouter, useRoute } from "vue-router";

import UserService from "@/services/user.service";
import imageService from "../services/image.service";


export const infoStore = defineStore("infoStore", {
    id: 'info',
	state() {
		return {
			info: {
				id: authStore().user.id,
                name: authStore().user.name,
                avata_Url: '',
                date: '',
                introduce: '',
            },
			avatar: '',
		};
	},
	getters: {
	},
	actions: {
		async getApiInfo(){
			this.info = await UserService.getInfo(this.info.id)
		},

		async updateInfo(){
			try {
				if(typeof(this.info.date) == 'array'){
					this,info.date = this.info.date.join();
				}
				const result = await UserService.updateInfo(this.info.id, this.info);
				alertStore().setSuccess(result.message);
			} catch (error) {
				alertStore().setError('lỗi updata - ' + error.message );
			}
		},


	},
});
