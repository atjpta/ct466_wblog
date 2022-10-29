import { createApiClient } from "./api.service";

class GemService {
    constructor(baseUrl = "/api/gem") {
        this.api = createApiClient(baseUrl, true, 'application/json');
    }
    async getListGem() {
        return (await this.api.get("/")).data;
    }
    async createGem(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAllGem() {
        return (await this.api.delete("/")).data;
    }
    async updateGem(id) {
        return (await this.api.put(`/${id}`, data)).data;

    }
    async recharge(id, data) {
        return (await this.api.put(`/recharge/${id}`, data)).data;
    }


    

}
export default new GemService();





