const mongoose = require("mongoose");
const db = require("../models");
const Comment = db.comment;
const Voted = db.vote;

//lấy ds Comment
exports.getListComment = async (req, res) => {
    try {
        const list = await Comment.find({ _id: { $ne: req.params.id } }).populate('voted').exec();
        return res.json(list);
    }
    catch (error) {
        res.status(500).send("lỗi khi lấy Comment")
    }
};

//tạo comment
exports.createComment = async (req, res) => {
    const comment = new Comment({
        id_blog: req.body.id_blog,
        content: req.body.content,
        author: req.body.author,
    })
    const vote = new Voted({
        tim: [],
        dislike: [],
    })
    try {
        const documentVote = await vote.save();
        comment.voted = documentVote.id;
        const document = await comment.save();
        return res.send(document);
    }
    catch (error) {
        return res.status(500).send({ Message: "Không thể tạo comment - " + error.message })
    }
}



exports.deleteComment = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Comment.findOneAndDelete(condition);
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Comment" }));
        }
        return res.send({ message: "đã xóa Comment thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Comment với id = ${req.params.id} ` })
        )
    }
}



exports.deleteAllComment = async (req, res, next) => {
    try {
        const data = await Comment.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Comment đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Comment` })
        )
    }
}



