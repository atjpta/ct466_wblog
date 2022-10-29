const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        premiumId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "premium"
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

module.exports = mongoose.model("billpremium", schema);