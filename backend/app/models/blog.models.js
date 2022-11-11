const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
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



const blog = mongoose.Schema(
    {
        title: String,
        content: Object,
    },
);

const hashtag = mongoose.Schema(
    {
        name: String,
        id_blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "blog"
        },
    },
);

const cmt = mongoose.Schema(
    {
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cmt"
        },
        id_blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "blog"
        },
        content: Object,
        id_cmt_father: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "cmt"
            }
        ]
    },
);
