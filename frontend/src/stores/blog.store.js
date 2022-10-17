import { defineStore } from "pinia";
import { alertStore } from "./alert.store";
import { authStore } from "./auth.store";
import blogService from "../services/blog.service";
import voteService from "../services/vote.service";
import commentBlogService from "../services/commentBlog.service";
import { hashtagStore } from "./hashtag.store";
export const blogStore = defineStore("blogStore", {
	id: 'blog',
	state() {
		return {
			data: {},
			comment_blog: {},
			ListBlog: [],
			blog: {
				id: "",
				author: {},
				title: "",
				voted: {
					tim: [],
					dislike: [],
					view: [],
				},
				content: {},
				comment_Blog: [],
				hashtag:[],

			},
			image: {},
			blogEdit: {
				author: authStore().user.id,
				title: '',
				summary: '',
				content: {},
				premium: false,
				hashtag:[],
			},
		};
	},
	getters: {
	},
	actions: {

		setTime(time){
			return new Date(time).toLocaleString();
		},
	
		async createComment(data){
			const document = await commentBlogService.create(data);
			console.log(document);
		},

		async updatePushVote(type, id_list) {
			try {
				await voteService.pushVoted(type, id_list, authStore().user.id);
			} catch (error) {
				console.log(error.message);
			}
		},
		async updatePopVote(type, id_list) {
			try {
				await voteService.popVoted(type, id_list, authStore().user.id);
			} catch (error) {
				console.log(error);
			}
		},
		getdefault() {
			this.blogEdit = {
				author: authStore().user.id,
				title: '',
				summary: '',
				content: {},
				premium: false,
				hashtag: [],
			}
		},

	
		async getListBlog() {
			const data = {
				arr1: [],
				arr2: [],
				arr3: [],
			};
			try {
				this.ListBlog = await blogService.getListBlog()
				this.ListBlog.forEach((blog, i) => {
					this.ListBlog[i].createdAt = this.setTime(blog.createdAt);
					if(i%3 == 0){
						data.arr1.push(this.ListBlog[i])
					}
					else if(i%3 == 1){
						data.arr2.push(this.ListBlog[i])
					}
					else if(i%3 == 2){
						data.arr3.push(this.ListBlog[i])
					}
				});
				
			} catch (error) {
				alertStore().setError('lỗi lấy dữ liệu - ' + error.message);
			}
			this.data = data;
			this.data.ListBlog = this.ListBlog;
		},

		async addhashtagToBlog(id){
			try {
				hashtagStore().listAddHashtagToBlog.forEach(async e  =>  {
					await blogService.addhashtag(id, {hashtag: e})
					// console.log('đã them '+ e);
				})
			} catch (error) {
				console.log(error + 'addhashtagToBlog' );
			}
		},

		async createBlog() {
			try {
				this.blogEdit.hashtag = hashtagStore.listAddHashtagToBlog
				const result = await blogService.createBlog(this.blogEdit);
				await this.addhashtagToBlog(result)
				alertStore().setSuccess('tạo Blog thành công ');
				hashtagStore.listAddHashtagToBlog = [];
				return result;
			} catch (error) {
				alertStore().setError('lỗi khi tạo blog - ' + error.message);
			}
		},

		async findOneBlog(id) {
			try {

				this.blog = await blogService.findOneBlog(id);
				this.blog.time = this.setTime(this.blog.time)
				this.blog.comment_Blog.forEach((cmt, i) => {
					this.blog.comment_Blog[i].createdAt = this.setTime(cmt.createdAt);
				});
				hashtagStore().selectedHashtag = this.blog.hashtag
				this.blogEdit = this.blog
			} catch (error) {
				alertStore().setError('lỗi khi tìm blog - ' + error.message);
			}
		},

		async updateBlog(id, data) {
			try {
				const result = await blogService.updateBlog(id, data);
				alertStore().setSuccess('Update thành công');
				hashtagStore.listAddHashtagToBlog = [];
			} catch (error) {
				alertStore().setError('lỗi updata blog- ' + error.message);
			}
		},

		async deleteBlog(id) {
			try {
				const result = await blogService.deleteBlog(id);
				alertStore().setSuccess('Xóa thành công Blog');
			} catch (error) {
				alertStore().setError('lỗi khi xóa blog - ' + error.message);
			}
		},
		async restoreBlog(id) {
			try {
				const result = await blogService.restoreBlog(id);
				alertStore().setSuccess(result.message);
			} catch (error) {
				alertStore().setError('lỗi khi hồi phục blog - ' + error.message);
			}
		},


	},
});
