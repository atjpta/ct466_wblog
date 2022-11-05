const mongoose = require("mongoose");
const db = require("../models");
const Cart = db.cart


// get cart 
exports.getCart = async (req, res, next) => {
    const { id } = req.params;
   
    try {
        const document = await Cart.findOne({ id_user: id }).select('id_blog')
        if (!document) {
            return res.status(200)
        }
        return res.status(200).send(document)
    } catch (error) {
        return next(res.status(500).send(`lỗi khi getCart của user có id: ${id}` + error));
    }
}

// tạo cart 
exports.createCart = async (req, res, next) => {
    const cart = new Cart({
        id_user: req.body.id_user,
        id_blog: req.body.id_blog,
    })
    try {
        const document = cart.save();
        if (!document) {
            return next(
                res.status(404).json({ Message: "không thể creatCart" })
            );
        }
        return next(res.status(200).send("đã tạo cart thành công"));
    } catch (error) {
        return next(res.status(500).send("lỗi khi creatCart" + error));
    }
}

//add blog to cart
exports.addBlogToCart = async (req, res, next) => {
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
        const document = await Cart.findByIdAndUpdate(condition, {
            $addToSet: { id_blog: req.body.id_blog }
        }, { new: true })
        
        if (!document) {
            return next(
                res.status(404).json({ Message: "không thể addBlogToCart" })
            );
        }
        return next(res.status(200).send("đã tạo addBlogToCart thành công"));

    } catch (error) {
        return next(res.status(500).send("lỗi khi addBlogToCart" + error));
    }
}

//remove blog to cart
exports.removeBlogToCart = async (req, res, next) => {
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
        const document = await Cart.findByIdAndUpdate(condition, {
            $pull: { id_blog: req.body.id_blog }
        }, { new: true })

        if (!document) {
            return next(
                res.status(404).json({ Message: "không thể removeBlogToCart" })
            );
        }
        return next(res.status(200).send("đã tạo removeBlogToCart thành công"));

    } catch (error) {
        return next(res.status(500).send("lỗi khi removeBlogToCart" + error));
    }
}


exports.deleteCart = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Cart.findOneAndUpdate(condition, {
            id_blog: []
        }, {new : true});
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Cart" }));
        }
        return res.send({ message: "đã xóa Cart thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Cart với id = ${req.params.id} ` + error })
        )
    }
}

exports.deleteAllCart = async (req, res, next) => {
    try {
        const data = await Cart.deleteMany({});
        return res.send({
            message: `${data.deletedCount}  deleteAllCart đã xóa thành công`,
        });
    } catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả deleteAllCart` })
        );
    }
};
