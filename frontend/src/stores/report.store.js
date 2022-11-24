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
        isEmtyBlog(state) {
            let isEmty = true;
            state.ListBlog.forEach(e => {
                if (e.blog.length > 0) {
                    isEmty = false
                    return;
                }
            })
            return isEmty;
        },
        isEmtyQuestion(state) {
            let isEmty = true;
            state.ListQuestion.forEach(e => {
                if (e.question.length > 0) {
                    isEmty = false
                    return;
                }
            })
            return isEmty;
        },
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
                console.log(`lỗi khi getReportBlog `);
            }
        },
        async getReportQuestion() {
            try {
                this.ListQuestion = await reportService.getReportQuestion()
            } catch (error) {
                console.log(error);
                console.log(`lỗi khi getReportQuestion`);
            }
        },
    },
});
