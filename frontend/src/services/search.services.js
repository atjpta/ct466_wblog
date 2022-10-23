import { createApiClient } from "./api.service";

class BlogService {
    constructor(baseUrl = "/api/search") {
        this.api = createApiClient(baseUrl, true, 'application/json');
    }
    async getListSearch() {
        return (await this.api.get("/")).data;
    }
    async getListFollow(id) {
        return (await this.api.get(`/follow/${id}`)).data;
    }
}
export default new BlogService();





