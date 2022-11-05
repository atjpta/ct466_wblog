import { createApiClient } from "./api.service";

class CartService {
    constructor(baseUrl = "/api/cart") {
        this.api = createApiClient(baseUrl, true, 'application/json');
    }
    async createCart(data) {
        return (await this.api.post("/", data)).data;
    }

    async getCart(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async deleteCart(id) {
        return (await this.api.put(`/${id}`)).data
    }
   
    async addBlogToCart(id, data) {
        return (await this.api.put(`/add/${id}`, data)).data;
    }

    async removeBlogToCart(id, data) {
        return (await this.api.put(`/remove/${id}`, data)).data;
    }
}
export default new CartService();





