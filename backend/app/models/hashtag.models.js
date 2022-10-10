const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        name: String,
        blog: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "blog"
            },
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

module.exports = mongoose.model("hashtag", schema);