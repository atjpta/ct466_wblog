import { defineStore } from "pinia";
import { alertStore } from "./alert.store";
import commentBlogService from "../services/commentBlog.service";
import hashtagService from "../services/hashtag.service";
import {blogStore} from "./blog.store";
export const hashtagStore = defineStore("hashtagStore", {
	id: 'hashtag',
	state() {
		return {
			listHashtag: [],
			resultSearch: {},
			selectedHashtag: [],
			newHashtag:[],
			listAddHashtagToBlog: []

		};
	},
	getters: {
		
	},
	actions: {

		addHashtagToBlog(){
			this.selectedHashtag.forEach(e => {
				this.listAddHashtagToBlog.push(e.id)
			})
		},

		async getListHashtag(){
			
			try {
				this.listHashtag = await hashtagService.getListHashtag();
			} catch (error) {
				console.log(error + 'lỗi getListHashtag');
			}
		},

		async createHashtag(){
			try {
				this.newHashtag.forEach( async (e, i) => {
					
					let id = await hashtagService.createHashtag({name: e.name});

					this.listAddHashtagToBlog.push(id)
				})
			} catch (error) {
				console.log(error + 'lỗi createHashtag');
			}
		},

		async deleteAllHashtag(){
			try {
				await hashtagService.deleteAllHashtag();
			} catch (error) {
				console.log(error + 'lỗi deleteAllHashtag');
			}
		},

		async findBlogOnHashtag(id){
			try {
				this.resultSearch = await hashtagService.findBlogOnHashtag(id)
			} catch (error) {
				console.log(error + 'lỗi findBlogOnHashtag');
			}
		},

		async addBlogToHashtag(blog){
			try {
				this.listAddHashtagToBlog.forEach(async e => {
					await hashtagService.addBlogToHashtag(e, {blog: blog})
				})
			} catch (error) {
				console.log(error + 'loi addBlogToHashtag ');
			}
		},

		
		async removeBlogToHashtag(blog){
			const listRemove = blogStore().blog.hashtag.filter(hashtag => {
				this.selectedHashtag.indexOf(hashtag.name) == -1
			})
			try {
				listRemove.forEach(async e => {
					console.log(e);
					await hashtagService.removeBlogToHashtag(e.id, {blog: blog})
				})
			} catch (error) {
				console.log(error + 'loi removeBlogToHashtag ');
			}
		}

	},
});
