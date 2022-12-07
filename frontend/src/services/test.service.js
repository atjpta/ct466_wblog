import { createApiClient } from "./api.service";

class testService {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl, true, 'application/json');
    }

    async testusers() {
        return (
            await this.api.get("/users")).data;
    }
    async testusers2() {
        return (
            await this.api.get("/jtyj")).data;
    }
}

export default new testService();
