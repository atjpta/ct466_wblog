import { createApiClient } from "./api.service";

class HashtagService {
    constructor(baseUrl = "/api/hashtag") {
        this.api = createApiClient(baseUrl, true, 'application/json');
    }
    async getListHashtag() {
        return (await this.api.get("/")).data;
    }
    async createHashtag(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAllHashtag() {
        return (await this.api.delete("/")).data
    }
    async findBlogOnHashtag(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async addBlogToHashtag(id, data) {
        return (await this.api.put(`/add/${id}`, data)).data;
    }

    async removeBlogToHashtag(id, data) {
        return (await this.api.put(`/remove/${id}`, data)).data;
    }
}
export default new HashtagService();
