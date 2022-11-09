import { createApiClient } from "./api.service";

class BillService {
    constructor(baseUrl = "/api/bill") {
        this.api = createApiClient(baseUrl, true, 'application/json');
    }
    async createBill(data) {
        return (await this.api.post("/", data)).data;
    }
    async getBill(id) {
        return (await this.api.get(`/detail/${id}`)).data;
    }
    async getListBill(id) {
        return (await this.api.get(`/${id}`)).data
    }

    async getListBillBlog(id) {
        return (await this.api.get(`/blog/${id}`)).data
    }
    async getIdBlog(id) {
        return (await this.api.get(`/idblog/${id}`)).data
    }
}
export default new BillService();





