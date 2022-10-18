<template>
    <div>
        <!-- input cmt -->
        <div class="mx-auto w-5/6">
            <p class="text-4xl pt-10 pb-5">nhập bình luận của bạn:</p>
            <input
                v-model="comment_Blog.content"
                class="bg-white/5 border-0 border-b-2 text-xl mb-5 w-5/6"
                type="text"
            />
            <div class="flex justify-start">
                <button
                    @click="createComment()"
                    class="
                        text-2xl text-center
                        shadow-violet-700 shadow-md
                        w-36
                        h-16
                        rounded-3xl
                        hover:text-blue-900 hover:scale-125
                        duration-300
                    "
                >
                    gửi
                </button>
            </div>
        </div>

        <!-- list cmt -->
        <div
            v-for="cmt in useBlog.blog.comment_Blog"
            :key="cmt.id"
            class="
                mt-10
                w-5/6
                mx-auto
                bg-gradient-to-b
                from-teal-300/50
                rounded-3xl
                shadow-xl
            "
        >
            <div class="p-5 h-16 flex">
                <img
                    class="bg-black h-16 w-16 rounded-full"
                    :src="cmt.author.avatar_Url || emptyImage"
                    alt=""
                />
                <div class="text-3xl text-blue-900 mx-3">
                    {{ cmt.author.name }}
                    <div class="text-lg">
                        <i>{{ cmt.createdAt }}</i>
                    </div>
                </div>
            </div>
            <div class="text-xl mt-10 pt-3 px-5">
                {{ cmt.content }}
            </div>
            <!-- voted cua list blog -->
            <div class="flex mx-5">
                <button
                    @click="vote('tim', cmt.voted.tim, cmt.voted._id)"
                    class="
                        items-center
                        justify-center
                        flex
                        w-1/6
                        rounded-3xl
                        hover:text-red-500 hover:scale-150
                        duration-300
                    "
                >
                    <i
                        :class="[isVote(cmt.voted.tim) ? 'text-red-500' : '']"
                        class="fa-solid fa-heart pt"
                    ></i>
                    <p class="mx-2">{{ cmt.voted.tim.length || 0 }}</p>
                </button>
                <button
                    @click="vote('dislike', cmt.voted.dislike, cmt.voted._id)"
                    class="
                        px-5
                        py-5
                        items-center
                        justify-center
                        flex
                        w-1/6
                        rounded-3xl
                        hover:text-blue-500 hover:scale-150
                        duration-300
                    "
                >
                    <i
                        :class="[
                            isVote(cmt.voted.dislike) ? 'text-blue-500' : '',
                        ]"
                        class="fa-solid fa-thumbs-down pt"
                    ></i>
                    <p class="mx-2">{{ cmt.voted.dislike.length || 0 }}</p>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { blogStore } from "../../stores/blog.store";
import { authStore } from "../../stores/auth.store";
import { alertStore } from "../../stores/alert.store";
import emptyImage from "@/assets/upload-image.png";
const useAuth = authStore();
const useBlog = blogStore();
const comment_Blog = ref({
    id_blog: "",
    content: "",
    author: "",
});

async function createComment() {
    comment_Blog.value.id_blog = useBlog.blog.id;
    comment_Blog.value.author = useAuth.user.id;
    try {
        await useBlog.createComment(comment_Blog.value);
        await useBlog.findOneBlog(useBlog.blog.id);
        comment_Blog.value.content = "";
    } catch (error) {
        alertStore().setError("không thể thêm comment");
    }
}
function isVote(list) {
    return !!list.find((e) => e == useAuth.user.id);
}

function vote(type, list, id_list) {
    const index = list.findIndex((e) => e == useAuth.user.id);
    if (index > -1) {
        list.splice(index, 1);
        useBlog.updatePopVote(type, id_list);
    } else {
        list.push(useAuth.user.id);
        useBlog.updatePushVote(type, id_list);
    }
}
</script>

<style></style>
