import axios from "axios";
import { authStore } from "@/stores/auth.store";
import app from "@/main";
import { alertStore } from "@/stores/alert.store";
const commonConfig = {
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	
};


export const createApiClient = (baseURL, withAuthToken = false, config) => {
	if(config){
		commonConfig.headers["Content-Type"] = config;
	}
	const api = axios.create({
		baseURL,
		...commonConfig,
	});

	if (withAuthToken) {
		api.interceptors.request.use((config) => {
			const auth = authStore();

			const user = auth.user;
			if (user && user.accessToken) {
				config.headers.authorization = user.accessToken;
			}
			return config;
			
		});

		api.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				const userAlert = alertStore();
				if (error.response.status == 403) {
					userAlert.setInfo('Không có quyền truy cập')
					console.log("không có quyền truy cập");
					app.$router.push({ name: "login" });
				}
				if (error.response.status == 411) {
					userAlert.setInfo('hết phiên đăng nhập, hãy đăng nhập lại')
					app.$router.push({ name: "login" });
				}
				return Promise.reject(error);
			}
		);
	}
	return api;
};
