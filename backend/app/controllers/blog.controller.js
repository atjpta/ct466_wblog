const mongoose = require("mongoose");
const db = require("../models");
const { populate } = require("../models/user.models");
const Blog = db.blog;
const Comment = db.comment;
const Voted = db.vote;
//lấy ds blog giới hạn 9
exports.getListBlog = async (req, res) => {
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
            "price",
            "hashtag",
            "_id",
            'buyer',
            "createdAt",
        ]).limit(9);
        if (!listBlog) {
            return next(res.status(404).json({ Message: "không thể getListBlogUser" }));
        }
        return res.send(listBlog);
    } catch (error) {
        return next(res.status(500).send("lỗi khi getListBlog"))
    }
};

//lấy ds blog từ trang 2 trở lên
exports.getListBlogNextPage = async (req, res) => {
    const { page } = req.params;
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
            "price",
            "hashtag",
            'buyer',
            "_id",
            "createdAt",
        ]).limit(9).skip(9*page)
            ;
        if (!listBlog) {
            return next(res.status(404).json({ Message: "không thể getListBlog2" }));
        }
        return res.send(listBlog);
    } catch (error) {
        return next(res.status(500).send("lỗi khi getListBlog2"))

    }
};

// lấy ds bài viết theo user  giới hạn 9 
exports.getListBlogUser = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    try {
        const listBlog = await Blog.find({ author: condition, deleted: false })
            .populate({
                path: 'author voted hashtag',
                select: 'name avatar_Url tim dislike view'
            })
            .sort({ 'createdAt': -1 })
        if (!listBlog) {
            return next(res.status(404).json({ Message: "không thể getListBlogUser" }));
        }
        return res.send(listBlog);
    } catch (error) {
        return next(res.status(500).send("lỗi khi getListBlogUser"))

    }
};
// lấy ds bài viết theo user  từ trang 2 trở lên
exports.getListBlogUserNextPage = async (req, res) => {
    const { id, page } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    try {
        const listBlog = await Blog.find({ author: condition, deleted: false })
            .populate({
                path: 'author voted hashtag',
                select: 'name avatar_Url tim dislike view'
            })
            .sort({ 'createdAt': -1 })
            .limit(9).skip(9 * page);
        if (!listBlog) {
            return next(res.status(404).json({ Message: "không thể getListBlogUser2" }));
        }
        return res.send(listBlog);
    } catch (error) {
        return next(res.status(500).send("lỗi khi getListBlogUser2g"))

    }
};

//lấy 1 bài blog
exports.findOneBlog = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

   
    try {
        const cmt = await Comment.find({ id_blog: id }).sort({ 'createdAt': -1 }).populate('author', 'name avatar_Url').populate(
            'voted', 'tim dislike'
        ).populate({
            path: 'cmt_child',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'author voted listTagName',
                select: 'tim dislike name id avatar_Url'
            }
        })
            .populate('listTagName', 'name id')
            .exec();
        const document = await Blog.findOne(condition).populate('hashtag', 'name').populate("author").populate('voted').exec();
        let comment_Blog = [];
        if (cmt) {
            comment_Blog = cmt
            comment_Blog.createdAt = new Date(comment_Blog.createdAt).toLocaleString()
        }
        if (!document) {
            return next(res.status(404).json({ Message: "không thể findOneBlog" }));
        }
        return res.send({
            id: document.id,
            author: {
                id: document.author.id,
                name: document.author.name,
                avatar_Url: document.author.avatar_Url,
            },
            title: document.title,
            summary: document.summary,
            cover_image_Url: document.cover_image_Url,
            voted: document.voted,
            content: document.content,
            hashtag: document.hashtag,
            comment_Blog: comment_Blog,
            price: document.price,
            time: document.createdAt,
        });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể tìm thấy Blog với id = ${req.params.id} ` })
        )
    }
}

//tạo blog
exports.createBlog = async (req, res) => {
    const blog = new Blog({
        author: req.body.author,
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content,
        hashtag: req.body.hashtag,
        cover_image_Url: req.body.cover_image_Url,
        price: parseInt(req.body.price),
    })
    const vote = new Voted({
        tim: [],
        dislike: [],
        view: 0,
    })
    try {
        const documentVote = await vote.save();
        blog.voted = documentVote.id;
        const document = await blog.save();
        if (!document) {
            return next(res.status(404).json({ Message: "không thể createBlog" }));
        }
        return res.send(document.id);
    }
    catch (error) {
        return next(res.status(500).send("lỗi khi createBlog"))
    }
}

//update blog 
exports.updateBlog = async (req, res, next) => {
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
        const document = await Blog.findByIdAndUpdate(condition, req.body, {
            new: true
        });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Blog" }));
        }
        return res.send(id);
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update Blog với id = ${req.params.id} ` })
        )
    }
}


//add Hashtag to blog 
exports.addHashtagtoBlog = async (req, res, next) => {
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
        const document = await Blog.findByIdAndUpdate(condition, {
            $addToSet: { hashtag: req.body.hashtag }
        }, {
            new: true
        });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Hashtag" }));
        }
        return res.send({ message: "đã them hashtag  vào blog thành công", body: req.body });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update Hashtag với id = ${req.params.id} ` })
        )
    }
}
// remove Hashtag in blog 
exports.removeHashtagtoBlog = async (req, res, next) => {
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
        const document = await Blog.findByIdAndUpdate(condition, {
            $pull: { hashtag: req.body.hashtag }
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



exports.deleteBlog = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Blog.findByIdAndUpdate(condition, { deleted: true });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Blog" }));
        }
        return res.send({ message: "đã xóa Blog thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Blog với id = ${req.params.id} ` })
        )
    }
}


exports.deleteBlog = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Blog.findByIdAndUpdate(condition, { deleted: true });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Blog" }));
        }
        return res.send({ message: "đã xóa Blog thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Blog với id = ${req.params.id} ` })
        )
    }
}
exports.restoreBlog = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    try {
        const document = await Blog.findByIdAndUpdate(condition, { deleted: false });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Blog" }));
        }
        return res.send({ message: "đã hồi phục Blog thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể hồi phục Blog với id = ${req.params.id} ` })
        )
    }
}

exports.deleteAllBlog = async (req, res, next) => {
    try {
        const data = await Blog.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Blog đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Blog` })
        )
    }
}



