import { defineStore } from "pinia";
import searchServices from "../services/search.services";
import { authStore } from './auth.store'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const searchStore = defineStore("searchStore", {
    id: 'search',
    state() {
        return {
            listSearch: {},
            ListFollow: {},
            dataBlog: {},
            ListUser: [],
            ListBlog: [],
        };
    },
    getters: {

    },
    actions: {

        setTime(time) {
            dayjs.extend(relativeTime)
            return dayjs(time).fromNow()
        },

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


        async getListUser() {
            try {
                const ListFollow = await searchServices.getListUser(authStore().user.id);
                    this.ListUser = ListFollow
            } catch (error) {
                console.log(' lỗi getListFollow');
                console.log(error);
            }
        },
        async getListBlog() {
            let data = {
                arr1: [],
                arr2: [],
                arr3: [],
            };
            try {
                this.ListBlog = await searchServices.getListBlog(authStore().user.id);
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
                console.log(error);
                console.log('lỗi getListBlog');
            }
            this.dataBlog = data;
            this.dataBlog.ListBlog = this.ListBlog;
        },

        
    }
});
