import { defineStore } from "pinia";
import { authStore } from "./auth.store";
import cartService from "../services/cart.service";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
export const cartStore = defineStore("cartStore", {
    id: 'cart',
    state() {
        return {
            cart: null,
        };
    },
    getters: {
    },
    actions: {
        async getListCart(id) {
            this.cart = await cartService.getCart(id)
        },

        async deleteCart(id) {
            await cartService.deleteCart(id)
        },

        async createCart(data) {
            await cartService.createCart(data)
        },

        async addBlogToCart(id, data) {
            await cartService.addBlogToCart(id, data)
        },

        async removeBlogToCart(id, data) {
            await cartService.removeBlogToCart(id, data)
        },
    },
});
