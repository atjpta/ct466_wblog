import { createApiClient } from "./api.service";

class GemService {
    constructor(baseUrl = "/api/premium") {
        this.api = createApiClient(baseUrl, true, 'application/json');
    }
    async getListPremium() {
        return (await this.api.get("/")).data;
    }
    async createPremium(data) {
        return (await this.api.post("/", data)).data;
    }
    async deletePremium() {
        return (await this.api.delete("/")).data;
    }
    async updatePremium(id) {
        return (await this.api.put(`/${id}`, data)).data;

    }
    async purchasePremium(id, data) {
        return (await this.api.put(`/purchase/${id}`, data)).data;
    }




}
export default new GemService();





