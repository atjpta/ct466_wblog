const mongoose = require("mongoose");
const db = require("../models");
const Voted = db.vote;

//lấy ds Voted
exports.getListVoted = async (req, res) => {
    try {
        const list = await Voted.find({ _id: { $ne: req.params.id } })
        return res.json(list);
    }
    catch (error) {
        res.status(500).send("lỗi khi tin Voted")
    }
};


//update Voted 

// tang
exports.pushVoted = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            res.status(440).json({ Message: "thông tin không thế thay đổi" })
        )
    }

    const { type, id } = req.params;

    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        let document = {}
        if (type == 'tim') {
            document = await Voted.findByIdAndUpdate(condition, {
                $addToSet: { tim: req.body.id_user }
            }, {
                new: true
            });

        }

        else if (type == 'dislike') {
            document = await Voted.findByIdAndUpdate(condition, {
                $addToSet: { dislike: req.body.id_user }
            }, {
                new: true
            });

        }

        else if (type == 'view') {
            document = await Voted.findByIdAndUpdate(condition, {
                $addToSet: { view: req.body.id_user }
            }, {
                new: true
            });
        }
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Voted" }));
        }
        return res.send(document);
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update Voted với id = ${req.params.id} ` })
        )
    }
}


// giam
exports.popVoted = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            res.status(441).json({ Message: "thông tin không thế thay đổi" })
        )
    }

    const { type, id } = req.params;

    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        let document = {}
        if (type == 'tim') {
            document = await Voted.findByIdAndUpdate(condition, {
                $pull: { tim: req.body.id_user }
            }, {
                new: true
            });

        }

        else if (type == 'dislike') {
            document = await Voted.findByIdAndUpdate(condition, {
                $pull: { dislike: req.body.id_user }
            }, {
                new: true
            });

        }

        else if (type == 'view') {
            document = await Voted.findByIdAndUpdate(condition, {
                $pull: { view: req.body.id_user }
            }, {
                new: true
            });
        }
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Voted" }));
        }
        return res.send(document);
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update Voted với id = ${req.params.id} ` })
        )
    }
}


exports.deleteVoted = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Voted.findByIdAndUpdate(condition, { deleted: true });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Voted" }));
        }
        return res.send({ message: "đã xóa Voted thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Voted với id = ${req.params.id} ` })
        )
    }
}


exports.deleteVoted = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Voted.findByIdAndUpdate(condition, { deleted: true });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Voted" }));
        }
        return res.send({ message: "đã xóa Voted thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Voted với id = ${req.params.id} ` })
        )
    }
}


exports.deleteAllVoted = async (req, res, next) => {
    try {
        const data = await Voted.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Voted đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Voted` })
        )
    }
}



