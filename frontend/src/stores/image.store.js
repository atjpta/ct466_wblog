import { defineStore } from "pinia";
import imageService from "../services/image.service";

export const imageStore = defineStore("imageStore", {
    id: 'image',
    state() {
        return {
            previewImage: null,
            image: null,
            url: null,
        };
    },
    getters: {
    },
    actions: {
        async previewFiles(event) {
            const file = event.target.files[0];
            const theReader = new FileReader();
            theReader.onloadend = async () => {
                this.previewImage = await theReader.result;
            };
            theReader.readAsDataURL(file);
            this.image = new FormData();
            this.image.append("image", file);
            this.url = "http://localhost:8088/api/image/" + file.name;
        },

        async uploadImage() {
            await imageService.uploadImage(this.image);
            this.previewImage = null
            this.image = null
            return this.url;
        },
    }
}

);
