import { createApiClient } from "./api.service";
import axios from "axios";

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

    async test() {
        axios({
            method: 'get',
            url: 'https://api-wblog-atjpta.vercel.app/api/users',
        })
            .then(function (response) {
                console.log(response);
            });
    }

}

export default new testService();
