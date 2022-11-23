import { createApiClient } from "./api.service";

class QuestionService {
    constructor(baseUrl = "/api/report") {
        this.api = createApiClient(baseUrl, true, 'application/json');
    }
    async createReport(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteOneReport(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async getListReportById(type, id) {
        return (await this.api.get(`/${type}/${id}`)).data;
    }
    async getReportBlog() {
        return (await this.api.get(`/blog`)).data;
    }
    async getReportQuestion() {
        return (await this.api.get(`/question`)).data;
    }
}
export default new QuestionService();





