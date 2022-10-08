import { createApiClient } from "./api.service";

class CommentService {
    constructor(baseUrl = "/api/comment") {
		this.api = createApiClient(baseUrl, true, 'application/json');
	}
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
}
export default new CommentService();
