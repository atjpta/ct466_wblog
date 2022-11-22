const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        content: String,
        id_blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "blog"
        },
        id_question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "question"
        },
    },
);

schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("report", schema);