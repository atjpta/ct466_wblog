import { defineStore } from "pinia";
import { authStore } from "./auth.store";
import { alertStore } from "./alert.store";

import UserService from "@/services/users.service";
import imageService from "../services/image.service";
import usersService from "../services/users.service";


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
			setFollow: false,
		};
	},
	getters: {
	},
	actions: {

		async addFollow(follow) {
			try {
				console.log(follow);
				console.log(authStore().user.id);
				await usersService.addFollow(authStore().user.id, { follow: follow })
				alertStore().setSuccess('đã theo dõi thành công')
			} catch (error) {
				alertStore().setError('không thể theo dõi')
				console.log("lỗi addFollow");
				console.log(error);
			}
		},

		async removeFollow(follow) {
			try {
				await usersService.removeFollow(authStore().user.id, { follow: follow })
				alertStore().setSuccess('đã hủy theo dõi thành công')
			} catch (error) {
				alertStore().setError('không thể hủy theo dõi')
				console.log("lỗi removeFollow");
				console.log(error);
			}
		},

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
				this.info_user.followBy.forEach(e => {
					if (e == authStore().user.id) {
						this.setFollow = true;
					}
				});
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
