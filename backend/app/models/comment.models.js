const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {

        id_blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "blog"
        },
        content: String,
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