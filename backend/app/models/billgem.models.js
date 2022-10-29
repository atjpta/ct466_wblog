const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        gemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "gem"
        }
        
    },

    {
        timestamps: true,
    }
);

schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("billgem", schema);