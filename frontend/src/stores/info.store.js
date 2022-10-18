import { defineStore } from "pinia";
import { authStore } from "./auth.store";
import { alertStore } from "./alert.store";

import UserService from "@/services/users.service";
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
			infoEdit: {},
			info_user: {
				id: authStore().user.id,
				name: authStore().user.name,
				avata_Url: '',
				date: '',
				introduce: '',
			},
		};
	},
	getters: {
	},
	actions: {
		async getApiInfo() {
			try {
				this.info = await UserService.getInfo(this.info.id)
				this.infoEdit = this.info;
			} catch (error) {
				alertStore().setError('lỗi lấy dữ liệu - ' + error.message);
			}

		},

		async getInfoUser(id) {
			try {
				this.info_user = await UserService.getInfo(id)
			} catch (error) {
				console.log(error + ' - lỗi getInfoUser');
			}

		},

		async updateInfo() {
			try {
				if (typeof (this.infoEdit.date) != 'string') {
					this.infoEdit.date = this.infoEdit.date.join().toString();
				}
				const result = await UserService.updateInfo(this.infoEdit.id, this.infoEdit);
				authStore().setAuthState(this.infoEdit.name)
				alertStore().setSuccess(result.message);
			} catch (error) {
				alertStore().setError('lỗi updata - ' + error.message);
			}
		},


	},
});
