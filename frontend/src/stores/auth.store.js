import { defineStore } from "pinia";
import AuthService from "@/services/auth.service";

export const authStore = defineStore("authStore", {
	id: 'auth',
	state() {
		return {
			user: null,
		};
	},
	getters: {
		isUserLoggedIn(state) {
			return !!state.user && !!state.user.accessToken;
		},
		getUser(state) {
			return state.user;
		}
	},
	actions: {
		loadAuthState() {
			this.user = JSON.parse(localStorage.getItem("user"));
		},

		setAuthState(name) {
			this.user.name = name
			localStorage.setItem("user",  JSON.stringify(this.user));
			
		},
		logout() {
			this.user = null;
			localStorage.removeItem("user");
		},
		async login(user) {
			const response = await AuthService.login(user);

			if (!response.accessToken) {
				this.logout();
				throw new Error("Whoops, no access token found!");
			}
			this.user = response;
			localStorage.setItem("user", JSON.stringify(response));
			return response;
		},
		register(user) {
			this.user = null;
			return AuthService.register(user);
		},
	},
});
