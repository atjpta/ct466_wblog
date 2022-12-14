import { createApiClient } from "./api.service";

class BlogService {
    constructor(baseUrl = "/api/blog") {
        this.api = createApiClient(baseUrl, true, 'application/json');
    }
    async getListBlog() {
        return (await this.api.get("/")).data;
    }
    async getListBlogNextPage(page) {
        return (await this.api.get(`/page/${page}`)).data;
    }
    async createBlog(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAllBlog() {
        return (await this.api.delete("/")).data
    }
    async findOneBlog(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async updateBlog(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async deleteBlog(id) {
        return (await this.api.delete(`/${id}`)).data
    }
    async restoreBlog(id) {
        return (await this.api.put(`/retore/${id}`)).data
    }

    async addhashtag(id, hashtag) {
        return (await this.api.put(`/addhashtag/${id}`, hashtag)).data;
    }
    async removehashtag(id, hashtag) {
        return (await this.api.put(`/removehashtag/${id}`, hashtag)).data;
    }
    async getBlogUser(id) {
        return (await this.api.get(`/blogUser/${id}`)).data;
    }

}
export default new BlogService();





