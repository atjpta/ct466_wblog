const mongoose = require("mongoose");
const db = require("../models");
const Gem = db.gem
const User = db.user
const Billgem = db.billgem

exports.getListGem = async (req, res, next) => {
    try {
        const document = await Gem.find({ _id: { $ne: req.params.id } })
        if (!document) {
            return next(res.status(404).json({ Message: "không thể getListGem" }));
        }
        return res.send(document);
    } catch (error) {
        console.log("lỗi getListGem" + error.Message);
        return next(res.status(500).send("lỗi khi getListGem"))
    }
};


exports.recharge = async (req, res, next) => {
    const userId = req.params.id
    const gemId = req.body.gemId
    const session = await mongoose.startSession();
    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' }
    };
    const bill = new Billgem({
        userId: userId,
        gemId: gemId,
    })
    try {
        const transactionResults =  await session.withTransaction(async () => {
            const getvaluegem = await Gem.findById(gemId);
            const usersUpdateResults = await User.findByIdAndUpdate(
                userId,
                { $inc: { gem: getvaluegem.value } },
                {session},
            )

            const billResults = await bill.save()
            await session.commitTransaction();
        }, transactionOptions)

        return res.status(201).json({
            status: true,
            message: 'Transfer successful'
        })
    } catch (error) {
        session.abortTransaction();
        console.log("lỗi recharge dfg" + error);
    }
    finally {
        session.endSession()
    }
}

exports.createGem = async (req, res, next) => {
    const gem = new Gem({
        name: req.body.name,
        price: Number.parseInt(req.body.price),
        value: Number.parseInt(req.body.value),
        image_url: req.body.image_url,
    })
    try {
        const document = await gem.save();
        if (!document) {
            return next(res.status(404).json({ Message: "không thể createGem" }));
        }
        return res.send(document);
    } catch (error) {
        console.log("lỗi createGem" + error.Message);
        return next(res.status(500).send("lỗi khi getListGem"))

    }
}

//update Gem 
exports.updateGem = async (req, res, next) => {
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
        const document = await Gem.findByIdAndUpdate(condition, req.body, {
            new: true
        });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Gem" }));
        }
        return res.send(id);
    }
    catch (error) {
        console.log("lỗi updateGem" + error.Message);

        return next(
            res.status(500).json({ Message: ` không thể update Gem với id = ${req.params.id} ` })
        )
    }
}


exports.deleteGem = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Gem.findByIdAndDelete(condition);
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Gem" }));
        }
        return res.send({ message: "đã xóa Gem thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Gem với id = ${req.params.id} ` })
        )
    }
}


exports.deleteAllGem = async (req, res, next) => {
    try {
        const data = await Gem.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Gem đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Gem` })
        )
    }
}




