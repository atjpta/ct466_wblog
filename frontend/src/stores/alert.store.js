import { defineStore } from "pinia";
export const alertStore = defineStore("alertStore", {
    id: 'alert',
	state() {
		return {
            error: {
				message: '',
				set: false,
			},
            success: {
				message: '',
				set: false,
			},
			info: {
				message: '',
				set: false,
			},
			warning: {
				message: '',
				set: false,
			},
		};
	},
	getters: {
		
	},
	actions: {

		deleteLocalStorage(){
			localStorage.removeItem("user");
		},

		setSuccess(message){
			this.success.message = message
			this.success.set = true;
			setTimeout(() => {
				this.success.set = false;
				this.success.message = ''
			}, 3000);
		},
		setWarning(message){
			this.warning.message = message
			this.warning.set = true;
			setTimeout(() => {
				this.warning.set = false;
				this.warning.message = ''
			}, 3000);

		},
		setInfo(message){
			this.info.message = message
			this.info.set = true;
			setTimeout(() => {
				this.info.set = false;
				this.info.message = ''
			}, 3000);

		},
		setError(message){
			this.error.message = message
			this.error.set = true;
			setTimeout(() => {
				this.error.set = false;
				this.error.message = ''
			}, 3000);

		},
	},
});
