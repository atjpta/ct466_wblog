import { createApiClient } from "./api.service";

class MessageService {
    constructor(baseUrl = "/api/message") {
		this.api = createApiClient(baseUrl, true);
	}
    async add(data) {
        return (await this.api.post("/add", {
            from: data.from,
            to: data.to,
            message: data.message,
        })).data;
    }
    async get(data) {
        return (await this.api.post("/get", {
            from: data.from,
            to: data.to,
        })).data;
    }
    
}
export default new MessageService();
