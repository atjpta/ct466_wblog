import { createApiClient } from "./api.service";

class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl, true, "application/json");
    }
    async getAllUser() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async getInfo(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getGemPremium(id) {
        return (await this.api.get(`/wallet/${id}`)).data;
    }

    async getAllVote() {
        return (await this.api.get("/")).data;
    }
    async updateInfo(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async addFollow(id, data) {
        return (await this.api.put(`/addFollow/${id}`, data)).data;
    }

    async removeFollow(id, data) {
        return (await this.api.put(`/removeFollow/${id}`, data)).data;
    }

    async testuser() {
        // return (await this.api.get(`/test/user`)).data;
        return console.log((await this.api.get(`/test/user`)).data);
    }

    async testadmin() {
        return (await this.api.get(`/test/admin`)).data;
    }
}
export default new UserService();
