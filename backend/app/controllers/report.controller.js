const mongoose = require("mongoose");
const db = require("../models");
const Blog = db.blog;
const Question = db.question;
const Report = db.report


exports.createReport = async (req, res, next) => {
    const report = new Report({
        id_user: req.body.id_user,
        content: req.body.content,
        id_blog: req.body.id_blog,
        id_question: req.body.id_question,
    })

    try {
        const document = await report.save();
        if (!document) {
            return next(
                res.status(404).json({ Message: "không thể tao report" })
            );
        }
        return res.send(document);
    } catch (error) {
        return next(res.status(500).send("lỗi khi tạo report" + error));

    }
}

// lấy danh sách report dựa trên id blog/ question

exports.getListReportById = async (req, res, next) => {
    const { id, type } = req.params;
    try {
        let document;
        if (type == 'blog') {
            document = await Report.find({ id_blog: id })
        }
        if (type == 'question') {
            document = await Report.find({ id_question: id })
        }
        if (!document) {
            return next(
                res.status(404).json({ Message: "không thể tao getListReportById" })
            );
        }
        return res.send(document);

    } catch (error) {
        return next(res.status(500).send("lỗi khi tạo getListReportById" + error));
    }
}


// lấy bài viết có report
exports.getReportBlog = async (req, res, next) => {
    try {
        const document = await Report.aggregate(
            [
                {
                    $group: {
                        _id: "$id_blog",
                        count: { $sum: 1 },
                        id_blog: {
                          $addToSet : '$id_blog'  
                        },
                    }
                    
                },
                {
                    $lookup: {
                        from: 'blogs',
                        localField: 'id_blog',
                        foreignField: '_id',
                        as: 'blog',
                        pipeline: [
                            {
                                $match: {
                                    deleted: false,
                                }
                            }
                        ]
                    },
                    
                },
                {
                    '$project': {
                        "blog.title": 1,
                        "blog._id": 1,
                        'id_blog': 1,
                        'blog.deleted': 1,
                        '_id': 1,
                        'count' : 1,
                    }
                },
                
            ]
        )
        return res.send(document);   

    } catch (error) {
        return next(res.status(500).send("lỗi khi tạo getReportBlog" + error));
    }
}


// lấy câu hỏi có report
exports.getReportQuestion= async (req, res, next) => {
    try {
        const document = await Report.aggregate(
            [
                {
                    $group: {
                        _id: "$id_Quetion",
                        count: { $sum: 1 },
                        id_blog: {
                            $addToSet: '$id_Quetion'
                        },
                    }
                },
                {
                    $lookup: {
                        from: 'questions',
                        localField: 'id_Quetion',
                        foreignField: '_id',
                        as: 'question',
                        pipeline: [
                            {
                                $match: {
                                    deleted: false,
                                }
                            }
                        ]
                    },
                },
                {
                    '$project': {
                        "question.title": 1,
                        "question._id": 1,
                        'id_Quetion': 1,
                        '_id': 1,
                        'count': 1,
                    }
                },
            ]
        ).exec(res, error => {
            return res.send(document);
        })
        return res.send(document);

    } catch (error) {
        return next(res.status(500).send("lỗi khi getReportQuestion" + error));
    }
}

exports.deleteOneReport = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    try {
        const document = await Report.findOneAndDelete(condition);
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Question" }));
        }
        return res.send({ message: "đã xóa deleteOneReport thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa deleteOneReport với id = ${req.params.id} ` })
        )
    }
};


exports.deleteAllReport = async (req, res, next) => {
    try {
        const data = await Report.deleteMany({});
        return res.send({
            message: `${data.deletedCount}  deleteAllReport đã xóa thành công`,
        });
    } catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả deleteAllReport` })
        );
    }
};
