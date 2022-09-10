import { defineStore } from "pinia";
export const alertStore = defineStore("alertStore", {
    id: 'alert',
	state() {
		return {
			message: "hahahahhhaahah",
            error: false,
            success: false,
			info: false,
			warning: false,
			loading:  false,
		};
	},
	getters: {
		
	},
	actions: {
		setSuccess(message){
			this.loading = false;
			this.message = message
			this.success = true;
			setTimeout(() => {
				this.success = false;
			}, 3000);
		},
		setWarning(message){
			this.message = message
			this.warning = true;
			setTimeout(() => {
				this.warning = false;
			}, 3000);

		},
		setInfo(message){
			this.message = message
			this.info = true;
			setTimeout(() => {
				this.info = false;
			}, 3000);

		},
		setError(message){
			this.loading = false;
			this.message = message
			this.error = true;
			setTimeout(() => {
				this.error = false;
			}, 3000);

		},
	},
});
