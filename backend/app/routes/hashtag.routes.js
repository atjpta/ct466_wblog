const express = require("express");
const hashtag = require('../controllers/hashtag.controller')

module.exports = (app) => {
    const router = express.Router();
    router.route("/")
        .get(hashtag.getListHashtag)
        .post(hashtag.createHashtag)
        .delete(hashtag.deleteAllHashtag)

    router.route("/:id")
        .get(hashtag.findBlogOnHashtag)
        .put(hashtag.addBlogToHashtag)

    app.use("/api/hashtag", router); 
};