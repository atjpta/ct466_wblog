import { defineStore } from "pinia";
import { alertStore } from "./alert.store";
import { authStore } from "./auth.store";
import blogService from "../services/blog.service";
import imageService from "../services/image.service";

export const blogStore = defineStore("blogStore", {
    id: 'blog',
	state() {
		return {
			ListBlog: [],
			blog: {
				id: "",
				author: {},
				title: "",
				voted: {},
				content:{},
			},
			image: {},
			blogEdit: {
				author: authStore().user.id,
				title: '',
				summary:'',
				content:{},
				premium: false,
			},
		};
	},
	getters: {
	},
	actions: {
		getdefault(){
			this.blogEdit = {
				author: authStore().user.id,
				title: '',
				summary:'',
				content:{},
				premium: false,
			}
		},
		async getListBlog(){
			try {
				this.ListBlog = await blogService.getListBlog()
			} catch (error) {
				alertStore().setError('lỗi lấy dữ liệu - ' + error.message );
			}
		},

		async createBlog(){
			try {
				const result = await blogService.createBlog(this.blogEdit);
				alertStore().setSuccess('tạo Blog thành công ');
				return result;
			} catch (error) {
				alertStore().setError('lỗi khi tạo blog - ' + error.message );
			}
		},

		async findOneBlog(id){
			try {

				this.blog = await blogService.findOneBlog(id);
				this.blogEdit = this.blog
			} catch (error) {
				alertStore().setError('lỗi khi tìm blog - ' + error.message );
			}
		},

		async updateBlog(id, data){
			try {
				const result = await blogService.updateBlog(id, data);
				alertStore().setSuccess('Update thành công');
			} catch (error) {
				alertStore().setError('lỗi updata blog- ' + error.message );
			}
		},

		async deleteBlog(id) {
			try {
				const result = await blogService.deleteBlog(id);
				alertStore().setSuccess('Xóa thành công Blog');
			} catch (error) {
				alertStore().setError('lỗi khi xóa blog - ' + error.message );
			}
		},
		async restoreBlog(id) {
			try {
				const result = await blogService.restoreBlog(id);
				alertStore().setSuccess(result.message);
			} catch (error) {
				alertStore().setError('lỗi khi hồi phục blog - ' + error.message );
			}
		},


	},
});
