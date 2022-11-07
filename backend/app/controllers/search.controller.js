const mongoose = require("mongoose");
const db = require("../models");
const Blog = db.blog;
const user = db.user;
const Question = db.question;


exports.getListSearch = async (req, res, next) => {
    try {
        const listBlog = await Blog.find({ _id: { $ne: req.params.id }, deleted: false }
        ).populate(
            'hashtag', 'name'
        ).populate(
            'author', 'name avatar_Url'
        ).populate(
            'voted', 'tim dislike view'
        ).sort({ 'createdAt': -1 }
        ).select([
            "title",
            "summary",
            "cover_image_Url",
            "voted",
            "premium",
            "hashtag",
            "_id",
            "createdAt",
        ])

        const listUser = await user.find({ _id: { $ne: req.params.id } }).select([
            "name",
            'avatar_Url',
            "_id",
        ]);

        if (!listBlog || !listUser) {
            return next(res.status(404).json({ Message: "không thể getListSearch" }));
        }
        return res.send({
            listBlog: listBlog,
            listUser: listUser
        });
    } catch (error) {
        return next(res.status(500).send("lỗi khi getListSearch"))
    }
};


exports.getListFollow = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    try {
        let listUser = await user.findOne(condition).select('follow')
            .populate({
                path: 'follow',
                select: 'name avatar_Url id',
            })
            .exec();

        listUser = listUser.follow
        const listID = [];
        listUser.forEach(e => {
            listID.push(e.id)
        });
        const listBlog = await Blog.find({ author: { $in: listID }, deleted: false }
        ).populate(
            'hashtag', 'name'
        ).populate(
            'author', 'name avatar_Url'
        ).populate(
            'voted', 'tim dislike view'
        ).sort({ 'createdAt': -1 }
        ).select([
            "title",
            "summary",
            "cover_image_Url",
            "voted",
            "premium",
            "hashtag",
            "_id",
            "createdAt",
        ])

        if (!listBlog || !listUser) {
            return next(res.status(404).json({ Message: "không thể getListFollow" }));
        }
        return res.send({
            listUser: listUser,
            listBlog: listBlog,
        });
    } catch (error) {
        return next(res.status(500).send("lỗi khi getListFollow"))
    }
};



exports.getListUser = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    try {
        let listUser = await user.findOne(condition).select('follow')
            .populate({
                path: 'follow',
                select: 'name avatar_Url id followBy repAnswer introduce',
            })
            .exec();
        let slBlog = [];
        let slQuestion = [];
        let document = []
        const end = listUser.follow.length
        if (listUser) {
            await listUser.follow.forEach(async (e, i) => {
                slBlog = await Blog.find({ author: e._id });
                slQuestion = await Question.find({ author: e._id });
                
                document.push({
                    slBlog: slBlog.length,
                    slQuestion: slQuestion.length,
                    name: e.name,
                    avatar_Url: e.avatar_Url,
                    id: e._id,
                    followBy: e.followBy,
                    repAnswer: e.repAnswer,
                    introduce: e.introduce,
                })
                if (document.length == end) {
                    return res.send(document);
                }
            })
        }
        else {
            return next(res.status(404).json({ Message: "không thể getListUser" }));
        }
    } catch (error) {
        return next(res.status(500).send("lỗi khi getListUser" + error))
    }
};



