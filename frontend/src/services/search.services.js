import { createApiClient } from "./api.service";

class BlogService {
    constructor(baseUrl = "/api/search") {
        this.api = createApiClient(baseUrl, true, 'application/json');
    }
    async getListSearch() {
        return (await this.api.get("/")).data;
    }
    async getListBlog(id) {
        return (await this.api.get(`/follow/blog/${id}`)).data;
    }

    async getListUser(id) {
        return (await this.api.get(`/follow/user/${id}`)).data;
    }
}
export default new BlogService();





