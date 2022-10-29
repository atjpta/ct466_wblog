import { defineStore } from "pinia";
import { authStore } from "./auth.store";
import gemService from "../services/gem.service";
import premiumService from "../services/premium.service";
import {infoStore} from './info.store'
export const shopStore = defineStore("shopStore", {
    id: 'shop',
    state() {
        return {
            listgem: [],
            listpremium: [],
        };
    },
    getters: {

    },
    actions: {

        async recharge(data) {
            try {
                await gemService.recharge(authStore().user.id, data)
                await infoStore().getWallet();
            } catch (error) {
                console.log(error + " lỗi recharge");
            }
        },

        async purchasePremium(data) {
            try {
                await premiumService.purchasePremium(authStore().user.id, data)
                await infoStore().getWallet();
            } catch (error) {
                console.log(error + " lỗi recharge");
            }
        },

        async getListGem() {
            try {
                this.listgem = await gemService.getListGem();
            } catch (error) {
                console.log(error + " lỗi getListGem");
            }
        },
        async getListPremium() {
            try {
                this.listpremium = await premiumService.getListPremium();
            } catch (error) {
                console.log(error + " lỗi getListPremium");
            }
        }

        

    },
});
