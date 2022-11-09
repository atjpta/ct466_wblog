import { defineStore } from "pinia";
import { authStore } from "./auth.store";
import cartService from "../services/cart.service";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
export const cartStore = defineStore("cartStore", {
    id: 'cart',
    state() {
        return {
            cart: {
                id: '',
                id_blog: [],
            },
            data: {},
        };
    },
    getters: {
    },
    actions: {

        setTime(time) {
            dayjs.extend(relativeTime)
            return dayjs(time).fromNow()
        },

        async getListCart() {
            const data = {
                arr1: [],
                arr2: [],
                arr3: [],
            };
            try {
                this.cart = await cartService.getCart(authStore().user.id)
                this.cart.id_blog.forEach((blog, i) => {
                    this.cart.id_blog[i].createdAt = this.setTime(blog.createdAt);
                    if (i % 3 == 0) {
                        data.arr1.push(this.cart.id_blog[i])
                    }
                    else if (i % 3 == 1) {
                        data.arr2.push(this.cart.id_blog[i])
                    }
                    else if (i % 3 == 2) {
                        data.arr3.push(this.cart.id_blog[i])
                    }
                });


            } catch (error) {
                console.log('lỗi lấy dữ liệu - ' + error.message);
            }
            this.data = data;
            this.data.cart = this.cart;
        },

        async deleteCart() {
            await cartService.deleteCart(this.cart.id)
            await this.getListCart(this.cart.id);

        },

        async createCart(data) {
            await cartService.createCart(data)
        },


        check(data) {
            let check = true
            this.cart.id_blog.forEach((e) => {
                if (e._id == data.id_blog) {
                    check = false;
                }
            })
            return check
        },
        async addBlogToCart(id, data) {
            if (this.check(data)) {
                await cartService.addBlogToCart(id, data)
                await this.getListCart(id);
            }
        },

        async removeBlogToCart(id, data) {
            await cartService.removeBlogToCart(id, data)
            await this.getListCart(id);
        },
    },
});
