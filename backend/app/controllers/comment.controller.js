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
    if (Object.keys(req.body).length === 0) {
        return res.status(440).json({ Message: "thông tin không thế thay đổi" })
        
    }
    const comment = new Comment({
        author: req.body.author,
        id_Question: req.body.id_Question,
        content: req.body.content,
        listTagName: req.body.listTagName,
        
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


//tạo comment con
exports.createCommentChild = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(440).json({ Message: "thông tin không thế thay đổi" })

    }
    const comment = new Comment({
        author: req.body.author,
        content: req.body.content,
        listTagName: req.body.listTagName,

    })
    const vote = new Voted({
        tim: [],
        dislike: [],
    })
    try {
        
        const documentVote = await vote.save();
        comment.voted = documentVote.id;
        const documentchild = await comment.save();
        const document = await Comment.findByIdAndUpdate({ _id: req.params.id }, { $addToSet: { cmt_child: documentchild.id } }, {
            new: true
        });
        return res.send(document);
    }
    catch (error) {
        return res.status(500).send({ Message: "Không thể tạo comment - " + error.message })
    }
}


//tạo comment cho question
exports.createCommentQuestion = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(440).json({ Message: "thông tin không thế thay đổi" })

    }
    const comment = new Comment({
        author: req.body.author,
        id_Question: req.body.id_Question,
        content: req.body.content,
        listTagName: req.body.listTagName,

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



