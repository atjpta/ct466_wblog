const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        answer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment",
        },
        title: String,
        content: Object,
        voted: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "vote"
        },
        hashtag: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "hashtag"
            }
        ],
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

module.exports = mongoose.model("question", schema);