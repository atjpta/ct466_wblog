const mongoose = require("mongoose");
const db = require("../models");
const { populate } = require("../models/question.models");
const Comment = db.comment;
const Voted = db.vote;
const Question = db.question;
const User = db.user
exports.getListQuestion = async (req, res) => {
    try {
        const listQuestion = await Question.find({ _id: { $ne: req.params.id } })
            .populate("hashtag", "name")
            .populate("author", "name avatar_Url")
            .populate("voted", "tim dislike view")
            .sort({ createdAt: -1 })
            .select(["title", "voted", "premium", "hashtag", "id", "createdAt"]);
        if (!listQuestion) {
            return next(
                res.status(404).json({ Message: "không thể getListQuestion" })
            );
        }
        return res.send(listQuestion);
    } catch (error) {
        return next(res.status(500).send("lỗi khi getListQuestion"));
    }
};

//lấy 1 bài Question
exports.findOneQuestion = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const cmt = await Comment.find({ id_Question: id })
            .sort({ createdAt: -1 })
            .populate("author", "name avatar_Url")
            .populate("voted", "tim dislike")
            .populate({
                path: "cmt_child",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "author voted listTagName",
                    select: "tim dislike name id avatar_Url",
                },
            })
            .populate("listTagName", "name id")
            .exec();
        const document = await Question.findOne(condition)
            .populate("hashtag", "name")
            .populate("author", 'name avatar_Url')
            .populate("voted")
            .populate({
                path: 'answer',
                select: 'author voted listTagName content createdAt',
                populate: {
                    path: 'author voted listTagName',
                    select: 'tim dislike name id avatar_Url'
                }
            })
            .exec();
        if (!document) {
            return next(
                res.status(404).json({ Message: "không thể findOneQuestion" })
            );
        }
        return res.send({
            id: document.id,
            author: {
                id: document.author.id,
                name: document.author.name,
                avatar_Url: document.author.avatar_Url,
            },
            answer: document.answer,
            title: document.title,
            voted: document.voted,
            content: document.content,
            hashtag: document.hashtag,
            comment_Question: cmt,
            createdAt: document.createdAt,
        });
    } catch (error) {
        return next(
            res
                .status(500)
                .json({
                    Message: ` không thể tìm thấy Question với id = ${req.params.id} ++++ ${error} `,
                })
        );
    }
};

//tạo Question
exports.createQuestion = async (req, res) => {
    const question = new Question({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        hashtag: req.body.hashtag,
    });
    const vote = new Voted({
        tim: [],
        dislike: [],
        view: [],
    });
    try {
        const documentVote = await vote.save();
        question.voted = documentVote.id;
        const document = await question.save();
        if (!document) {
            return next(
                res.status(404).json({ Message: "không thể createQuestion" })
            );
        }
        return res.send(document.id);
    } catch (error) {
        return next(res.status(500).send("lỗi khi createQuestion"));
    }
};

//update Question
exports.updateQuestion = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            res.status(400).json({ Message: "thông tin không thế thay đổi" })
        );
    }
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Question.findByIdAndUpdate(condition, req.body, {
            new: true,
        });
        if (!document) {
            return next(
                res.status(404).json({ Message: "không thể tìm thấy Question" })
            );
        }
        return res.send(id);
    } catch (error) {
        console.log(error);
        return next(
            res
                .status(500)
                .json({
                    Message: ` không thể update Question với id = ${req.params.id} `,
                })
        );
    }
};


//update Question
exports.selectAnswer = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            res.status(400).json({ Message: "thông tin không thế thay đổi" })
        );
    }
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    const answer = req.body.answer
    const author = req.body.author

    try {
        const document = await Question.findByIdAndUpdate(condition, {
            answer: answer
        }, {
            new: true,
        });
        const document2 = await User.findByIdAndUpdate({ _id: author }, {
            $addToSet: { repAnswer: id }
        })
        if (!document || !document2) {
            return next(
                res.status(404).json({ Message: "không thể selectAnswer" })
            );
        }
        return res.send(id);
    } catch (error) {
        console.log(error);
        return next(
            res
                .status(500)
                .json({
                    Message: ` không thể update selectAnswer với id = ${req.params.id} `,
                })
        );
    }
};


//update Question
exports.removeAnswer = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            res.status(400).json({ Message: "thông tin không thế thay đổi" })
        );
    }
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    const answer = req.body.answer
    const author = req.body.author
console.log(req.body);
    try {
        const document = await Question.findByIdAndUpdate(condition, {
            answer: null
        }, {
            new: true,
        });
        const document2 = await User.findByIdAndUpdate({ _id: author }, {
            $pull: { repAnswer: id }
        })
        if (!document || !document2) {
            return next(
                res.status(404).json({ Message: "không thể removeAnswer" })
            );
        }
        return res.send(id);
    } catch (error) {
        console.log(error);
        return next(
            res
                .status(500)
                .json({
                    Message: ` không thể update removeAnswer với id = ${req.params.id} `,
                })
        );
    }
};

exports.deleteQuestion = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Question.findOneAndDelete(condition);
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Question" }));
        }
        return res.send({ message: "đã xóa Question thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Question với id = ${req.params.id} ` })
        )
    }
}

exports.deleteAllQuestion = async (req, res, next) => {
    try {
        const data = await Question.deleteMany({});
        return res.send({
            message: `${data.deletedCount}  Question đã xóa thành công`,
        });
    } catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Question` })
        );
    }
};
