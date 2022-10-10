const mongoose = require("mongoose");
const db = require("../models");
const Blog = db.blog;
const Hashtag = db.hashtag;
//lấy ds hashtag
exports.getListHashtag = async (req, res) => {
    try {
        const listHashtag = await Hashtag.find(
        ).select([
            'id',
            'name'
        ]);
        return res.send(listHashtag);
    } catch (error) {
        res.status(500).send("lỗi khi tin Hashtag")
    }
};

//lấy bài blog dựa trên Hashtag
exports.findBlogOnHashtag = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    try {
        const document = await Hashtag.find(condition).populate("blog").populate('blog.voted').populate(
            'blog.author', 'name avatar_Url'
        ).populate(
            'blog.voted', 'tim dislike view'
        ).sort({'blog.createdAt': -1}).exec();
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm blog từ Hashtag này" }));
        }
        return res.send();
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể tìm thấy Hashtag với id = ${req.params.id} ` })
        )
    }
}

//tạo Hashtag
exports.createHashtag = async (req, res) => {
    const hashtag = new Hashtag({
       name: req.body.name,
    })
    try {
        const document = await hashtag.save();
        return res.send(document.id);
    }
    catch (error) {
        return res.status(500).send({ Message: "Không thể tạo Hashtag - " + error.message })
    }
}

//add id_blog to Hashtag 
exports.addBlogToHashtag = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            res.status(400).json({ Message: "thông tin không thế thay đổi" })
        )
    }
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Voted.findByIdAndUpdate(condition, {
            $addToSet: { blog: req.body.blog }
        }, {
            new: true
        });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Hashtag" }));
        }
        return res.send({ message: "đã them blog vào hashtag thành công", body: req.body });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update Hashtag với id = ${req.params.id} ` })
        )
    }
}


exports.deleteAllHashtag = async (req, res, next) => {
    try {
        const data = await Hashtag.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Hashtag đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Hashtag` })
        )
    }
}



