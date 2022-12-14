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
				introduce: '',
				followBlog: [],
				followBy: [],
				repAnswer:[],
			},
			avatar: '',
			infoEdit: {},
			info_user: {
				id: authStore().user.id,
				name: authStore().user.name,
				avata_Url: '',
				introduce: '',
				followBlog: [],
				followBy: [],
				repAnswer: [],
			},
			setFollow: false,
			alluser: [],
		};
	},
	getters: {

	},
	actions: {

		async getAllUsers() {
			try {
				this.alluser = await usersService.getAllUser();
				this.alluser = this.alluser.filter((user) => user.id != authStore().user.id);
			} catch (error) {
				console.log("lỗi getAllUsers");
				console.log(error);
			}	
		},

		async addFollow(follow) {
			try {
				await usersService.addFollow(authStore().user.id, { follow: follow })
				await this.getInfoUser(follow)
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
				await this.getInfoUser(follow)
				alertStore().setSuccess('đã hủy theo dõi thành công')
			} catch (error) {
				alertStore().setError('không thể hủy theo dõi')
				console.log("lỗi removeFollow");
				console.log(error);
			}
		},

		async addFollowBlog(followBlog) {
			try {
				await usersService.addFollowBlog(authStore().user.id, { followBlog: followBlog })
				alertStore().setSuccess('đã theo dõi blog thành công')
			} catch (error) {
				alertStore().setError('không thể theo dõi blog')
				console.log("lỗi addFollowBlog");
				console.log(error);
			}
		},

		async removeFollowBlog(followBlog) {
			try {
				await usersService.removeFollowBlog(authStore().user.id, { followBlog: followBlog })
				alertStore().setSuccess('đã hủy theo dõi blog thành công')
			} catch (error) {
				alertStore().setError('không thể hủy theo dõi blog')
				console.log("lỗi removeFollowBlog");
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
				const result = await UserService.updateInfo(this.infoEdit.id, {
					name: this.infoEdit.name,
					avatar_Url: this.infoEdit.avatar_Url,
					introduce: this.infoEdit.introduce,
				});
				authStore().setAuthState(this.infoEdit.name, this.infoEdit.avatar_Url)
				alertStore().setSuccess(result.message);
			} catch (error) {
				alertStore().setError('lỗi updata - ' + error.message);
			}
		},


	},
});
