import { defineStore } from "pinia";
import { authStore } from "./auth.store";
import { alertStore } from "./alert.store";

import billService from "../services/bill.service";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
export const billStore = defineStore("billStore", {
    id: 'bill',
    state() {
        return {
            ListBill: [],
            bill: {},
            data: {},
            ListBlog: [],
            ListId: [],
        };
    },
    getters: {
    },
    actions: {
        async getListBill() {
            try {
                this.ListBill = await billService.getListBill(authStore().user.id)
            } catch (error) {
                console.log(error + 'lỗi khi lấy ds bill');
            }
        },

        async getBill(id) {
            try {
                this.bill = await billService.getBill(id)
            } catch (error) {
                console.log(error + 'lỗi khi lấy bill');
            }
        },

        setTime(time) {
            dayjs.extend(relativeTime)
            return dayjs(time).fromNow()
        },

        async createBill(data) {
            await billService.createBill(data);
        },

        async getListBillBlog() {
            const data = {
                arr1: [],
                arr2: [],
                arr3: [],
            };
            try {
                this.ListBlog = await billService.getListBillBlog(authStore().user.id)
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
        async getIdBlog() {
            try {
                this.ListId = await billService.getIdBlog(authStore().user.id)
            } catch (error) {
                console.log(error + 'lỗi khi lấy ds getIdBlog');
            }
        },
    },
});
