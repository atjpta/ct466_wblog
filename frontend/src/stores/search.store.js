import { defineStore } from "pinia";
import searchServices from "../services/search.services";
export const searchStore = defineStore("searchStore", {
    id: 'search',
    state() {
        return {
            listSearch : {},
        };
    },
    getters: {

    },
    actions: {

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
        }
    }
});
