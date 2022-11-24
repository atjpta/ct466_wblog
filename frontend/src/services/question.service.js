import { createApiClient } from "./api.service";

class QuestionService {
    constructor(baseUrl = "/api/question") {
        this.api = createApiClient(baseUrl, true, 'application/json');
    }
    async getListQ() {
        return (await this.api.get("/")).data;
    }
    async createQ(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAllQ() {
        return (await this.api.delete("/")).data
    }
    async findOneQ(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getListQuestionUser(id) {
        return (await this.api.get(`/myquetion/${id}`)).data;
    }
    async updateQ(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async selectAnswer(id, data) {
        return (await this.api.put(`/addanswer/${id}`, data)).data;
    }

    async removeAnswer(id, data) {
        return (await this.api.put(`/removeanswer/${id}`, data)).data;
    }

    async deleteOneQuestion(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

}
export default new QuestionService();





