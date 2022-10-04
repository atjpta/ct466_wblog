import { createApiClient } from "./api.service";

class CommentService {
    constructor(baseUrl = "/api/comment") {
		this.api = createApiClient(baseUrl, true);
	}
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
}
export default new CommentService();
