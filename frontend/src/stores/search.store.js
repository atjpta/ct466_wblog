import { defineStore } from "pinia";
import searchServices from "../services/search.services";
import {authStore} from './auth.store'
export const searchStore = defineStore("searchStore", {
    id: 'search',
    state() {
        return {
            listSearch: {},
            ListFollow: {},
            dataBlog: {},
        };
    },
    getters: {

    },
    actions: {
        formatdata(list) {
            const data = {
                arr1: [],
                arr2: [],
                arr3: [],
            };
            if(list) {
                list.forEach((blog, i) => {
                    if (i % 3 == 0) {
                        data.arr1.push(blog);
                    } else if (i % 3 == 1) {
                        data.arr2.push(blog);
                    } else if (i % 3 == 2) {
                        data.arr3.push(blog);
                    }
                });
            }

            data.ListBlog = list;
            return data;
        },


        setTime(time) {
            return new Date(time).toLocaleString();
        },

        formatHashtag(list) {
            let data = '';
            list.forEach(e => {
                data += e.name.toLowerCase()
            });
            return data
        },

        async getListSearch() {
            try {
                this.listSearch = await searchServices.getListSearch();
                this.listSearch.listBlog.forEach((e, i) => {
                    this.listSearch.listBlog[i].createdAt = this.setTime(e.createdAt);
                    this.listSearch.listBlog[i].listhashtag = this.formatHashtag(this.listSearch.listBlog[i].hashtag)
                });
            } catch (error) {
                console.log(' lỗi getListSearch');
                console.log(error);
            }
        },

        async getListFollow() {
            try {
                this.ListFollow = await searchServices.getListFollow(authStore().user.id);
                this.ListFollow.listBlog.forEach((e, i) => {
                    this.ListFollow.listBlog[i].createdAt = this.setTime(e.createdAt);
                });
                this.dataBlog = this.formatdata(this.ListFollow.listBlog)
            } catch (error) {
                console.log(' lỗi getListFollow');
                console.log(error);
            }
        },
    }
});
