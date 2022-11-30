import { createApiClient } from "./api.service";

class testService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl, true, 'application/json');
    }

    async testusers() {
        return (
            await this.api.get("/")).data;
    }
}

export default new testService();
