const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        title: String,
        summary: String,      
        content: Object,
        cover_image_Url: {
            type: String,
            default: 'http://localhost:8088/api/image/cuoi.gif'
        },
        voted: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "vote"
        },
        premium: Boolean,
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