import { createApiClient } from "./api.service";

class ImageService {
    constructor(baseUrl = "/api/image") {
		this.api = createApiClient(baseUrl, true, "multipart/form-data");
	}

    async uploadImage(image) {
        return (await this.api.post("/uploadImage", image)).data;
    }
    
}
export default new ImageService();
