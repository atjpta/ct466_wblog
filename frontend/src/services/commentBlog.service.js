import { createApiClient } from "./api.service";

class CommentService {
    constructor(baseUrl = "/api/comment") {
		this.api = createApiClient(baseUrl, true, 'application/json');
	}
    async create(data) {
        return (await this.api.post("/", data)).data;
    }

    async createCommentChild(data, id) {
        return (await this.api.put(`/${id}`, data)).data;
    }
}
export default new CommentService();
