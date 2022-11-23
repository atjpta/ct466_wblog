import { defineStore } from "pinia";
import { authStore } from "./auth.store";
import reportService from "../services/report.service";
import { alertStore } from './alert.store'
export const reportStore = defineStore("reportStore", {
    id: 'report',
    state() {
        return {
            ListBlog: [],
            ListQuestion: [],
            ListReport: {},
        };
    },
    getters: {

    },
    actions: {
        async createReport(data) {
            await reportService.createReport(data);
        },

        async deleteOneReport(id) {
            await reportService.deleteOneReport(id);
        },
        
        async getListReportById(type, id) {
            this.ListReport = await reportService.getListReportById(type, id)
        },
        async getReportBlog() {
            try {
                this.ListBlog = await reportService.getReportBlog()
            } catch (error) {
                console.log(error);
                console.log(`lỗi khi getReportBlog ${type} ++ ${id}`);
            }
        },
        async getReportQuestion() {
            try {
                this.ListQuestion = await reportService.getReportQuestion()
            } catch (error) {
                console.log(error);
                console.log(`lỗi khi getReportQuestion ${type} ++ ${id}`);
            }
        },
    },
});
