const mongoose = require("mongoose");
const db = require("../models");
const Blog = db.blog;
const Hashtag = db.hashtag;
const Question = db.question
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
        const document = await Hashtag.find(condition)
            .populate({
                path: 'blog question',
                select: 'author title cover_image_Url voted premium hashtag _id createdAt',
                match: { deleted: false },
                populate: {
                    path: 'author voted hashtag',
                    select: 'name avatar_Url tim dislike view'
                }
            })
            .exec();
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm blog từ Hashtag này" }));
        }
        return res.send(...document);
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể tìm thấy Hashtag với id = ${req.params.id} ${error} ` })
        )
    }


}

checkDuplicateHashtag = async (name) => {
    const document = await Hashtag.findOne({
        name: name,
    })
    if (document) {
        return document.id;
    }
    else return 0;

};

//tạo Hashtag cho blog
exports.createHashtag = async (req, res) => {
    const list = req.body.list;
    const id_blog = req.body.id_blog
    try {
        await list.forEach(async (e, i) => {
            let check = await checkDuplicateHashtag(e.name)
            if (!e.id && check == 0) {
                let hashtag = new Hashtag({
                    name: e.name,
                })

                try {
                    const document = await hashtag.save();
                    e.id = document.id;
                }
                catch (error) {
                    return res.status(500).send({ Message: "Không thể tạo Hashtag - " + error.message })
                }
            } else e.id = check;
            try {
                const document2 = await Hashtag.findByIdAndUpdate({ _id: e.id }, {
                    $addToSet: { blog: id_blog }
                }, {
                    new: true
                });
                const document3 = await Blog.findByIdAndUpdate({ _id: id_blog }, {
                    $addToSet: { hashtag: e.id }
                }, {
                    new: true
                });
            }
            catch (error) {
                console.log(error);
                return next(
                    res.status(500).json({ Message: ` không thể update Hashtag với id = ${id_blog} ` })
                )
            }

        });
        return res.send(id_blog);

    } catch (error) {
        console.log("lỗi " + error);
    }

}


//tạo Hashtag cho Question
exports.createHashtagQuestion = async (req, res, next) => {
    const list = req.body.list;
    const id_question = req.body.id_question
    console.log(id_question);
    try {
        await list.forEach(async (e, i) => {
            let check = await checkDuplicateHashtag(e.name)
            if (!e.id && check == 0) {
                let hashtag = new Hashtag({
                    name: e.name,
                })

                try {
                    const document = await hashtag.save();
                    e.id = document.id;
                }
                catch (error) {
                    return res.status(500).send({ Message: "Không thể tạo Hashtag - " + error.message })
                }
            } else e.id = check;
            try {
                const document2 = await Hashtag.findByIdAndUpdate({ _id: e.id }, {
                    $addToSet: { question: id_question }
                }, {
                    new: true
                });
                const document3 = await Question.findByIdAndUpdate({ _id: id_question }, {
                    $addToSet: { hashtag: e.id }
                }, {
                    new: true
                });
            }
            catch (error) {
                console.log(error);
                return next(
                    res.status(500).json({ Message: ` không thể update Hashtag với id = ${id_question} ` })
                )
            }

        });
        return res.send(id_question);

    } catch (error) {
        console.log("lỗi " + error);
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
        const document = await Hashtag.findByIdAndUpdate(condition, {
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


exports.removeQuestionToHashtag = async (req, res, next) => {
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
        const document = await Hashtag.findByIdAndUpdate(condition, {
            $pull: { question: req.body.question }
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

exports.removeBlogToHashtag = async (req, res, next) => {
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
        const document = await Hashtag.findByIdAndUpdate(condition, {
            $pull: { blog: req.body.blog }
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



