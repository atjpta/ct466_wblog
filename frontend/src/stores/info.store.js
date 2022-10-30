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
				followBlog: [],
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
			wallet: {},
			alluser: [],
		};
	},
	getters: {

	},
	actions: {

		async getAllUsers() {
			try {
				this.alluser = await usersService.getAllUser();
			} catch (error) {
				console.log("lỗi getAllUsers");
				console.log(error);
			}	
		},

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


		/*Hàm tính khoảng cách giữa 2 ngày trong javascript*/
		get_day_of_time (d1, d2) {
			let ms1 = d1.getTime();
			let ms2 = d2.getTime();
			return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
		},


		async getWallet() {
			try {
				this.wallet = await UserService.getGemPremium(authStore().user.id)
				this.wallet.premium = this.get_day_of_time(new Date(), new Date(this.wallet.premium))
			} catch (error) {
				alertStore().setError('lỗi lấy getWallet - ' + error.message);
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
