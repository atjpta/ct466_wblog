import { defineStore } from "pinia";
import { alertStore } from "./alert.store";
import { authStore } from "./auth.store";
import questionService from '../services/question.service'
import voteService from "../services/vote.service";
import commentBlogService from "../services/commentBlog.service";
import { hashtagStore } from "./hashtag.store";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
export const questStore = defineStore("questStore", {
    id: 'quest',
    state() {
        return {
            question: {
                author: {},
                comment_Question: {},
                content: {},
                voted: {
                    tim: [],
                    dislike: [],
                    view: 0,
                },

            },
        };
    },
    getters: {
    },
    actions: {

        async createCommentQuestion(data) {
            const document = await commentBlogService.createCommentQuestion(data);
        },
        async createCommentChild(data, id) {
            const document = await commentBlogService.createCommentChild(data, id);
        },


        async createQ(data) {
            try {
                data.author = authStore().user.id;
                const result1 = await questionService.createQ(data);
                const result2 = await hashtagStore().createHashtagQuestion(result1);
                alertStore().setSuccess('tạo Blog thành công ');
                hashtagStore().listAddHashtagToBlog = [];
                hashtagStore().selectedHashtag = [];
                return result2;
            } catch (error) {
                alertStore().setError('lỗi khi tạo createQ - ' + error.message);
            }
        },

        setTime(time) {
            dayjs.extend(relativeTime)
            return dayjs(time).fromNow()
        },

        async findOneQuestion(id) {
            try {
                this.question = await questionService.findOneQ(id);
                this.question.time = this.setTime(this.question.time)
                this.question.comment_Question.forEach((cmt, i) => {
                    this.question.comment_Question[i].createdAt = this.setTime(cmt.createdAt);
                    this.question.comment_Question[i].cmt_child.forEach((child, j) => {
                        this.question.comment_Question[i].cmt_child[j].createdAt = this.setTime(child.createdAt);
                    })
                });
                hashtagStore().selectedHashtag = this.question.hashtag
                this.questionEdit = this.question
            } catch (error) {
                console.log('lỗi khi tìm question - ' + error);
                alertStore().setError('lỗi khi tìm question - ' + error.message);
            }
        },

        async updateQ(data) {
            try {
                await hashtagStore().removeQuestionToHashtag(data.id);
                const data2 = {
                    id: data.id,
                    title: data.title,
                    content: data.content,
                    hashtag: [],
                };
                const result = await questionService.updateQ(data2.id, data2);
                const result2 = await hashtagStore().createHashtagQuestion(data2.id);
                alertStore().setSuccess('Update thành công');
                hashtagStore().listAddHashtagToBlog = [];
                hashtagStore().selectedHashtag = [];
                return result2;
            } catch (error) {
                alertStore().setError('lỗi updata updateQ store - ' + error.message);
            }
        },


    },
});