const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        title: String,
        summary: String,      
        content: String,
        cover_image: {

        },
        voted: {
            like: Int32Array,
            dislike: Int32Array,
            view: Int32Array,
            cmt: Int32Array,
        },
        comment: [{
            content: String,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            voted: {
                like: Int32Array,
                dislike: Int32Array,
            },
        }
    
    
    ],
        status: Boolean,
        deleted: Boolean,
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