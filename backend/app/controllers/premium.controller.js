const mongoose = require("mongoose");
const db = require("../models");
const Premium = db.premium
const User = db.user
const Billpremium = db.billpremium

exports.getListPremium = async (req, res, next) => {
    try {
        const document = await Premium.find({ _id: { $ne: req.params.id } })
        if (!document) {
            return next(res.status(404).json({ Message: "không thể getListPremium" }));
        }
        return res.send(document);
    } catch (error) {
        console.log("lỗi getListPremium" + error.Message);
        return next(res.status(500).send("lỗi khi getListPremium"))
    }
};


function getEndDay(numDays, day) {
    if (day) {
        day.setDate(day.getDate() + numDays);
        return day;
    } else {
        let endDay = new Date()
        endDay.setDate(endDay.getDate() + numDays);
        return endDay;
    }
    
}

exports.PurchasePremium = async (req, res, next) => {
    const userId = req.params.id
    const premiumId = req.body.premiumId
    const session = await mongoose.startSession();
    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' }
    };
    const bill = new Billpremium({
        userId: userId,
        premiumId: premiumId,
    })
    try {
        const transactionResults = await session.withTransaction(async () => {
            const getvaluepremium = await Premium.findById(premiumId);
            const check = await User.findById(userId)
            const now = new Date();
            if (check.gem - getvaluepremium.price < 0) {
                // return next(res.status(501).json({
                //     message: 'Transfer thất bại do thiếu gem'
                // }))
                // session.abortTransaction();
                return
            }
            let usersUpdateResults
            if (!check.premium || check.premium.getTime() < now.getTime()) {
                usersUpdateResults = await User.findByIdAndUpdate(
                    userId ,
                    {
                        $set: { premium: getEndDay(getvaluepremium.time) },
                        $inc: { gem: -getvaluepremium.price },
                    },
                    { session },
                )
            }
            else  {
                usersUpdateResults = await User.findByIdAndUpdate(
                    userId ,
                    {
                        $set: { premium: getEndDay(getvaluepremium.time, check.premium) },
                        $inc: { gem: -getvaluepremium.price },
                    },
                    { session },

                )
            }
           
                const billResults = await bill.save()
                await session.commitTransaction();
        }, transactionOptions)

        return res.status(201).json({
            status: true,
            message: 'Transfer successful'
        })
    } catch (error) {
        return next(res.status(501).json({
            message: 'Transfer thất bại '
        }))
    }
    finally {
        session.endSession()
    }
}


exports.createPremium = async (req, res, next) => {
    const premium = new Premium({
        name: req.body.name,
        price: Number.parseInt(req.body.price),
        time: Number.parseInt(req.body.time),
        image_url: req.body.image_url,
    })
    try {
        const document = await premium.save();
        if (!document) {
            return next(res.status(404).json({ Message: "không thể createPremium" }));
        }
        return res.send(document);
    } catch (error) {
        console.log("lỗi createPremium" + error.Message);
        return next(res.status(500).send("lỗi khi getListPremium"))

    }
}

//update Premium 
exports.updatePremium = async (req, res, next) => {
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
        const document = await Premium.findByIdAndUpdate(condition, req.body, {
            new: true
        });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Premium" }));
        }
        return res.send(id);
    }
    catch (error) {
        console.log("lỗi updatePremium" + error.Message);

        return next(
            res.status(500).json({ Message: ` không thể update Premium với id = ${req.params.id} ` })
        )
    }
}


exports.deletePremium = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Premium.findByIdAndDelete(condition);
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Premium" }));
        }
        return res.send({ message: "đã xóa Premium thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Premium với id = ${req.params.id} ` })
        )
    }
}

exports.deleteAllPremium = async (req, res, next) => {
    try {
        const data = await Premium.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Premium đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Premium` })
        )
    }
}




