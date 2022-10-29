const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        name: String,
        price: Intl,
        value: Intl,
        image_url: {
            type: String,
            default: 'http://localhost:8088/api/image/cuoi.gif'
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

module.exports = mongoose.model("gem", schema);