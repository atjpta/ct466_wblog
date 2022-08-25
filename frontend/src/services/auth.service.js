import { createApiClient } from "./api.service";

class authService {
	constructor(baseUrl = "/api/auth") {
		this.api = createApiClient(baseUrl);
	}

	async login(user) {
		return (
			await this.api.post("/signin", user)).data;
	}

	async register(user) {
		return (
			await this.api.post("/signup", user)).data;
	}
}

export default new authService();
