const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        tim: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }],
        dislike: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }],
        view: {
            type: Intl,
            default: 0,
        },
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

module.exports = mongoose.model("vote", schema);