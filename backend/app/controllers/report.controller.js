const mongoose = require("mongoose");
const db = require("../models");
const Blog = db.blog;
const Question = db.question;
const Report = db.report
// lấy Question
exports.getQuestionHaveReport = async (req, res, next) => {
    try {
        const document = await Question.find({ 'report.0': { $exists: true } })
            .populate("hashtag", "name")
            .populate("author", "name avatar_Url")
            .populate("voted", "tim dislike view")
            .sort({ createdAt: -1 })
            .select(["title", "voted", "premium", "hashtag", "id", "createdAt", 'answer',]);;
        if (!document) {
            return next(
                res.status(404).json({ Message: "không thể getBlogHaveReport" })
            );
        }
        return res.send(document);
    } catch (error) {
        return next(res.status(500).send("lỗi khi getBlogHaveReport" + error));
    }
}

// lấy Blog
exports.getBlogHaveReport = async (req, res, next) => {
    try {
        const document = await Blog.find({ 'report.0': { $exists: true }, deleted: false })
            .populate({
                path: 'author voted hashtag',
                select: 'name avatar_Url tim dislike view',
            })
            .sort({ 'createdAt': -1 }
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
            ]);
        if (!document) {
            return next(
                res.status(404).json({ Message: "không thể getBloghaveReport" })
            );
        }
        return res.send(document);
    } catch (error) {
        return next(res.status(500).send("lỗi khi getBloghaveReport" + error));
    }
}

//thêm report Blog
exports.createReportBlog = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            res.status(400).json({ Message: "thông tin không thế thay đổi createReportBlog" })
        )
    }
    const report = new Report({
        id_user: req.body.id_user,
        content: req.body.content,
    })
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const id_report = await report.save()
        const document = await Blog.findByIdAndUpdate(condition,
            { $addToSet: { report: id_report } }
            , {
                new: true
            });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Blog" }));
        }
        return res.status(200).json({ Message: "createReportBlog thành công " });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể createReportBlog với id = ${req.params.id} +++ ${error} ` })
        )
    }
}


//thêm report question
exports.createReportQuestion = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            res.status(400).json({ Message: "thông tin không thế thay đổi createReportQuestion" })
        )
    }
    const report = new Report({
        id_user: req.body.id_user,
        content: req.body.content,
    })
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const id_report = await report.save()
        const document = await Question.findByIdAndUpdate(condition,
            { $addToSet: { report: id_report } }
            , {
                new: true
            });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Blog" }));
        }
        return res.status(200).json({ Message: "createReportQuestion thành công " });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể createReportQuestion với id = ${req.params.id} +++ ${error} ` })
        )
    }
}


// xóa 1 report theo id blog 
exports.deleteOneReportBlog = async (req, res, next) => {
    const { id_blog, id_report } = req.params;
    try {
        const document = await Blog.findByIdAndUpdate({ _id: id_blog },
            { $pull: { report: id_report } }
            , {
                new: true
            });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Blog" }));
        }
        return res.status(200).json({ Message: "deleteOneReportBlog thành công" });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể deleteOneReportBlog với id = ${req.params.id_blog} +++ ${error} ` })
        )
    }
}


// xóa 1 report theo id question 
exports.deleteOneReportQuestion = async (req, res, next) => {
    const { id_question, id_report } = req.params;
    try {
        const document = await Question.findByIdAndUpdate({ _id: id_question },
            { $pull: { report: id_report } }
            , {
                new: true
            });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Blog" }));
        }
        return res.status(200).json({ Message: "deleteOneReportQuestion thành công" });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể deleteOneReportQuestion với id = ${req.params.id_question} +++ ${error} ` })
        )
    }
}