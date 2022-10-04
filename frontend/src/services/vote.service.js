import { createApiClient } from "./api.service";

class VoteService {
    constructor(baseUrl = "/api/comment") {
		this.api = createApiClient(baseUrl, true);
	}
    async pushVoted(type, id, data) {
        data = {"id_user": data};
        return (await this.api.put(`/push/${type}/${id}`, data)).data;
    }
    async popVoted(type, id, data) {
        data = {"id_user": data};
        return (await this.api.put(`/pop/${type}/${id}`, data)).data;
    }

    async getAllVote() {
        return (await this.api.get("/")).data;
    }
}
export default new VoteService();
