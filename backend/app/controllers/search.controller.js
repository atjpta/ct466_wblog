const mongoose = require("mongoose");
const db = require("../models");
const Blog = db.blog;
const user = db.user;


exports.getListSearch = async (req, res) => {
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
