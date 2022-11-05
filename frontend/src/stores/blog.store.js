import { defineStore } from "pinia";
import { alertStore } from "./alert.store";
import { authStore } from "./auth.store";
import blogService from "../services/blog.service";
import voteService from "../services/vote.service";
import commentBlogService from "../services/commentBlog.service";
import { hashtagStore } from "./hashtag.store";
import { imageStore } from "./image.store";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
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
				comment_Blog: [
					{
						content: {
							ops: [{
								insert: {}
							}],
						},
						author: {},
						voted: {
							tim: [],
							dislike: [],
							view: 0,
						},
					}
				],
				hashtag: [],

			},
			blogEdit: {},
			hashtag: null,
		};
	},
	getters: {
	},
	actions: {

		async getListBlogNextPage(page) {
			const newList = await blogService.getListBlogNextPage(page);
			const last5e = this.ListBlog.slice(-5, -1)
			let n = 5;
			if (newList.length < n) {
				n = newList.legth
			}
			const first5e = newList.slice(0, n)
			let indexRemove
			for (let index = 0; index < n; index++) {
				indexRemove = 0;
				if (last5e.indexOf(first5e[index]) > -1) {
					newList.splice(indexRemove, 1);
					indexRemove--
				}
				indexRemove++
				
			}
			this.ListBlog = [...this.ListBlog, ...newList]
			newList.forEach((blog, i) => {
				newList[i].createdAt = this.setTime(blog.createdAt);
				if (i % 3 == 0) {
					this.data.arr1.push(newList[i])
				}
				else if (i % 3 == 1) {
					this.data.arr2.push(newList[i])
				}
				else if (i % 3 == 2) {
					this.data.arr3.push(newList[i])
				}
			});
			this.data.ListBlog = this.ListBlog;
			return n;
		},

		setTime(time) {
			dayjs.extend(relativeTime)
			return dayjs(time).fromNow()
		},

		async createComment(data) {
			const document = await commentBlogService.create(data);
		},

		async createCommentChild(data, id) {
			const document = await commentBlogService.createCommentChild(data, id);
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
			this.blogEdit = {};
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
					if (i % 3 == 0) {
						data.arr1.push(this.ListBlog[i])
					}
					else if (i % 3 == 1) {
						data.arr2.push(this.ListBlog[i])
					}
					else if (i % 3 == 2) {
						data.arr3.push(this.ListBlog[i])
					}
				});

			} catch (error) {
				alertStore().setError('lỗi lấy dữ liệu - ' + error.message);
			}
			this.data = data;
			this.data.ListBlog = this.ListBlog;
		},

		async getBlogUser(id) {
			const data = {
				arr1: [],
				arr2: [],
				arr3: [],
			};
			try {
				this.ListBlog = await blogService.getBlogUser(id)
				this.ListBlog.forEach((blog, i) => {
					this.ListBlog[i].createdAt = this.setTime(blog.createdAt);
					if (i % 3 == 0) {
						data.arr1.push(this.ListBlog[i])
					}
					else if (i % 3 == 1) {
						data.arr2.push(this.ListBlog[i])
					}
					else if (i % 3 == 2) {
						data.arr3.push(this.ListBlog[i])
					}
				});

			} catch (error) {
				alertStore().setError('lỗi lấy dữ liệu - ' + error.message);
			}
			this.data = data;
			this.data.ListBlog = this.ListBlog;
		},


		async createBlog(blog) {
			try {
				blog.author = authStore().user.id;
				// upload ảnh lên server
				if (imageStore().image) {
					blog.cover_image_Url = await imageStore().uploadImage();
				}
				const result1 = await blogService.createBlog(blog);
				const result2 = await hashtagStore().createHashtag(result1);
				alertStore().setSuccess('tạo Blog thành công ');
				hashtagStore().listAddHashtagToBlog = [];
				hashtagStore().selectedHashtag = [];
				return result2;
			} catch (error) {
				alertStore().setError('lỗi khi tạo blog - ' + error.message);
			}
		},



		async updateBlog() {
			try {
				if (imageStore().image) {
					this.blogEdit.cover_image_Url = await imageStore().uploadImage();
				}
				await hashtagStore().removeBlogToHashtag(this.blogEdit.id);
				const data = {
					id: this.blogEdit.id,
					title: this.blogEdit.title,
					summary: this.blogEdit.summary,
					cover_image_Url: this.blogEdit.cover_image_Url,
					content: this.blogEdit.content,
					hashtag: [],
				};

				const result = await blogService.updateBlog(data.id, data);
				const result2 = await hashtagStore().createHashtag(this.blogEdit.id);
				alertStore().setSuccess('Update thành công');
				hashtagStore().listAddHashtagToBlog = [];
				hashtagStore().selectedHashtag = [];
				return result2;
			} catch (error) {
				alertStore().setError('lỗi updata blog- ' + error.message);
			}
		},

		async findOneBlog(id) {
			try {

				this.blog = await blogService.findOneBlog(id);
				this.blog.time = this.setTime(this.blog.time)
				this.blog.comment_Blog.forEach((cmt, i) => {
					this.blog.comment_Blog[i].createdAt = this.setTime(cmt.createdAt);
					this.blog.comment_Blog[i].cmt_child.forEach((child, j) => {
						this.blog.comment_Blog[i].cmt_child[j].createdAt = this.setTime(child.createdAt);
					})
				});
				hashtagStore().selectedHashtag = this.blog.hashtag
				this.blogEdit = this.blog
			} catch (error) {
				alertStore().setError('lỗi khi tìm blog - ' + error.message);
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
