const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        report: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "report"
            }
        ],
        title: String,
        content: Object,
        cover_image_Url: {
            type: String,
        },
        buyer: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }
        ],
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
        price: {
            type: Intl,
            default: 0,
        },
        deleted: {
            type: Boolean,
            default: false,
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

module.exports = mongoose.model("blog", schema);