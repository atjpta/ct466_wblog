const mongoose = require("mongoose");
const db = require("../models");
const Cart = db.cart
const Bill = db.bill


// get lấy ds bill ra 
exports.getListBill = async (req, res, next) => {
    const { id } = req.params;

    try {
        const document = await Bill.find({ id_user: id }).populate({
            path: 'id_blog',
            select: 'price',
        })
        if (!document) {
            return res.status(200)
        }
        return res.status(200).send(document)
    } catch (error) {
        return next(res.status(500).send(`lỗi khi getbill của user có id: ${id}` + error));
    }
}

// get lấy blog đã mở khóa 
exports.getListBillBlog = async (req, res, next) => {
    const { id } = req.params;

    try {
        const document = await Bill.find({ id_user: id }).populate({
            path: 'id_blog',
            select: 'title cover_image_Url voted hashtag createdAt',
            populate: {
                path: 'hashtag author voted',
                select: 'name avatar_Url tim dislike view',
            }
        })
        const data = []
        document.forEach(e => {
            data.push(...e.id_blog)
        });
        if (!document) {
            return res.status(200)
        }
        return res.status(200).send(data)
    } catch (error) {
        return next(res.status(500).send(`lỗi khi getbill của user có id: ${id}` + error));
    }
}



// get lấy blog đã mở khóa 
exports.getIdBlog = async (req, res, next) => {
    const { id } = req.params;

    try {
        const document = await Bill.find({ id_user: id }).select('id_blog')
        const data = []
        document.forEach(e => {
            data.push(...e.id_blog)
        });
        if (!document) {
            return res.status(200)
        }
        return res.status(200).send(data)
    } catch (error) {
        return next(res.status(500).send(`lỗi khi getbill của user có id: ${id}` + error));
    }
}

// get lấy bill chi tiết ra 
exports.getBill = async (req, res, next) => {
    const { id } = req.params;

    try {
        const document = await Bill.findOne({ _id: id }).populate({
            path: 'id_blog',
            select: 'title cover_image_Url voted hashtag createdAt',
            populate: {
                path: 'hashtag author voted',
                select: 'name avatar_Url tim dislike view',
            }
        }).select('id_blog')
        if (!document) {
            return res.status(200)
        }
        return res.status(200).send(document)
    } catch (error) {
        return next(res.status(500).send(`lỗi khi getbill của user có id: ${id}` + error));
    }
}

// tạo bill 
exports.createBill = async (req, res, next) => {
    const bill = new Bill({
        id_user: req.body.id_user,
        id_blog: req.body.id_blog,
    })
    try {
        const document = bill.save();
        if (!document) {
            return next(
                res.status(404).json({ Message: "không thể creatbill" })
            );
        }
        return next(res.status(200).send("đã tạo bill thành công"));
    } catch (error) {
        return next(res.status(500).send("lỗi khi creatbill" + error));
    }
}

exports.deleteAllBill = async (req, res, next) => {
    try {
        const data = await Bill.deleteMany({});
        return res.send({
            message: `${data.deletedCount}  deleteAllBill đã xóa thành công`,
        });
    } catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả deleteAllBill` })
        );
    }
};

