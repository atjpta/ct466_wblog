const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {

        id_blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "blog"
        },
        id_Question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "question"
        },
        content: Object,
        listTagName: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        voted: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "vote"
        },
        cmt_child: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }]

        
        
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

module.exports = mongoose.model("comment", schema);