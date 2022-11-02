import { defineStore } from "pinia";
import { alertStore } from "./alert.store";
import commentBlogService from "../services/commentBlog.service";
import hashtagService from "../services/hashtag.service";
import { blogStore } from "./blog.store";
import blogService from "../services/blog.service";

export const hashtagStore = defineStore("hashtagStore", {
	id: 'hashtag',
	state() {
		return {
			listHashtag: [],
			resultSearch: {},
			selectedHashtag: [],
			newHashtag: [],
			listCreateHashtag: [],
			data: {},
			listRemove: [],
		};
	},
	getters: {

	},
	actions: {

		async getListHashtag() {
			try {
				this.listHashtag = await hashtagService.getListHashtag();
			} catch (error) {
				console.log(error + 'lỗi getListHashtag');
			}
		},


		async createHashtag(id_blog) {
			this.listCreateHashtag = [];
			try {
				this.newHashtag.forEach(async (e) => {
					this.listCreateHashtag.push(e)
				})
				this.selectedHashtag.forEach(e => {
					this.listCreateHashtag.push(e)
				})
				const id = await hashtagService.createHashtag({
					id_blog: id_blog,
					list: this.listCreateHashtag,
				})
				return id;

			} catch (error) {
				console.log(error + 'lỗi createHashtag');
			}
		},

		async createHashtagQuestion(id_question) {
			this.listCreateHashtag = [];
			try {
				this.newHashtag.forEach(async (e) => {
					this.listCreateHashtag.push(e)
				})
				this.selectedHashtag.forEach(e => {
					this.listCreateHashtag.push(e)
				})
				const id = await hashtagService.createHashtagQuestion({
					id_question: id_question,
					list: this.listCreateHashtag,
				})
				return id;

			} catch (error) {
				console.log(error + 'lỗi createHashtag');
			}
		},

		async deleteAllHashtag() {
			try {
				await hashtagService.deleteAllHashtag();
			} catch (error) {
				console.log(error + 'lỗi deleteAllHashtag');
			}
		},

		setTime(time) {
			return new Date(time).toLocaleString();
		},

		async findBlogOnHashtag(id) {
			const data = {
				arr1: [],
				arr2: [],
				arr3: [],
			};
			try {
				this.resultSearch = await hashtagService.findBlogOnHashtag(id)
				this.resultSearch.blog.reverse()
				this.resultSearch.blog.forEach((blog, i) => {
					this.resultSearch.blog[i].id = this.resultSearch.blog[i]._id
					this.resultSearch.blog[i].createdAt = this.setTime(blog.createdAt);
					if (i % 3 == 0) {
						data.arr1.push(this.resultSearch.blog[i])
					}
					else if (i % 3 == 1) {
						data.arr2.push(this.resultSearch.blog[i])
					}
					else if (i % 3 == 2) {
						data.arr3.push(this.resultSearch.blog[i])
					}
				});
			} catch (error) {
				console.log(error + 'lỗi findBlogOnHashtag');
			}
			this.data = data;
			this.data.ListBlog = this.resultSearch.blog;

		},




		async removeBlogToHashtag(blog) {
			try {
				this.listRemove.forEach(async e => {
					await hashtagService.removeBlogToHashtag(e.id, { blog: blog })
				})
			} catch (error) {
				console.log(error + 'loi removeBlogToHashtag ');
			}
		},

		async removeQuestionToHashtag(blog) {
			try {
				this.listRemove.forEach(async e => {
					await hashtagService.removeQuestionToHashtag(e.id, { question: question })
				})
			} catch (error) {
				console.log(error + 'loi removeQuestionToHashtag ');
			}
		}

		

	},
});
